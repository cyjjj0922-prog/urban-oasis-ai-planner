import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import {
  type ActivityPreferenceKey,
  type ItineraryRequest,
  type ItineraryResult,
  getMoodLabel,
  getPreferenceLabel,
} from '../src/shared/itineraryTypes.ts';
import { generateRuleBasedItinerary } from '../src/shared/ruleEngine.ts';

function formatMinuteRange(start: number, end: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(start)}–${pad(end)} 分鐘`;
}

function normalizeStepDurations(
  steps: Array<{
    title: string;
    spotName: string;
    suggestedMinutes: number;
    description: string;
    sensoryTip: string;
    category: ActivityPreferenceKey;
  }>,
  totalMinutes: number
) {
  if (steps.length === 0) return [];
  const rawSum = steps.reduce(
    (acc, s) => acc + Math.max(5, Math.round(s.suggestedMinutes || 15)),
    0
  );
  const scale = totalMinutes / rawSum;
  const adjusted = steps.map((s) =>
    Math.max(5, Math.round((s.suggestedMinutes || 15) * scale))
  );

  // Adjust final step so sum matches totalMinutes exactly
  const currentSum = adjusted.reduce((a, b) => a + b, 0);
  const diff = totalMinutes - currentSum;
  adjusted[adjusted.length - 1] = Math.max(
    5,
    adjusted[adjusted.length - 1] + diff
  );

  let cursor = 0;
  return steps.map((step, idx) => {
    const mins = adjusted[idx];
    const start = cursor;
    const end = cursor + mins;
    cursor = end;
    return {
      order: idx + 1,
      title: step.title,
      spotName: step.spotName,
      suggestedMinutes: mins,
      timeRangeLabel: formatMinuteRange(start, end),
      description: step.description,
      sensoryTip: step.sensoryTip,
      category: step.category,
    };
  });
}

export async function generateItinerary(
  request: ItineraryRequest
): Promise<ItineraryResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // Always fall back seamlessly to rule-based engine when no API key is configured
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return generateRuleBasedItinerary(request);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const moodLabel = getMoodLabel(request.mood);
    const prefLabels = request.preferences.map(getPreferenceLabel).join('、');
    const stepCountHint =
      request.duration === 30 ? '2' : request.duration === 60 ? '3' : '3 到 4';

    const prompt = `請為造訪「帝國製糖廠臺中營業所」與周邊「湧泉公園・星泉湖」的旅人，規劃一份總時長剛好 ${request.duration} 分鐘的個人化慢活療癒散步行程。

使用者條件：
- 目前心情：${moodLabel}
- 預計停留總時間：${request.duration} 分鐘
- 活動偏好：${prefLabels}
- 變化提案序號：${request.variantSeed ?? 0}（請以此微調路線切入點與敘事角度）

場域真實資訊（僅可使用以下真實存在或合理對應的場域空間）：
1. 湧泉公園・星泉湖景觀木棧道（垂柳、水岸草坡、生態湖景）
2. 湧泉公園・老樹草坪與遮蔭休憩區
3. 帝國製糖廠臺中營業所・歷史建築本體（1935年日治時期建築、木桁架、紅磚與洗石子迴廊、「冶糖」文化展區）
4. 館內食藝茶歇空間（1935 窗景咖啡與茶點歇息區）

