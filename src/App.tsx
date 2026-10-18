/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLiveStatus } from './components/HeroLiveStatus';
import { TrendChart } from './components/TrendChart';
import { ActivityGuideSection } from './components/ActivityGuideSection';
import { ReadingMeanSection } from './components/ReadingMeanSection';
import { VulnerableCareSection } from './components/VulnerableCareSection';
import { N95MaskGuideSection } from './components/N95MaskGuideSection';
import { PracticalTipsSection } from './components/PracticalTipsSection';
import { ProtectLovedOnesShareSection } from './components/ProtectLovedOnesShareSection';
import { Footer } from './components/Footer';
import { ComicStoryModal } from './components/ComicStoryModal';
import { ShareModal } from './components/ShareModal';
import { SelectedRegion, SingaporeRegion, HistoricalDataPoint } from './types/haze';
import {
  fetchLatestHazeData,
  fetchHistoricalHazeData,
  TrendResult
} from './services/hazeApi';
import { FALLBACK_READINGS, getCategoryForPM25 } from './data/hazeConstants';

export default function App() {
  // Singapore Clock State (updates every second)
  const [sgTime, setSgTime] = useState<Date>(new Date());

  // Data State
  const [regionalReadings, setRegionalReadings] = useState(FALLBACK_READINGS);
  const [measurementTime, setMeasurementTime] = useState<string>('Loading...');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshCountdown, setRefreshCountdown] = useState<number>(60);

  // Region Selection: 'overall' | 'central' | 'north' | 'south' | 'east' | 'west'
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>('overall');

  // Trend Data
  const [trendData, setTrendData] = useState<HistoricalDataPoint[]>([]);
  const [trendDirection, setTrendDirection] = useState<'improving' | 'stable' | 'worsening' | 'insufficient_data'>('stable');
  const [trendDescription, setTrendDescription] = useState<string>('Loading hourly data...');
  const [deltaPM25, setDeltaPM25] = useState<number>(0);

  // Simulation mode (null = live official reading)
  const [simulatedPM25, setSimulatedPM25] = useState<number | null>(null);

  // Modals
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 1. Live Singapore Clock (Asia/Singapore, updates every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setSgTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Singapore Time
  const formatSgTime = (date: Date): { timeStr: string; dateStr: string } => {
    try {
      const timeFormatter = new Intl.DateTimeFormat('en-SG', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat('en-SG', {
        timeZone: 'Asia/Singapore',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      return {
        timeStr: timeFormatter.format(date) + ' SGT',
        dateStr: dateFormatter.format(date),
      };
    } catch {
      return {
        timeStr: date.toLocaleTimeString() + ' SGT',
        dateStr: date.toDateString(),
      };
    }
  };

  const { timeStr: sgTimeStr, dateStr: sgDateStr } = formatSgTime(sgTime);

  // 2. Fetch Latest Air Quality Data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [latestRes, trendRes] = await Promise.all([
        fetchLatestHazeData(),
        fetchHistoricalHazeData(),
      ]);

      if (latestRes) {
        setRegionalReadings(latestRes.readings);
        setIsLive(latestRes.isLive);

        // Format measurement time from ISO string
        if (latestRes.measurementTimestamp) {
          try {
            const mDate = new Date(latestRes.measurementTimestamp);
            const mTime = mDate.toLocaleTimeString('en-SG', {
              timeZone: 'Asia/Singapore',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });
            setMeasurementTime(`${mTime} SGT`);
          } catch {
            setMeasurementTime(latestRes.measurementTimestamp);
          }
        }

        const now = new Date();
        setLastUpdatedTime(
          now.toLocaleTimeString('en-SG', {
            timeZone: 'Asia/Singapore',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }) + ' SGT'
        );
      }

      if (trendRes) {
        setTrendData(trendRes.dataPoints);
        setTrendDirection(trendRes.trendDirection);
        setTrendDescription(trendRes.trendDescription);
        setDeltaPM25(trendRes.deltaPM25);
      }
    } catch (err) {
      console.error('Error refreshing haze data:', err);
    } finally {
      setIsLoading(false);
      setRefreshCountdown(60);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh countdown (every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          loadData();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Determine current active PM2.5 value
  const regionsList: SingaporeRegion[] = ['central', 'north', 'south', 'east', 'west'];
  const allVals = regionsList.map((r) => regionalReadings[r]);
  const peakVal = Math.max(...allVals);

  let activePM25 = selectedRegion === 'overall' ? peakVal : regionalReadings[selectedRegion];
  if (simulatedPM25 !== null) {
    activePM25 = simulatedPM25;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B]">
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        onOpenStoriesModal={() => setIsStoryModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1 & 4: Hero Live PM2.5 Card + Chapter 1 Story */}
        <HeroLiveStatus
          sgTimeStr={sgTimeStr}
          sgDateStr={sgDateStr}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          regionalReadings={regionalReadings}
          measurementTime={measurementTime}
          lastUpdatedTime={lastUpdatedTime}
          isLive={isLive}
          isLoading={isLoading}
          onRefresh={loadData}
          secondsUntilNextRefresh={refreshCountdown}
          simulatedPM25={simulatedPM25}
          onSetSimulation={setSimulatedPM25}
          onOpenStories={() => setIsStoryModalOpen(true)}
        />

        {/* Section 6: Air Quality Trend Visualisation */}
        <TrendChart
          dataPoints={trendData}
          trendDirection={trendDirection}
          trendDescription={trendDescription}
          deltaPM25={deltaPM25}
          lastUpdatedTime={lastUpdatedTime}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* Section 7: Smart Outdoor Activity Guide (Chapter 02) */}
        <ActivityGuideSection currentPM25={activePM25} />

        {/* Section 5: PM2.5 Colour Classification (Chapter 03) */}
        <ReadingMeanSection currentPM25={activePM25} />

        {/* Section 8: Protect Vulnerable Groups (Chapter 04) */}
        <VulnerableCareSection currentPM25={activePM25} />

        {/* Section 9: N95 Mask Guidance (Chapter 05) */}
        <N95MaskGuideSection />

        {/* Section 10: Practical Protection Tips (Chapter 06) */}
        <PracticalTipsSection />

        {/* Section 11: Protect the People You Love & Sharing (Chapter 07) */}
        <ProtectLovedOnesShareSection
          currentPM25={activePM25}
          measurementTime={measurementTime}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Comic Story Modal */}
      <ComicStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        currentPM25={activePM25}
      />

      {/* Share Advisory Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentPM25={activePM25}
        measurementTime={measurementTime}
      />
    </div>
  );
}
