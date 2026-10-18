import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Share2,
  ExternalLink,
  Volume2,
  Sparkles
} from 'lucide-react';

interface ComicStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapter?: number;
  currentPM25: number;
}

interface ChapterData {
  number: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  fallbackSrc: string;
  summary: string;
  keyTakeaway: string;
}

const CHAPTERS: ChapterData[] = [
  {
    number: 1,
    title: 'THE HAZE IS BACK',
    subtitle: 'What you should know before heading outdoors',
    imageSrc: '/story01.png',
    fallbackSrc: '/src/assets/images/haze_hero_story_1792293869861.jpg',
    summary: 'When haze drifts into Singapore from regional bushfires, particulate concentrations rise. Before heading out for your morning jog, school drop-off, or park walk, checking the 1-hour PM2.5 reading helps you plan your day safely.',
    keyTakeaway: 'Always check official readings on haze.gov.sg or our app before heading out.',
  },
  {
    number: 2,
    title: 'GOING OUT? CHECK THIS FIRST',
    subtitle: 'Use 1-Hour PM2.5 to guide immediate activities',
    imageSrc: '/story02.png',
    fallbackSrc: '/src/assets/images/outdoor_activities_guide_1792293871784.jpg',
    summary: 'The 1-hour PM2.5 reading is the best gauge of current air quality for immediate outdoor plans. Whether walking to the MRT, jogging, cycling, or letting children play at the playground, match your plans to current levels.',
    keyTakeaway: 'Air quality changes throughout the day. Re-check before evening workouts or playtime.',
  },
  {
    number: 3,
    title: 'WHAT DOES YOUR PM2.5 READING MEAN?',
    subtitle: 'Understanding the 4 official air quality bands',
    imageSrc: '/story03.png',
    fallbackSrc: '/src/assets/images/haze_hero_story_1792293869861.jpg',
    summary: '0–55 µg/m³ is Normal (carry on as usual). 56–150 is Elevated (reduce strenuous outdoor activity). 151–250 is High (avoid strenuous outdoor workouts). 251+ is Very High (minimise outdoor activity).',
    keyTakeaway: 'This threshold matrix is designed for healthy adults. High-risk groups need earlier precautions.',
  },
  {
    number: 4,
    title: 'SOME PEOPLE NEED EXTRA CARE',
    subtitle: 'Guidance for children, elderly, pregnant women & patients',
    imageSrc: '/story04.png',
    fallbackSrc: '/src/assets/images/vulnerable_groups_care_1792293873129.jpg',
    summary: 'Children, seniors, pregnant women, and people with asthma or heart conditions are significantly more susceptible to particulate irritation. In Elevated air, they should avoid strenuous exertion; in High/Very High, they should stay indoors.',
    keyTakeaway: 'Keep reliever inhalers and daily cardiovascular medication readily accessible.',
  },
  {
    number: 5,
    title: 'DO YOU NEED AN N95? NOT ALWAYS.',
    subtitle: 'Respirator guidelines for everyday Singapore life',
    imageSrc: '/story05.png',
    fallbackSrc: '/src/assets/images/mask_guidance_infographic_1792293873052.jpg',
    summary: 'For short outdoor periods (under 30 minutes, such as walking to the MRT or running quick errands), healthy adults generally do not need an N95. For prolonged outdoor exposure during high haze, a properly fitted N95 helps. Note that adult N95 masks do not fit children.',
    keyTakeaway: 'Masks are only one part of protection. The best action is minimising unnecessary exposure.',
  },
  {
    number: 6,
    title: 'WHAT ELSE CAN YOU DO?',
    subtitle: 'Practical protective measures for home and work',
    imageSrc: '/story06.png',
    fallbackSrc: '/src/assets/images/indoor_tips_measures_1792293874086.jpg',
    summary: 'Cut down outdoor time, move exercise routines indoors, keep windows and doors closed with an air purifier running, and listen to your body. Drink plenty of water to soothe throat dryness.',
    keyTakeaway: 'When in doubt: spend less time in the haze and keep indoor air filtered.',
  },
  {
    number: 7,
    title: 'PROTECT THE PEOPLE YOU LOVE',
    subtitle: 'Look out for one another and stay informed',
    imageSrc: '/story07.png',
    fallbackSrc: '/src/assets/images/family_care_couch_1792293873982.jpg',
    summary: 'Haze episodes test community resilience. By sharing verified air quality updates with loved ones, checking in on elderly relatives, and keeping children safe indoors, Singapore stays healthy together.',
    keyTakeaway: 'Stay informed. Take care of one another. Breathe better together ♡',
  },
];

export const ComicStoryModal: React.FC<ComicStoryModalProps> = ({
  isOpen,
  onClose,
  initialChapter = 0,
  currentPM25,
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialChapter);

  if (!isOpen) return null;

  const chapter = CHAPTERS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < CHAPTERS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : CHAPTERS.length - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-3 border-slate-900 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Modal Bar */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="font-display font-black text-sm uppercase tracking-wider">
              Official Singapore Comic Series · Chapter {chapter.number} of {CHAPTERS.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 font-mono-num hidden sm:inline">
              Live SG PM2.5: <strong>{currentPM25} µg/m³</strong>
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Illustrated Visual + Story Explainer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Panel */}
            <div className="md:col-span-7 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 aspect-[4/3] shadow-md relative">
              <img
                src={chapter.imageSrc}
                alt={chapter.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = chapter.fallbackSrc;
                }}
              />
              <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-xs font-black px-2.5 py-1 rounded shadow-md uppercase">
                Chapter {chapter.number}
              </div>
            </div>

            {/* Story & Explainer Column */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Singapore Public Service Comic
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900 mt-1 leading-tight">
                  {chapter.title}
                </h3>
                <h4 className="text-xs font-bold text-[#DC2626] uppercase tracking-wide mt-1">
                  {chapter.subtitle}
                </h4>

                <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {chapter.summary}
                </p>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Public Health Advice:</span>
                </div>
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  {chapter.keyTakeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Chapter Selector Strip */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">
              Select Story Chapter:
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.number}
                  onClick={() => setCurrentIdx(idx)}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer ${
                    currentIdx === idx
                      ? 'bg-[#DC2626] text-white font-black shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold'
                  }`}
                >
                  <span className="block text-[10px] uppercase opacity-75">Ch</span>
                  <span className="text-sm font-black">{ch.number}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-bold text-slate-500 font-mono-num">
            {chapter.number} / {CHAPTERS.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-[#1E293B] hover:bg-black text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
