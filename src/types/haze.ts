/**
 * Singapore Haze Air Quality Types & Definitions
 * Based on official Singapore NEA (National Environment Agency) & haze.gov.sg guidelines
 */

export type SingaporeRegion = 'central' | 'north' | 'south' | 'east' | 'west';

export type SelectedRegion = 'overall' | SingaporeRegion;

export type PM25Category = 'NORMAL' | 'ELEVATED' | 'HIGH' | 'VERY_HIGH';

export interface RegionalReadings {
  north: number;
  south: number;
  east: number;
  west: number;
  central: number;
}

export interface PM25Item {
  date: string;
  timestamp: string; // ISO string e.g. 2026-10-18T11:00:00+08:00
  updatedTimestamp: string;
  readings: {
    pm25_one_hourly: RegionalReadings;
  };
}

export interface PM25ApiResponse {
  code: number;
  data: {
    regionMetadata: Array<{
      name: SingaporeRegion;
      labelLocation: {
        latitude: number;
        longitude: number;
      };
    }>;
    items: PM25Item[];
  };
}

export interface AirQualityCategoryInfo {
  category: PM25Category;
  label: string;
  range: string;
  min: number;
  max: number;
  colorName: string;
  bgLight: string;
  bgCard: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  headlineAdvice: string;
  detailedAdvice: string;
  healthyAdultGuidance: string;
  vulnerableGuidance: string;
  iconType: 'smile' | 'neutral' | 'concerned' | 'warning';
}

export interface ActivityGuidance {
  id: 'walking' | 'jogging' | 'cycling' | 'playground';
  title: string;
  badgeColor: string;
  normalAdvice: string;
  elevatedAdvice: string;
  highAdvice: string;
  veryHighAdvice: string;
}

export interface VulnerableGroup {
  id: 'children' | 'elderly' | 'pregnant' | 'heart_lung';
  title: string;
  summary: string;
  details: string;
  actionRequired: string;
  iconName: string;
}

export interface HistoricalDataPoint {
  timeLabel: string;
  timestamp: string;
  north: number;
  south: number;
  east: number;
  west: number;
  central: number;
  overall: number;
}
