import React from 'react';
import {
  Footprints,
  Activity,
  Bike,
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { PM25Category } from '../types/haze';
import { ACTIVITIES_GUIDANCE, getCategoryForPM25 } from '../data/hazeConstants';

interface ActivityGuideSectionProps {
  currentPM25: number;
}

export const ActivityGuideSection: React.FC<ActivityGuideSectionProps> = ({ currentPM25 }) => {
  const currentCategory = getCategoryForPM25(currentPM25);

  const getActivityIcon = (id: string) => {
    switch (id) {
      case 'walking':
        return <Footprints className="w-6 h-6 text-emerald-600" />;
      case 'jogging':
        return <Activity className="w-6 h-6 text-orange-600" />;
      case 'cycling':
        return <Bike className="w-6 h-6 text-sky-600" />;
      case 'playground':
      default:
        return <Sparkles className="w-6 h-6 text-purple-600" />;
    }
  };

  const getSpecificAdvice = (act: typeof ACTIVITIES_GUIDANCE[0], cat: PM25Category) => {
    switch (cat) {
      case 'NORMAL':
        return {
          text: act.normalAdvice,
          status: 'Suitable as usual',
          statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
          icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
        };
      case 'ELEVATED':
        return {
          text: act.elevatedAdvice,
          status: 'Pace down / Reduce',
          statusColor: 'text-amber-800 bg-amber-100 border-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        };
      case 'HIGH':
        return {
          text: act.highAdvice,
          status: 'Move indoors / Avoid',
          statusColor: 'text-orange-800 bg-orange-100 border-orange-300',
          icon: <AlertTriangle className="w-4 h-4 text-orange-600" />,
        };
      case 'VERY_HIGH':
      default:
        return {
          text: act.veryHighAdvice,
          status: 'Avoid outdoors',
          statusColor: 'text-red-800 bg-red-100 border-red-300',
          icon: <XCircle className="w-4 h-4 text-red-600" />,
        };
    }
  };

  return (
    <section id="activity-guide" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Comic Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Story Chapter 02 · Outdoor Planning</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] uppercase tracking-tight">
            GOING OUT? <span className="text-[#DC2626]">CHECK THIS FIRST</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-medium">
            Use the current 1-hour PM2.5 reading ({currentPM25} µg/m³ · {currentCategory.label}) to guide your immediate outdoor plans.
          </p>
        </div>

        {/* 2-Column Showcase: Graphic Comic Card + 4 Interactive Activity Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Asset Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border-3 border-slate-200 overflow-hidden shadow-lg bg-[#F8FAFC]">
              <div className="aspect-[4/3] relative">
                <img
                  src="/story02.png"
                  alt="Comic illustration showing walking, jogging, cycling, and playground activities in Singapore"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/images/outdoor_activities_guide_1792293871784.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-[#1E293B] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  Real-Time Activity Matrix
                </div>
              </div>
              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-amber-900 tracking-wider">
                      Singapore Weather & Air Quality Notice
                    </h4>
                    <p className="text-xs text-amber-800 font-medium mt-0.5">
                      Air quality can shift throughout the afternoon. Always check readings right before stepping out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Illustrated Activity Recommendation Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACTIVITIES_GUIDANCE.map((act) => {
              const advice = getSpecificAdvice(act, currentCategory.category);
              return (
                <div
                  key={act.id}
                  className="bg-[#FAFAFA] rounded-2xl border-2 border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Activity Title + Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                          {getActivityIcon(act.id)}
                        </div>
                        <h4 className="font-display font-black text-lg text-slate-900">
                          {act.title}
                        </h4>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${advice.statusColor}`}>
                        {advice.icon}
                        <span>{advice.status}</span>
                      </span>
                    </div>

                    {/* Specific Action Text */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {advice.text}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Category: <strong>{currentCategory.label}</strong></span>
                    <span>{currentPM25} µg/m³</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Big Alert Callout Banner */}
        <div className="mt-8 bg-amber-500 text-slate-950 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border-2 border-amber-600">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h5 className="font-display font-black text-base sm:text-lg uppercase tracking-wide">
                Air quality can change throughout the day
              </h5>
              <p className="text-xs sm:text-sm text-amber-950 font-medium">
                Plan short routes, carry water, and check the 1-hour PM2.5 reading again before heading home.
              </p>
            </div>
          </div>
          <a
            href="#air-quality"
            className="px-5 py-2.5 bg-slate-950 text-white rounded-xl text-xs sm:text-sm font-black hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            Check Live Reading ↑
          </a>
        </div>
      </div>
    </section>
  );
};
