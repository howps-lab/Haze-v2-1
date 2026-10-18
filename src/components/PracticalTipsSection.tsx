import React from 'react';
import {
  Clock,
  Home,
  Wind,
  HeartPulse,
  Pill,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PRACTICAL_TIPS } from '../data/hazeConstants';

export const PracticalTipsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-bold border border-orange-200 mb-3">
            <span>Story Chapter 06 · Practical Measures</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] uppercase tracking-tight">
            WHAT ELSE <span className="text-[#DC2626]">CAN YOU DO?</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-medium">
            Simple, actionable ways to reduce your haze exposure at home and at work.
          </p>
        </div>

        {/* 4 Comic Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
          {PRACTICAL_TIPS.map((tip) => (
            <div
              key={tip.number}
              className="bg-[#FAFAFA] rounded-3xl border-3 border-slate-200 p-6 sm:p-7 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-2xl text-white font-display font-black text-lg flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: tip.color }}
                    >
                      {tip.number}
                    </span>
                    <h3 className="font-display font-black text-xl text-slate-900">
                      {tip.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {tip.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="text-emerald-600">✓ Action:</span>
                <span>{tip.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comic Companion Artwork & Heart/Lung Callout */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-50 to-amber-50 rounded-3xl border-2 border-red-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-md">
                <Pill className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-[#DC2626] tracking-wider">
                  Critical Healthcare Advice
                </span>
                <h4 className="font-display font-black text-xl sm:text-2xl text-slate-900 mt-0.5">
                  HEART OR LUNG CONDITION?
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                  Keep your necessary medication readily available. Be prepared, so you can breathe easier. Ensure asthma inhalers are not expired and have sufficient doses remaining.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="bg-white px-3 py-1 rounded-lg border border-red-200">
                    Reliever Inhaler Accessible
                  </span>
                  <span className="bg-white px-3 py-1 rounded-lg border border-red-200">
                    Drink Plenty of Water
                  </span>
                  <span className="bg-white px-3 py-1 rounded-lg border border-red-200">
                    Avoid Sudden Exertion
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-red-200 shadow-xs aspect-[4/3]">
              <img
                src="/story06.png"
                alt="Illustrated four panel comic showing indoor tips"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/indoor_tips_measures_1792293874086.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
