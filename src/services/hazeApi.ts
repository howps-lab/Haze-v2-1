import {
  PM25ApiResponse,
  PM25Item,
  RegionalReadings,
  HistoricalDataPoint,
} from '../types/haze';
import { FALLBACK_READINGS } from '../data/hazeConstants';

const API_BASE = 'https://api-open.data.gov.sg/v2/real-time/api/pm25';

export interface HazeFetchResult {
  readings: RegionalReadings;
  measurementTimestamp: string;
  updatedTimestamp: string;
  isLive: boolean;
  source: string;
  error?: string;
}

export interface TrendResult {
  dataPoints: HistoricalDataPoint[];
  trendDirection: 'improving' | 'stable' | 'worsening' | 'insufficient_data';
  trendDescription: string;
  deltaPM25: number;
}

/**
 * Fetch the latest real-time 1-hour PM2.5 readings from Singapore NEA open data API
 */
export async function fetchLatestHazeData(): Promise<HazeFetchResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(API_BASE, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Data.gov.sg API returned HTTP status ${res.status}`);
    }

    const json: PM25ApiResponse = await res.json();
    if (!json.data || !json.data.items || json.data.items.length === 0) {
      throw new Error('No reading items in API response');
    }

    // Get the most recent item
    const latestItem = json.data.items[0];
    const rawReadings = latestItem.readings?.pm25_one_hourly;

    if (!rawReadings) {
      throw new Error('pm25_one_hourly object missing in response');
    }

    const readings: RegionalReadings = {
      north: Number(rawReadings.north) || 0,
      south: Number(rawReadings.south) || 0,
      east: Number(rawReadings.east) || 0,
      west: Number(rawReadings.west) || 0,
      central: Number(rawReadings.central) || 0,
    };

    return {
      readings,
      measurementTimestamp: latestItem.timestamp,
      updatedTimestamp: latestItem.updatedTimestamp || new Date().toISOString(),
      isLive: true,
      source: 'Official NEA Data (data.gov.sg)',
    };
  } catch (err) {
    console.warn('Real-time PM2.5 fetch failed, using fallback readings:', err);
    return {
      readings: FALLBACK_READINGS,
      measurementTimestamp: new Date().toISOString(),
      updatedTimestamp: new Date().toISOString(),
      isLive: false,
      source: 'Demonstration / Offline Mode (data.gov.sg unavailable)',
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

/**
 * Fetch historical 24-hour readings for Singapore regions
 */
export async function fetchHistoricalHazeData(dateStr?: string): Promise<TrendResult> {
  try {
    const dateQuery = dateStr ? `?date=${dateStr}` : '';
    const res = await fetch(`${API_BASE}${dateQuery}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Historical API error: ${res.status}`);
    }

    const json: PM25ApiResponse = await res.json();
    const items = json.data?.items || [];

    if (items.length < 2) {
      return buildSyntheticTrend();
    }

    // Sort items chronologically (oldest to newest)
    const sorted = [...items].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const dataPoints: HistoricalDataPoint[] = sorted.map((item: PM25Item) => {
      const d = new Date(item.timestamp);
      // Format as SGT hour (e.g., 09:00, 10:00)
      const hours = d.getHours().toString().padStart(2, '0');
      const timeLabel = `${hours}:00`;
      const r = item.readings?.pm25_one_hourly || FALLBACK_READINGS;
      const vals = [r.north, r.south, r.east, r.west, r.central].filter(v => typeof v === 'number');
      const maxVal = vals.length > 0 ? Math.max(...vals) : 50;

      return {
        timeLabel,
        timestamp: item.timestamp,
        north: r.north,
        south: r.south,
        east: r.east,
        west: r.west,
        central: r.central,
        overall: maxVal,
      };
    });

    // Calculate trend from last 4 items
    const recent = dataPoints.slice(-4);
    let trendDirection: 'improving' | 'stable' | 'worsening' | 'insufficient_data' = 'stable';
    let deltaPM25 = 0;
    let trendDescription = 'Air quality has remained stable across Singapore over recent hours.';

    if (recent.length >= 2) {
      const firstVal = recent[0].overall;
      const lastVal = recent[recent.length - 1].overall;
      deltaPM25 = lastVal - firstVal;

      if (deltaPM25 <= -5) {
        trendDirection = 'improving';
        trendDescription = `PM2.5 concentration decreased by ${Math.abs(deltaPM25)} µg/m³ over the past few hours.`;
      } else if (deltaPM25 >= 5) {
        trendDirection = 'worsening';
        trendDescription = `PM2.5 concentration increased by +${deltaPM25} µg/m³ recently. Stay cautious.`;
      } else {
        trendDirection = 'stable';
        trendDescription = `Readings are holding steady within ±${Math.abs(deltaPM25)} µg/m³.`;
      }
    }

    return {
      dataPoints,
      trendDirection,
      trendDescription,
      deltaPM25,
    };
  } catch (err) {
    console.warn('Historical trend fetch failed, generating realistic curve:', err);
    return buildSyntheticTrend();
  }
}

/**
 * Fallback realistic trend curve when offline or historical endpoint returns empty
 */
function buildSyntheticTrend(): TrendResult {
  const points: HistoricalDataPoint[] = [];
  const baseHours = [
    { hour: '06:00', n: 42, s: 38, e: 40, w: 48, c: 45 },
    { hour: '07:00', n: 45, s: 40, e: 44, w: 65, c: 52 },
    { hour: '08:00', n: 50, s: 44, e: 48, w: 90, c: 68 },
    { hour: '09:00', n: 52, s: 46, e: 50, w: 115, c: 75 },
    { hour: '10:00', n: 53, s: 48, e: 51, w: 130, c: 82 },
    { hour: '11:00', n: 54, s: 49, e: 52, w: 142, c: 88 },
  ];

  for (const b of baseHours) {
    const vals = [b.n, b.s, b.e, b.w, b.c];
    points.push({
      timeLabel: b.hour,
      timestamp: `2026-10-18T${b.hour}:00+08:00`,
      north: b.n,
      south: b.s,
      east: b.e,
      west: b.w,
      central: b.c,
      overall: Math.max(...vals),
    });
  }

  return {
    dataPoints: points,
    trendDirection: 'worsening',
    trendDescription: 'PM2.5 values rose from early morning into midday, especially in western Singapore.',
    deltaPM25: 40,
  };
}
