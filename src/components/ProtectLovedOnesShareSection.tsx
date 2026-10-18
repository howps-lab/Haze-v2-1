import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Heart,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { getCategoryForPM25 } from '../data/hazeConstants';

interface ProtectLovedOnesShareSectionProps {
  currentPM25: number;
  measurementTime: string;
}

export const ProtectLovedOnesShareSection: React.FC<ProtectLovedOnesShareSectionProps> = ({
  currentPM25,
  measurementTime,
}) => {
  const [copied, setCopied] = useState(false);
  const currentCategory = getCategoryForPM25(currentPM25);

  const getShareText = () => {
    return `🇸🇬 Singapore Air Quality Advisory:\n• 1-Hour PM2.5: ${currentPM25} µg/m³ (${currentCategory.label})\n• Health Guidance: ${currentCategory.headlineAdvice}\n• Measured: ${measurementTime}\n\nStay informed & take care of one another! Check live updates here:\n${window.location.origin}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareText());
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(getShareText());
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="comic-stories" className="py-12 bg-gradient-to-b from-[#FFFDF8] to-[#FFF3E8] border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#DC2626] text-xs font-bold border border-red-200 mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Story Chapter 07 · Community & Family Care</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] uppercase tracking-tight">
            PROTECT THE <span className="text-[#DC2626]">PEOPLE YOU LOVE</span>
          </h2>
          <p className="mt-3 text-base text-slate-700 leading-relaxed font-medium">
            Haze conditions can change throughout the day. Share verified readings with family, neighbours, and friends to keep everyone safe.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto mb-10">
          {/* Left Column: Loving Family Illustration */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border-3 border-amber-300 shadow-xl bg-white aspect-[4/3] relative">
            <img
              src="/story07.png"
              alt="Heartwarming multi-generational Singapore family gathered on sofa"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/family_care_couch_1792293873982.jpg';
              }}
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-sm">
              Same Skies · Stronger Together ♡
            </div>
          </div>

          {/* Right Column: Share Action Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-3 border-slate-200 p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Live Snapshot Preview
                </span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-md text-white ${currentCategory.badgeBg}`}>
                  {currentCategory.label}
                </span>
              </div>

              {/* Pre-formatted preview card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 font-mono-num text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 text-sm">
                  🇸🇬 Singapore Air Quality Advisory
                </div>
                <div>1-Hour PM2.5: <strong>{currentPM25} µg/m³</strong> ({currentCategory.label})</div>
                <div>Guidance: "{currentCategory.headlineAdvice}"</div>
                <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                  Measured: {measurementTime} SGT · Official NEA Source
                </div>
              </div>

              <h4 className="font-display font-black text-xl text-slate-900">
                Share this with someone you care about
              </h4>
              <p className="text-xs text-slate-600 mt-1 mb-5">
                Send a quick WhatsApp or Telegram message to alert parents, school groups, sports buddies, or colleagues.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Share via WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleTelegramShare}
                  className="py-2.5 px-3 bg-[#0088CC] hover:bg-[#0077B5] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Share Telegram</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Advisory</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Official Resources & Hotlines Footer Strip */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-amber-200 p-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Singapore Government Haze Portals:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-600 font-bold">
              <a
                href="https://www.haze.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#DC2626] hover:underline"
              >
                <span>haze.gov.sg</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.nea.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-900"
              >
                <span>NEA Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://data.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-900"
              >
                <span>Data.gov.sg API</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">NEA Hotline: 1800-2255 632</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
