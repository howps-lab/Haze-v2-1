import React from 'react';
import {
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  HelpCircle,
  Train,
  Briefcase,
  ShoppingBag
} from 'lucide-react';
import { MASK_GUIDANCE } from '../data/hazeConstants';

export const N95MaskGuideSection: React.FC = () => {
  return (
    <section id="n95-guidance" className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-3">
            <span>Story Chapter 05 · Mask & Respirator Facts</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] uppercase tracking-tight">
            DO YOU NEED AN N95? <span className="text-[#DC2626]">NOT ALWAYS.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-medium">
            For short periods outdoors, such as commuting, an N95 is generally not needed.
          </p>
        </div>

        {/* 2 Main Panels: Short Trips vs Longer Exposure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
          {/* Panel 1: Short Trips */}
          <div className="bg-white rounded-3xl border-3 border-emerald-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="bg-emerald-600 text-white font-display font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider">
                  SHORT TRIP OUTDOORS
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Under 30–45 mins
                </span>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <Train className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Walking to the MRT or bus interchange</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Going to school or office commute</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Quick neighbourhood coffeeshop or market run</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {MASK_GUIDANCE.shortTrips.explanation}
              </p>
            </div>

            <div className="bg-emerald-100 rounded-2xl p-4 border border-emerald-300 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-emerald-700 shrink-0" />
              <div>
                <div className="font-display font-black text-emerald-950 text-base">
                  N95 Generally Not Needed
                </div>
                <span className="text-xs text-emerald-800 font-medium">
                  Normal breathing filters coarse particles; avoid over-exertion.
                </span>
              </div>
            </div>
          </div>

          {/* Panel 2: Longer Exposure */}
          <div className="bg-white rounded-3xl border-3 border-amber-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="bg-amber-600 text-white font-display font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider">
                  LONGER OUTDOOR EXPOSURE
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                  Several consecutive hours
                </span>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Spending multiple hours outdoors</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Outdoor delivery, construction, or maintenance shifts</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>When 24-hr PSI exceeds 100 or 1-hr PM2.5 is high</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {MASK_GUIDANCE.prolongedExposure.explanation}
              </p>
            </div>

            <div className="bg-amber-100 rounded-2xl p-4 border border-amber-300 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-amber-800 shrink-0" />
              <div>
                <div className="font-display font-black text-amber-950 text-base">
                  Check Guidance & Consider N95
                </div>
                <span className="text-xs text-amber-900 font-medium">
                  Ensure a proper facial seal; regular surgical masks do not filter PM2.5.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Children Warning & General Reminder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Children Warning Card */}
          <div className="md:col-span-6 bg-pink-50 rounded-3xl border-2 border-pink-200 p-6 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-[#DC2626] text-white font-display font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider mb-3">
                WHAT ABOUT CHILDREN?
              </div>
              <h4 className="font-display font-black text-xl text-slate-900">
                Adult N95 Masks Do Not Fit Children
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                Adult N95 respirators are sized for adult face dimensions. On young children, air leaks in freely around the nose and cheeks without passing through the filter material.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-pink-200/80 text-xs font-bold text-pink-900">
              Best protection for kids: Keep them indoors with clean, filtered air.
            </div>
          </div>

          {/* Masks Are Only One Part Banner */}
          <div className="md:col-span-6 bg-emerald-50 rounded-3xl border-2 border-emerald-200 p-6 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-emerald-700 text-white font-display font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider mb-3">
                COMPREHENSIVE PROTECTION
              </div>
              <h4 className="font-display font-black text-xl text-slate-900">
                Masks Are Only One Part of Defense
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {MASK_GUIDANCE.generalReminder}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/80 text-xs font-bold text-emerald-900">
              When in doubt: Spend less time outdoors in the haze.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
