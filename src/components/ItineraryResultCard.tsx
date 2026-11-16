import { useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  MapPin,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  type ItineraryResult,
  getPreferenceLabel,
} from '../shared/itineraryTypes.ts';

interface ItineraryResultCardProps {
  result: ItineraryResult;
  onRegenerateAlternative: () => void;
  onResetPlanner: () => void;
  isGenerating: boolean;
}

export function ItineraryResultCard({
  result,
  onRegenerateAlternative,
  onResetPlanner,
  isGenerating,
}: ItineraryResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [completedOrders, setCompletedOrders] = useState<number[]>([]);

  const toggleStepCompleted = (order: number) => {
    setCompletedOrders((prev) =>
      prev.includes(order)
        ? prev.filter((item) => item !== order)
        : [...prev, order]
    );
  };

  const handleCopyItinerary = async () => {
    const lines = [
      `【都市綠洲 AI 療癒行程規劃器】${result.itineraryName}`,
      `核心標語：放慢步調，糖廠剛好`,
      `心情處方：${result.moodLabel}｜總停留時間：${result.totalMinutes} 分鐘`,
      '',
      `推薦原因：`,
      result.rationale,
      '',
      `散步順序與建議時間：`,
      ...result.steps.map(
        (step) =>
          `${String(step.order).padStart(2, '0')}. [${step.timeRangeLabel} · ${step.suggestedMinutes} 分鐘] ${step.spotName} — ${step.title}\n   ${step.description}\n   感官提醒：${step.sensoryTip}`
      ),
      '',
      `收尾筆記：${result.closingNote}`,
      `場域地點：帝國製糖廠臺中營業所（臺中市東區樂業路30號）`,
    ];

    const formatted = lines.join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = formatted;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const completedCount = completedOrders.length;
  const totalSteps = result.steps.length;
  const walkProgress =
    totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <motion.div
      key={result.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF7F2] border border-[#D8CFBE] rounded-2xl p-6 sm:p-10"
    >
      {/* Top unboxed metadata row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6DFD1]">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#58685E] tabular-nums">
          <span>心情處方：{result.moodLabel}</span>
          <span aria-hidden="true">·</span>
          <span>總長 {result.totalMinutes} 分鐘</span>
          <span aria-hidden="true">·</span>
          <span>{totalSteps} 個停留節點</span>
          <span aria-hidden="true">·</span>
          <span>
            {result.source === 'gemini' ? '智慧策展生成' : '規則式慢活演算'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onRegenerateAlternative}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-[#1E3B2E] bg-[#EFEAE0] hover:bg-[#E5DDD0] rounded-lg transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`}
            />
            <span>換個提案路線</span>
          </button>

          <button
            type="button"
            onClick={handleCopyItinerary}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium bg-[#1E3B2E] text-[#FAF7F2] hover:bg-[#14291F] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>已複製行程</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>複製行程</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Itinerary Title & Recommendation Rationale */}
      <div className="py-7 border-b border-[#E6DFD1]">
        <p className="text-xs tracking-[0.12em] text-[#64756A] font-medium mb-2">
          為你編排的糖廠路線
        </p>
        <h3
          className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1E3B2E] leading-snug mb-5"
          style={{ textWrap: 'balance' }}
        >
          {result.itineraryName}
        </h3>

        <div className="bg-[#F3EFE6] border border-[#E2DACB] rounded-xl p-5 sm:p-6">
          <p className="text-xs tracking-[0.1em] text-[#5B7062] font-medium mb-2">
            推薦原因
          </p>
          <p className="text-sm sm:text-base text-[#2F3D35] leading-[1.85]">
            {result.rationale}
          </p>
        </div>
      </div>

      {/* Walk check-off progress */}
      <div className="py-5 border-b border-[#E6DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-[#4F5E55]">
          <span className="font-medium text-[#1E3B2E]">散步進度紀錄</span>
          <span className="tabular-nums text-[#67766C]">
            已完成 {completedCount} / {totalSteps} 站（點選站點可標記完成）
          </span>
        </div>
        <div className="w-full sm:w-48 h-1.5 bg-[#E6DFD1] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1E3B2E] transition-all duration-300 ease-out"
            style={{ width: `${walkProgress}%` }}
          />
        </div>
      </div>

      {/* Ordered Activity Sequence */}
      <ol className="divide-y divide-[#E6DFD1]">
        {result.steps.map((step, index) => {
          const isCompleted = completedOrders.includes(step.order);
          return (
            <motion.li
              key={`${result.id}-${step.order}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-7 first:pt-8 last:pb-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                {/* Left Time & Order Column */}
                <div className="md:w-52 shrink-0 flex items-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => toggleStepCompleted(step.order)}
                    aria-pressed={isCompleted}
                    aria-label={`標記第 ${step.order} 站 ${step.spotName} ${
                      isCompleted ? '尚未完成' : '已完成'
                    }`}
                    className={`mt-0.5 w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium tabular-nums transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E] ${
                      isCompleted
                        ? 'bg-[#1E3B2E] text-[#FAF7F2]'
                        : 'bg-[#EFEAE0] text-[#1E3B2E] border border-[#D4CBB9] hover:border-[#1E3B2E]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      String(step.order).padStart(2, '0')
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3B2E] tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#667B6C]" />
                      <span>{step.timeRangeLabel}</span>
                    </div>
                    <p className="text-xs text-[#66756C] tabular-nums">
                      建議停留 {step.suggestedMinutes} 分鐘 ·{' '}
                      {getPreferenceLabel(step.category)}
                    </p>
                  </div>
                </div>

                {/* Right Activity Narrative Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#5E7265] font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.spotName}</span>
                  </div>

                  <h4
                    className={`font-editorial text-lg sm:text-xl font-semibold mb-2.5 transition-colors ${
                      isCompleted
                        ? 'text-[#6A7970] line-through decoration-[#9AA89E]'
                        : 'text-[#1E3B2E]'
                    }`}
                  >
                    {step.title}
                  </h4>

                  <p className="text-sm sm:text-[15px] text-[#425048] leading-[1.85] mb-3.5 max-w-2xl">
                    {step.description}
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#5E6D64] bg-[#F4EFE6] border border-[#E6DFD1] rounded-lg px-4 py-2.5 inline-block">
                    感官筆記：{step.sensoryTip}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* Bottom Closing Note & Reset Bar */}
      <div className="pt-7 border-t border-[#E6DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <p className="text-sm text-[#54645B] leading-relaxed max-w-xl">
          {result.closingNote}
        </p>

        <button
          type="button"
          onClick={onResetPlanner}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-[#2E3D34] border border-[#CFC6B5] hover:border-[#1E3B2E] hover:text-[#1E3B2E] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>重新規劃條件</span>
        </button>
      </div>
    </motion.div>
  );
}
