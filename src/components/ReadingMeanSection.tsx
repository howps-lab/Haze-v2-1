import React from 'react';
import {
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PM25_CATEGORIES, getCategoryForPM25 } from '../data/hazeConstants';
import { PM25Category } from '../types/haze';

interface ReadingMeanSectionProps {
  currentPM25: number;
}

export const ReadingMeanSection: React.FC<ReadingMeanSectionProps> = ({ currentPM25 }) => {
  const currentCategory = getCategoryForPM25(currentPM25);
  const categories: PM25Category[] = ['NORMAL', 'ELEVATED', 'HIGH', 'VERY_HIGH'];

  const getBandIcon = (cat: PM25Category) => {
    switch (cat) {
      case 'NORMAL':
        return <Smile className="w-7 h-7 text-white" />;
      case 'ELEVATED':
        return <Meh className="w-7 h-7 text-white" />;
      case 'HIGH':
        return <Frown className="w-7 h-7 text-white" />;
      case 'VERY_HIGH':
      default:
        return <AlertTriangle className="w-7 h-7 text-white" />;
    }
  };

  return (
    <section id="pm25-meaning" className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200 mb-3">
            <span>Story Chapter 03 · Air Quality Classification</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] uppercase tracking-tight">
            WHAT DOES YOUR <span className="text-[#DC2626]">PM2.5 READING MEAN?</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-medium">
            Use the 1-hour PM2.5 reading to guide what you do outdoors right now.
          </p>
        </div>

        {/* 4 Classification Cards */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {categories.map((catKey) => {
            const cat = PM25_CATEGORIES[catKey];
            const isCurrentBand = currentCategory.category === catKey;

            return (
              <div
                key={catKey}
                className={`rounded-2xl border-3 p-4 sm:p-6 transition-all duration-300 relative ${
                  isCurrentBand
                    ? `${cat.bgCard} ${cat.borderColor} shadow-lg ring-4 ring-offset-2 ring-slate-400/30 scale-[1.01]`
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Active Indicator Pin */}
                {isCurrentBand && (
                  <div className="absolute -top-3 right-6 bg-[#1E293B] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Current Singapore Level: {currentPM25} µg/m³</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Category Pill with Icon */}
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${cat.badgeBg} flex items-center justify-center shrink-0 shadow-xs`}>
                      {getBandIcon(catKey)}
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-900 uppercase">
                        {cat.label}
                      </h3>
                      <span className="text-xs font-bold text-slate-500">
                        Band {catKey === 'NORMAL' ? '1' : catKey === 'ELEVATED' ? '2' : catKey === 'HIGH' ? '3' : '4'}
                      </span>
                    </div>
                  </div>

                  {/* Range Value */}
                  <div className="md:col-span-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Concentration
                    </div>
                    <div className="font-display font-black text-2xl sm:text-3xl text-slate-900 font-mono-num">
                      {cat.range}
                    </div>
                  </div>

                  {/* Health Recommendation Advice */}
                  <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Healthy Adult Action
                    </div>
                    <div className="font-bold text-sm sm:text-base text-slate-800 mt-0.5">
                      {cat.headlineAdvice}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {cat.detailedAdvice}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice for Vulnerable Groups */}
        <div className="mt-8 max-w-5xl mx-auto bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-block bg-[#DC2626] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider mb-1">
                  Important Medical Distinction
                </div>
                <h4 className="font-display font-black text-base sm:text-lg text-slate-900">
                  THIS GUIDANCE IS FOR HEALTHY ADULTS
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                  Children, elderly residents, pregnant women, and individuals with heart or chronic lung conditions (such as asthma) need extra precautions and should reduce exertion earlier.
                </p>
              </div>
            </div>
            <a
              href="#vulnerable-care"
              className="px-4 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              <span>Vulnerable Care Guide</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
