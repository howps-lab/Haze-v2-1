import React, { useState } from 'react';
import {
  RefreshCw,
  Clock,
  MapPin,
  AlertTriangle,
  Smile,
  Meh,
  Frown,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import { SelectedRegion, SingaporeRegion } from '../types/haze';
import {
  PM25_CATEGORIES,
  getCategoryForPM25,
  REGION_SHORT_NAMES,
  REGION_NAMES
} from '../data/hazeConstants';

interface HeroLiveStatusProps {
  sgTimeStr: string;
  sgDateStr: string;
  selectedRegion: SelectedRegion;
  onSelectRegion: (region: SelectedRegion) => void;
  regionalReadings: {
    north: number;
    south: number;
    east: number;
    west: number;
    central: number;
  };
  measurementTime: string;
  lastUpdatedTime: string;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  secondsUntilNextRefresh: number;
  simulatedPM25: number | null;
  onSetSimulation: (val: number | null) => void;
  onOpenStories: () => void;
}

export const HeroLiveStatus: React.FC<HeroLiveStatusProps> = ({
  sgTimeStr,
  sgDateStr,
  selectedRegion,
  onSelectRegion,
  regionalReadings,
  measurementTime,
  lastUpdatedTime,
  isLive,
  isLoading,
  onRefresh,
  secondsUntilNextRefresh,
  simulatedPM25,
  onSetSimulation,
  onOpenStories,
}) => {
  const [showSimPanel, setShowSimPanel] = useState(false);

  // Determine current active reading value based on selected region or simulation
  const regionsList: SingaporeRegion[] = ['central', 'north', 'south', 'east', 'west'];
  const allVals = regionsList.map((r) => regionalReadings[r]);
  const peakVal = Math.max(...allVals);

  let activeValue = selectedRegion === 'overall' ? peakVal : regionalReadings[selectedRegion];
  if (simulatedPM25 !== null) {
    activeValue = simulatedPM25;
  }

  const activeCategory = getCategoryForPM25(activeValue);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'smile':
        return <Smile className="w-8 h-8 text-[#15803D]" />;
      case 'neutral':
        return <Meh className="w-8 h-8 text-[#B45309]" />;
      case 'concerned':
        return <Frown className="w-8 h-8 text-[#C2410C]" />;
      case 'warning':
      default:
        return <AlertTriangle className="w-8 h-8 text-[#991B1B]" />;
    }
  };

  return (
    <section id="air-quality" className="relative pt-6 pb-12 overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#F8FAFC] to-[#F1F5F9]">
      {/* Background soft sun flare */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Header Pill Bar: Real-time SGT Clock & Official Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#1E293B]">Singapore Time (SGT):</span>
            <span className="font-mono-num font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
              {sgTimeStr}
            </span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="text-slate-500 hidden sm:inline">{sgDateStr}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {simulatedPM25 !== null ? (
              <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-md border border-amber-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Scenario Simulation Mode
                <button
                  onClick={() => onSetSimulation(null)}
                  className="ml-1 text-xs text-amber-800 underline hover:text-black font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </span>
            ) : isLive ? (
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Live Feed (data.gov.sg / NEA)
              </span>
            ) : (
              <span className="text-amber-700 font-medium flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Demonstration Mode (Offline fallback)
              </span>
            )}

            <button
              onClick={() => setShowSimPanel(!showSimPanel)}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Test different air quality scenarios"
            >
              <Sliders className="w-3 h-3 text-slate-500" />
              <span>{showSimPanel ? 'Hide Simulator' : 'Test Scenarios'}</span>
            </button>
          </div>
        </div>

        {/* Optional Simulator Drawer */}
        {showSimPanel && (
          <div className="mb-6 p-4 bg-amber-50/80 border-2 border-amber-200 rounded-2xl animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  Air Quality Scenario Simulator
                </h4>
                <p className="text-xs text-amber-800">
                  Preview how the advisory cards, activity guides, and warnings react during various haze intensities.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onSetSimulation(38)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    simulatedPM25 === 38
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                  }`}
                >
                  Normal (38 µg/m³)
                </button>
                <button
                  onClick={() => onSetSimulation(88)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    simulatedPM25 === 88
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-amber-800 hover:bg-amber-100 border border-amber-300'
                  }`}
                >
                  Elevated (88 µg/m³)
                </button>
                <button
                  onClick={() => onSetSimulation(185)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    simulatedPM25 === 185
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-orange-800 hover:bg-orange-100 border border-orange-300'
                  }`}
                >
                  High (185 µg/m³)
                </button>
                <button
                  onClick={() => onSetSimulation(275)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    simulatedPM25 === 275
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-red-800 hover:bg-red-100 border border-red-300'
                  }`}
                >
                  Very High (275 µg/m³)
                </button>
                <button
                  onClick={() => onSetSimulation(null)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
                >
                  Use Live Feed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Oversized Illustrated Reading Card (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              className={`rounded-3xl border-3 p-6 sm:p-8 transition-colors ${activeCategory.bgCard} ${activeCategory.borderColor} shadow-lg relative`}
            >
              {/* Badge Kicker */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-wider uppercase text-slate-500 font-display">
                    SINGAPORE AIR WATCH
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-600">1-HOUR PM2.5</span>
                </div>

                {/* Region Selector Pills */}
                <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-slate-200/80 shadow-2xs">
                  <button
                    onClick={() => onSelectRegion('overall')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedRegion === 'overall'
                        ? 'bg-[#1E293B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Peak (SG)
                  </button>
                  {regionsList.map((r) => (
                    <button
                      key={r}
                      onClick={() => onSelectRegion(r)}
                      className={`px-2 py-1 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                        selectedRegion === r
                          ? 'bg-[#1E293B] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title={REGION_NAMES[r]}
                    >
                      {REGION_SHORT_NAMES[r]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Card Main Display */}
              <div className="mt-2">
                <div className="flex items-baseline gap-3">
                  <div className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#1E293B] font-mono-num leading-none">
                    {activeValue}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black text-slate-500">
                      µg/m³
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      1-hr concentration
                    </span>
                  </div>
                </div>

                {/* Category Banner with Character Icon */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div
                    className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-white font-display font-black text-lg sm:text-xl tracking-wide uppercase ${activeCategory.badgeBg} shadow-sm`}
                  >
                    {getCategoryIcon(activeCategory.iconType)}
                    <span>{activeCategory.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 bg-white/70 px-3 py-1.5 rounded-xl border border-slate-200">
                    Official Band: {activeCategory.range}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Region:{' '}
                    <strong className="text-slate-700 capitalize">
                      {selectedRegion === 'overall' ? 'Singapore Peak (Highest)' : selectedRegion}
                    </strong>
                  </span>
                </div>

                {/* Health Recommendation Comic Speech Bubble */}
                <div className="mt-6 bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm relative">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 font-display">
                        "{activeCategory.headlineAdvice}"
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {activeCategory.detailedAdvice}
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                        <span className="text-emerald-700 font-bold">
                          ✓ Healthy Adults: {activeCategory.healthyAdultGuidance}
                        </span>
                        <a
                          href="#vulnerable-care"
                          className="text-[#DC2626] hover:underline font-bold"
                        >
                          Vulnerable groups guidance →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timestamps & Refresh Controls */}
                <div className="mt-5 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Measured: <strong className="text-slate-800 font-mono-num">{measurementTime}</strong>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span>
                      Refreshed: <span className="text-slate-800 font-mono-num">{lastUpdatedTime}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono-num hidden sm:inline">
                      Auto in {secondsUntilNextRefresh}s
                    </span>
                    <button
                      onClick={onRefresh}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 text-slate-600 ${isLoading ? 'animate-spin' : ''}`}
                      />
                      <span>{isLoading ? 'Checking...' : 'Refresh'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Quick Strip */}
            <div className="mt-4 grid grid-cols-5 gap-2 bg-white rounded-2xl p-2.5 border border-slate-200 shadow-2xs">
              {regionsList.map((r) => {
                const val = regionalReadings[r];
                const cat = getCategoryForPM25(val);
                const isSelected = selectedRegion === r;
                return (
                  <button
                    key={r}
                    onClick={() => onSelectRegion(r)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">
                      {REGION_SHORT_NAMES[r]}
                    </span>
                    <span className="text-base sm:text-lg font-black font-mono-num mt-0.5">
                      {val}
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm mt-0.5 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : `${cat.badgeBg} text-white`
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Comic Story Card (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="h-full bg-white rounded-3xl border-3 border-slate-200 overflow-hidden shadow-lg flex flex-col">
              {/* Comic Image with Header */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
                <img
                  src="/story01.png"
                  alt="The Haze Is Back comic poster showing Singapore residents in HDB estate"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to generated image path if needed
                    e.currentTarget.src = '/src/assets/images/haze_hero_story_1792293869861.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-[#DC2626] text-white font-display font-black text-xs px-3 py-1 rounded-lg shadow-md tracking-wider uppercase">
                  Story Chapter 01
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                  Illustrated Public Health Series
                </div>
              </div>

              {/* Comic Summary & Reader CTA */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl text-[#1E293B] leading-tight">
                    THE HAZE IS BACK?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Air quality conditions in Singapore can shift rapidly depending on regional wind currents and hotspot activity. Learn what the 1-hour PM2.5 readings mean for your daily routine.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-500">
                    7 Interactive Story Chapters
                  </div>
                  <button
                    onClick={onOpenStories}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E293B] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>Open Comic Reader</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
