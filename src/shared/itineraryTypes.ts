export type MoodKey =
  | 'stressed'
  | 'spacing_out'
  | 'photography'
  | 'dating'
  | 'culture';

export type DurationMinutes = 30 | 60 | 120;

export type ActivityPreferenceKey =
  | 'lakeside_walk'
  | 'heritage_architecture'
  | 'photo_spots'
  | 'cafe_rest';

export interface ItineraryRequest {
  mood: MoodKey;
  duration: DurationMinutes;
  preferences: ActivityPreferenceKey[];
  variantSeed?: number;
}

export interface ItineraryStep {
  order: number;
  title: string;
  spotName: string;
  suggestedMinutes: number;
  timeRangeLabel: string;
  description: string;
  sensoryTip: string;
  category: ActivityPreferenceKey;
}

export interface ItineraryResult {
  id: string;
  itineraryName: string;
  moodLabel: string;
  totalMinutes: DurationMinutes;
  rationale: string;
  closingNote: string;
  steps: ItineraryStep[];
  source: 'gemini' | 'rule-engine';
  variantIndex: number;
}

export interface MoodDefinition {
  key: MoodKey;
  label: string;
  shortDesc: string;
  editorialCue: string;
}

export interface PreferenceDefinition {
  key: ActivityPreferenceKey;
  label: string;
  shortDesc: string;
  spotSummary: string;
}

export const MOOD_OPTIONS: readonly MoodDefinition[] = [
  {
    key: 'stressed',
    label: '壓力大',
    shortDesc: '想把緊繃的節奏暫時交給湖風與樹影',
    editorialCue: '減壓舒緩 · 放慢呼吸頻率',
  },
  {
    key: 'spacing_out',
    label: '想放空',
    shortDesc: '什麼都不特別安排，只想對著水面靜靜發呆',
    editorialCue: '留白發呆 · 感官暫時離線',
  },
  {
    key: 'photography',
    label: '想拍照',
    shortDesc: '捕捉 1935 年紅磚木構與湖面倒影的日光層次',
    editorialCue: '光影採集 · 紀錄老建築詩意',
  },
  {
    key: 'dating',
    label: '想約會',
    shortDesc: '找一個步調溫柔、適合並肩散步聊天的角落',
    editorialCue: '雙人慢行 · 共享午後微光',
  },
  {
    key: 'culture',
    label: '探索文化',
    shortDesc: '走讀臺中製糖產業記憶與歷史建築修復紋理',
    editorialCue: '歷史漫讀 · 觸摸時代肌理',
  },
] as const;

export const DURATION_OPTIONS: readonly {
  minutes: DurationMinutes;
  label: string;
  paceLabel: string;
  summary: string;
}[] = [
  {
    minutes: 30,
    label: '30 分鐘',
    paceLabel: '輕量喘息',
    summary: '午休或下班後的短暫抽離，兩站精準降噪',
  },
  {
    minutes: 60,
    label: '60 分鐘',
    paceLabel: '剛好慢行',
    summary: '環湖、觀展與靜坐取得平衡的標準綠洲節奏',
  },
  {
    minutes: 120,
    label: '120 分鐘',
    paceLabel: '深度漫遊',
    summary: '從歷史本體到茶歇慢食，完整浸泡一個午後',
  },
] as const;

export const PREFERENCE_OPTIONS: readonly PreferenceDefinition[] = [
  {
    key: 'lakeside_walk',
    label: '湖畔散步',
    shortDesc: '星泉湖木棧道、垂柳水岸與草坡微風',
    spotSummary: '星泉湖景觀步道',
  },
  {
    key: 'heritage_architecture',
    label: '歷史建築',
    shortDesc: '1935 年帝國製糖廠本體、木桁架與展演空間',
    spotSummary: '臺中營業所本館',
  },
  {
    key: 'photo_spots',
    label: '拍照打卡',
    shortDesc: '紅磚迴廊斜影、水岸倒影與舊廠牌匾構圖',
    spotSummary: '光影取景角落',
  },
  {
    key: 'cafe_rest',
    label: '休息用餐',
    shortDesc: '老屋窗景咖啡席、茶點慢食與室內冷氣歇腳',
    spotSummary: '館內食藝茶歇空間',
  },
] as const;

export function getMoodLabel(key: MoodKey): string {
  return MOOD_OPTIONS.find((item) => item.key === key)?.label ?? '想放空';
}

export function getPreferenceLabel(key: ActivityPreferenceKey): string {
  return PREFERENCE_OPTIONS.find((item) => item.key === key)?.label ?? '湖畔散步';
}
