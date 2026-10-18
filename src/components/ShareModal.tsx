import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  HeartHandshake
} from 'lucide-react';
import { getCategoryForPM25 } from '../data/hazeConstants';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPM25: number;
  measurementTime: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  currentPM25,
  measurementTime,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const currentCategory = getCategoryForPM25(currentPM25);

  const getShareText = () => {
    return `🇸🇬 Singapore Air Quality Advisory:\n• 1-Hour PM2.5: ${currentPM25} µg/m³ (${currentCategory.label})\n• Health Advice: "${currentCategory.headlineAdvice}"\n• Official NEA Measurement: ${measurementTime}\n\nStay safe & check live updates before heading outdoors:\n${window.location.origin}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTelegram = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border-3 border-slate-900 shadow-2xl w-full max-w-md p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#DC2626]" />
            <h3 className="font-display font-black text-lg text-slate-900">
              Share Air Advisory
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4">
          <p className="text-xs text-slate-600 mb-3">
            Send this verified Singapore air quality alert to friends, family, and group chats:
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 font-mono-num leading-relaxed">
            <div className="font-bold text-slate-900 mb-1">
              🇸🇬 Singapore Air Quality Advisory
            </div>
            <div>• 1-Hour PM2.5: <strong>{currentPM25} µg/m³</strong> ({currentCategory.label})</div>
            <div>• Guidance: "{currentCategory.headlineAdvice}"</div>
            <div className="text-slate-400 text-[10px] mt-2">
              Measured: {measurementTime} SGT · Official NEA Source
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send to WhatsApp Group or Chat</span>
          </button>

          <button
            onClick={handleTelegram}
            className="w-full py-2.5 px-4 bg-[#0088CC] hover:bg-[#0077B5] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send to Telegram</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Advisory Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Advisory Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