嚴格規範：
- 全程使用優雅、自然、富有畫面感的繁體中文（高級文青旅遊誌風格，不要使用任何表情符號）。
- 結合核心精神「放慢步調，糖廠剛好」與「都市綠洲 Urban Oasis Film Festival」企劃概念，但絕不可將「都市綠洲影展」描述成已經正式舉辦、售票或正在上映的真實活動（若提及，僅能作為「慢活影展企劃靈感」或「城市喘息概念」）。
- 安排 ${stepCountHint} 個活動步驟，各步驟 suggestedMinutes 加總必須等於 ${request.duration} 分鐘。
- category 僅能從以下四個值中選擇：lakeside_walk、heritage_architecture、photo_spots、cafe_rest。`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction:
          '你是一位熟悉臺中文化地景與慢活旅遊策展的文字編輯，擅長以溫潤精煉的繁體中文為都市年輕人設計舒緩身心的短途散步提案。回覆必須嚴格遵守 JSON 格式且不包含任何 emoji。',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itineraryName: {
              type: Type.STRING,
              description: '富有詩意與文青質感的行程名稱（10至18字）',
            },
            rationale: {
              type: Type.STRING,
              description: '根據使用者心情、時間與偏好說明為何推薦此路線（55至95字）',
            },
            closingNote: {
              type: Type.STRING,
              description: '行程結束前的溫柔收尾提醒（35至60字）',
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: '該站活動標題',
                  },
                  spotName: {
                    type: Type.STRING,
                    description: '帝國製糖廠或星泉湖對應空間名稱',
                  },
                  suggestedMinutes: {
                    type: Type.INTEGER,
                    description: '建議停留分鐘數',
                  },
                  description: {
                    type: Type.STRING,
                    description: '具體的體驗與散步引導（50至85字）',
                  },
                  sensoryTip: {
                    type: Type.STRING,
                    description: '一個細膩的感官觀察或取景小提示（20至40字）',
                  },
                  category: {
                    type: Type.STRING,
                    description:
                      '必須是 lakeside_walk, heritage_architecture, photo_spots, cafe_rest 之一',
                  },
                },
                required: [
                  'title',
                  'spotName',
                  'suggestedMinutes',
                  'description',
                  'sensoryTip',
                  'category',
                ],
              },
            },
          },
          required: ['itineraryName', 'rationale', 'closingNote', 'steps'],
        },
      },
    });

    const rawText = response.text?.trim();
    if (!rawText) {
      return generateRuleBasedItinerary(request);
    }

    const parsed = JSON.parse(rawText) as {
      itineraryName?: string;
      rationale?: string;
      closingNote?: string;
      steps?: Array<{
        title?: string;
        spotName?: string;
        suggestedMinutes?: number;
        description?: string;
        sensoryTip?: string;
        category?: string;
      }>;
    };

    if (!parsed.steps || !Array.isArray(parsed.steps) || parsed.steps.length === 0) {
      return generateRuleBasedItinerary(request);
    }

    const validCategories = new Set<ActivityPreferenceKey>([
      'lakeside_walk',
      'heritage_architecture',
      'photo_spots',
      'cafe_rest',
    ]);

    const cleanedSteps = parsed.steps.map((step) => ({
      title: step.title?.trim() || '糖廠慢行片刻',
      spotName: step.spotName?.trim() || '帝國製糖廠臺中營業所',
      suggestedMinutes: Number(step.suggestedMinutes) || 15,
      description:
        step.description?.trim() ||
        '放慢腳步感受周圍的自然光線與老建築空間氛圍。',
      sensoryTip:
        step.sensoryTip?.trim() || '試著將注意力停留在風聲與光影變化上。',
      category: validCategories.has(step.category as ActivityPreferenceKey)
        ? (step.category as ActivityPreferenceKey)
        : request.preferences[0] ?? 'lakeside_walk',
    }));

    const normalizedSteps = normalizeStepDurations(
      cleanedSteps,
      request.duration
    );

    return {
      id: `oasis-gemini-${request.mood}-${request.duration}-${Date.now()}`,
      itineraryName: parsed.itineraryName?.trim() || '糖廠剛好的慢活散步',
      moodLabel,
      totalMinutes: request.duration,
      rationale:
        parsed.rationale?.trim() ||
        '為你量身編排帝國製糖廠臺中營業所與星泉湖畔的緩慢路徑。',
      closingNote:
        parsed.closingNote?.trim() ||
        '放慢步調，糖廠剛好。帶著這份鬆弛感繼續接下來的日常。',
      steps: normalizedSteps,
      source: 'gemini',
      variantIndex: request.variantSeed ?? 0,
    };
  } catch (error) {
    console.warn('Gemini itinerary fallback triggered:', error);
    return generateRuleBasedItinerary(request);
  }
}
