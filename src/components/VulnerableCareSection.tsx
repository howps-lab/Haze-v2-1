import React from 'react';
import {
  Baby,
  UserCheck,
  HeartHandshake,
  Activity,
  AlertCircle,
  Pill,
  Stethoscope,
  PhoneCall,
  Check
} from 'lucide-react';
import { VULNERABLE_GROUPS } from '../data/hazeConstants';

interface VulnerableCareSectionProps {
  currentPM25: number;
}

export const VulnerableCareSection: React.FC<VulnerableCareSectionProps> = ({ currentPM25 }) => {
  const getGroupIcon = (id: string) => {
    switch (id) {
      case 'children':
        return <Baby className="w-6 h-6 text-sky-600" />;
      case 'elderly':
        return <UserCheck className="w-6 h-6 text-emerald-600" />;
      case 'pregnant':
        return <HeartHandshake className="w-6 h-6 text-purple-600" />;
      case 'heart_lung':
      default:
        return <Activity className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="vulnerable-care" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200 mb-3">
            <span>Story Chapter 04 · High-Risk Protection</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] uppercase tracking-tight">
            SOME PEOPLE NEED <span className="text-[#DC2626]">EXTRA CARE</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-medium">
            Certain groups are far more vulnerable to particulate matter. Learn how to protect your family members during haze days.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {VULNERABLE_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-[#FAFBFD] rounded-3xl border-2 border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center mb-4">
                  {getGroupIcon(group.id)}
                </div>
                <h3 className="font-display font-black text-xl text-slate-900">
                  {group.title}
                </h3>
                <div className="mt-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                  {group.summary}
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {group.details}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <span className="text-[11px] font-bold text-[#DC2626] block">
                  Action required:
                </span>
                <span className="text-xs text-slate-700 font-medium">
                  {group.actionRequired}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* When PM2.5 Rises Guidance Banner */}
        <div className="bg-[#1E293B] text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-md">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
              Official Precautions Rule
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl mt-1">
              WHEN PM2.5 RISES... (For Vulnerable People)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <h4 className="font-display font-black text-amber-300 text-lg uppercase">
                  Elevated (56 – 150 µg/m³)
                </h4>
              </div>
              <p className="text-sm font-semibold text-white">
                Avoid strenuous outdoor activity.
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Healthy adults only need to reduce exertion, but vulnerable people should avoid strenuous outdoor exertion immediately.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <h4 className="font-display font-black text-red-400 text-lg uppercase">
                  High / Very High (151+ µg/m³)
                </h4>
              </div>
              <p className="text-sm font-semibold text-white">
                Avoid outdoor activity completely.
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Stay indoors with doors and windows closed. Switch on an air purifier with HEPA filter and avoid opening balconies.
              </p>
            </div>
          </div>
        </div>

        {/* Medical & Inhaler Special Panel with Illustrated Companion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm aspect-[4/3] bg-slate-100">
            <img
              src="/story04.png"
              alt="Public health comic illustration for vulnerable groups"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/vulnerable_groups_care_1792293873129.jpg';
              }}
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            {/* Medication Card */}
            <div className="bg-sky-50 rounded-2xl p-5 border-2 border-sky-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-black text-slate-900 text-base sm:text-lg">
                  Heart or Lung Condition? Keep Medication Ready
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  Keep fast-acting reliever inhalers (such as Salbutamol/Ventolin) and regular cardiovascular medication within easy reach. Do not stop prescribed maintenance inhalers during haze periods.
                </p>
              </div>
            </div>

            {/* Doctor Card */}
            <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-black text-slate-900 text-base sm:text-lg">
                  Feeling Unwell? Seek Timely Medical Attention
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  If you experience breathlessness, persistent wheezing, tightness in the chest, or severe eye irritation, visit a nearby GP clinic or SingHealth/NHG/NUHS Polyclinic promptly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
