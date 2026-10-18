import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 font-display text-xl font-black text-white">
              <span className="w-7 h-7 rounded-lg bg-[#DC2626] text-white flex items-center justify-center text-sm font-black">
                SG
              </span>
              <span>SINGAPORE HAZE WATCH</span>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
              An illustrated public service air quality monitor for Singapore residents, powered by verified real-time PM2.5 readings from data.gov.sg and the National Environment Agency (NEA).
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
              Official Portals & Guidelines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.haze.gov.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Official Singapore Haze Microsite (haze.gov.sg)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nea.gov.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>National Environment Agency (NEA)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.gov.sg/datasets/d_6879815f4c540938e5d0f6229c9cc88a/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Open Data Singapore (Data.gov.sg)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
              Emergency Hotlines
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div>NEA Haze Hotline: <strong className="text-white">1800-2255 632</strong></div>
              <div>MOH HealthLine: <strong className="text-white">1800-225 4488</strong></div>
              <div>SCDF Emergency Ambulance: <strong className="text-white">995</strong></div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Singapore Haze Watch. Built for public health awareness.
          </p>
          <p className="flex items-center gap-1">
            Stay informed. Take care of one another. Breathe better together <Heart className="w-3 h-3 text-red-500 fill-current inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
