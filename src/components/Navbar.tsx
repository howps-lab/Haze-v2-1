import React from 'react';
import { Wind, BookOpen, Share2 } from 'lucide-react';

interface NavbarProps {
  onOpenStoriesModal: () => void;
  onOpenShareModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStoriesModal,
  onOpenShareModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 font-display text-xl sm:text-2xl font-black tracking-tight text-[#1E293B] hover:text-[#DC2626] transition-colors whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-black text-base shadow-sm">
              SG
            </span>
            <span className="flex items-center gap-1.5">
              <span>HAZE</span>
              <span className="text-[#DC2626]">WATCH</span>
            </span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a
              href="#air-quality"
              className="hover:text-[#1E293B] hover:underline decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Air Quality
            </a>
            <a
              href="#activity-guide"
              className="hover:text-[#1E293B] hover:underline decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Activity Guide
            </a>
            <a
              href="#pm25-meaning"
              className="hover:text-[#1E293B] hover:underline decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              PM2.5 Bands
            </a>
            <a
              href="#vulnerable-care"
              className="hover:text-[#1E293B] hover:underline decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Vulnerable Groups
            </a>
            <a
              href="#n95-guidance"
              className="hover:text-[#1E293B] hover:underline decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              N95 Masks
            </a>
            <a
              href="#comic-stories"
              className="hover:text-[#1E293B] hover:underline decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Safety Comics
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenShareModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200"
              title="Share air quality advisory"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Advisory</span>
            </button>
            <button
              onClick={onOpenStoriesModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Comics</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
