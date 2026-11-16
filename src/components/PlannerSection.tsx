import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Clock, Compass, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  type ActivityPreferenceKey,
  DURATION_OPTIONS,
  type DurationMinutes,
  type ItineraryResult,
  MOOD_OPTIONS,
  type MoodKey,
  PREFERENCE_OPTIONS,
  getMoodLabel,
  getPreferenceLabel,
} from '../shared/itineraryTypes.ts';
import { generateRuleBasedItinerary } from '../shared/ruleEngine.ts';
import { ItineraryResultCard } from './ItineraryResultCard.tsx';

interface PlannerSectionProps {
  mood: MoodKey;
  duration: DurationMinutes;
  preferences: ActivityPreferenceKey[];
  onChangeMood: (mood: MoodKey) => void;
  onChangeDuration: (duration: DurationMinutes) => void;
  onTogglePreference: (pref: ActivityPreferenceKey) => void;
  onResetAll: () => void;
}

const PROGRESS_STAGES = [
  '01. 讀取此刻的心情步調',
  '02. 配對星泉湖與 1935 營業所空間',
  '03. 細算每站停留時間與感官動線',
] as const;

export function PlannerSection({
  mood,
  duration,
  preferences,
  onChangeMood,
  onChangeDuration,
  onTogglePreference,
  onResetAll,
}: PlannerSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [variantSeed, setVariantSeed] = useState(0);
  const [result, setResult] = useState<ItineraryResult | null>(null);
  const [preferenceHint, setPreferenceHint] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);
  const plannerTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!preferenceHint) return;
    const timer = setTimeout(() => setPreferenceHint(null), 2600);
    return () => clearTimeout(timer);
  }, [preferenceHint]);

  const handlePrefClick = (pref: ActivityPreferenceKey) => {
    if (preferences.length === 1 && preferences.includes(pref)) {
      setPreferenceHint('請至少保留一項活動偏好，方便為你安排專屬動線。');
      return;
    }
    setPreferenceHint(null);
    onTogglePreference(pref);
  };

  const runItineraryGeneration = async (seedToUse: number) => {
    setIsGenerating(true);
    setProgressStep(0);
    setProgressPercent(22);

    const stageTimer1 = setTimeout(() => {
      setProgressStep(1);
      setProgressPercent(62);
    }, 280);

    const stageTimer2 = setTimeout(() => {
      setProgressStep(2);
      setProgressPercent(90);
    }, 580);

    const minDelay = new Promise((resolve) => setTimeout(resolve, 820));

    let fetchedResult: ItineraryResult | null = null;
    try {
      const fetchPromise = fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood,
          duration,
          preferences,
          variantSeed: seedToUse,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return (await res.json()) as ItineraryResult;
      });

      const [apiData] = await Promise.all([fetchPromise, minDelay]);
      fetchedResult = apiData;
    } catch {
      await minDelay;
      fetchedResult = generateRuleBasedItinerary({
        mood,
        duration,
        preferences,
        variantSeed: seedToUse,
      });
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
    }

    setProgressPercent(100);
    setResult(fetchedResult);
    setIsGenerating(false);

    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleGenerateClick = () => {
    setVariantSeed(0);
    void runItineraryGeneration(0);
  };

  const handleRegenerateAlternative = () => {
    const nextSeed = variantSeed + 1;
    setVariantSeed(nextSeed);
    void runItineraryGeneration(nextSeed);
  };

  const handleResetPlanner = () => {
    setResult(null);
    setVariantSeed(0);
    onResetAll();
    plannerTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const selectedPrefText = preferences.map(getPreferenceLabel).join('、');

  return (
    <section
      id="planner"
      ref={plannerTopRef}
      className="py-16 sm:py-24 border-b border-[#E4DDD0] scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.14em] text-[#5B7062] font-medium mb-3">
              智慧散步路線規劃
            </p>
            <h2
              className="font-editorial text-2xl sm:text-4xl font-semibold text-[#1E3B2E] leading-snug"
              style={{ textWrap: 'balance' }}
            >
              告訴我們你此刻的狀態，三步驟生成糖廠療癒行程
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-[#5B6960] tabular-nums">
            目前設定：{getMoodLabel(mood)} · {duration} 分鐘 · {selectedPrefText}
          </div>
        </div>

        {/* Planner Interactive Steps */}
        <div className="space-y-10">
          {/* Step 1: Mood Selection */}
          <div className="bg-[#F4EFE6]/75 border border-[#E2DACB] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#1E3B2E]">
                  01. 此刻最貼近你的心情
                </h3>
                <p className="text-sm text-[#58685E] mt-1">
                  選擇一種情緒切角，決定這趟散步的語氣與停留重心
                </p>
              </div>
              <span className="text-xs text-[#6B7A70] whitespace-nowrap">
                單選條件
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {MOOD_OPTIONS.map((item) => {
                const isSelected = mood === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onChangeMood(item.key)}
                    aria-pressed={isSelected}
                    className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[126px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E] ${
                      isSelected
                        ? 'bg-[#1E3B2E] text-[#FAF7F2] border-[#1E3B2E] shadow-sm'
                        : 'bg-[#FAF7F2] text-[#1E3B2E] border-[#DFD7C8] hover:border-[#8CA191]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-editorial text-lg font-semibold">
                          {item.label}
                        </span>
                        {isSelected ? (
                          <Check className="w-4 h-4 shrink-0 text-[#D4E2D7]" />
                        ) : null}
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'text-[#DCE6DF]' : 'text-[#59685F]'
                        }`}
                      >
                        {item.shortDesc}
                      </p>
                    </div>
                    <p
                      className={`text-[11px] mt-3 pt-2.5 border-t ${
                        isSelected
                          ? 'border-[#335544] text-[#C2D4C7]'
                          : 'border-[#EDE7DB] text-[#728277]'
                      }`}
                    >
                      {item.editorialCue}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 & Step 3 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step 2: Duration Selection */}
            <div className="lg:col-span-5 bg-[#F4EFE6]/75 border border-[#E2DACB] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-editorial text-xl font-semibold text-[#1E3B2E]">
                      02. 可以留給自己的時間
                    </h3>
                    <p className="text-sm text-[#58685E] mt-1">
                      系統會依停留時間精準配置各站分鐘數
                    </p>
                  </div>
                  <Clock className="w-4 h-4 text-[#64786A] shrink-0" />
                </div>

                <div className="space-y-3">
                  {DURATION_OPTIONS.map((item) => {
                    const isSelected = duration === item.minutes;
                    return (
                      <button
                        key={item.minutes}
                        type="button"
                        onClick={() => onChangeDuration(item.minutes)}
                        aria-pressed={isSelected}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E] ${
                          isSelected
                            ? 'bg-[#1E3B2E] text-[#FAF7F2] border-[#1E3B2E]'
                            : 'bg-[#FAF7F2] text-[#1E3B2E] border-[#DFD7C8] hover:border-[#8CA191]'
                        }`}
                      >
                        <div>
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-editorial text-lg font-semibold tabular-nums">
                              {item.label}
                            </span>
                            <span
                              className={`text-xs ${
                                isSelected ? 'text-[#C6D8CB]' : 'text-[#67796E]'
                              }`}
                            >
                              {item.paceLabel}
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 leading-relaxed ${
                              isSelected ? 'text-[#DCE6DF]' : 'text-[#5A6960]'
                            }`}
                          >
                            {item.summary}
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#FAF7F2] bg-[#FAF7F2] text-[#1E3B2E]'
                              : 'border-[#BEB4A2]'
                          }`}
                        >
                          {isSelected ? <Check className="w-3 h-3" /> : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Activity Preferences */}
            <div className="lg:col-span-7 bg-[#F4EFE6]/75 border border-[#E2DACB] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-editorial text-xl font-semibold text-[#1E3B2E]">
                      03. 偏好的活動體驗（可複選）
                    </h3>
                    <p className="text-sm text-[#58685E] mt-1">
                      挑選你想優先經過的帝國製糖廠風景與停留節奏
                    </p>
                  </div>
                  <Compass className="w-4 h-4 text-[#64786A] shrink-0" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PREFERENCE_OPTIONS.map((item) => {
                    const isSelected = preferences.includes(item.key);
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handlePrefClick(item.key)}
                        aria-pressed={isSelected}
                        className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[118px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E] ${
                          isSelected
                            ? 'bg-[#EAEFE9] text-[#1E3B2E] border-[#5D7B67]'
                            : 'bg-[#FAF7F2] text-[#1E3B2E] border-[#DFD7C8] hover:border-[#8CA191]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-editorial text-lg font-semibold block">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-[#66796D]">
                              {item.spotSummary}
                            </span>
                          </div>

                          <span
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'bg-[#1E3B2E] border-[#1E3B2E] text-[#FAF7F2]'
                                : 'border-[#C5BBA8] bg-white'
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                          </span>
                        </div>

                        <p className="text-xs text-[#4F5E55] leading-relaxed mt-3">
                          {item.shortDesc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {preferenceHint ? (
                  <p
                    role="status"
                    className="mt-3 text-xs font-medium text-[#7B4B2A]"
                  >
                    {preferenceHint}
                  </p>
                ) : null}
              </div>

              {/* Primary Generation CTA Row */}
              <div className="mt-7 pt-6 border-t border-[#E0D7C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-[#4F5E55]">
                  已選條件將產生專屬路線名稱、推薦原因與分段建議時間
                </div>

                <button
                  type="button"
                  onClick={handleGenerateClick}
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-medium bg-[#1E3B2E] text-[#FAF7F2] rounded-lg hover:bg-[#14291F] transition-colors cursor-pointer disabled:opacity-70 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isGenerating ? '正在編排糖廠路線...' : '生成我的療癒行程'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Animated Generation Progress Indicator */}
          <AnimatePresence>
            {isGenerating ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                role="status"
                aria-live="polite"
                className="bg-[#FAF7F2] border border-[#D4CBB9] rounded-2xl p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <p className="font-editorial text-lg font-medium text-[#1E3B2E]">
                    {PROGRESS_STAGES[progressStep]}
                  </p>
                  <span className="text-xs font-medium text-[#5B7062] tabular-nums">
                    {progressPercent}%
                  </span>
                </div>

                <div className="w-full h-2 bg-[#EAE3D5] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#1E3B2E]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Result Area */}
          <div ref={resultRef} className="scroll-mt-20">
            <AnimatePresence mode="wait">
              {result && !isGenerating ? (
                <ItineraryResultCard
                  key={result.id}
                  result={result}
                  onRegenerateAlternative={handleRegenerateAlternative}
                  onResetPlanner={handleResetPlanner}
                  isGenerating={isGenerating}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
