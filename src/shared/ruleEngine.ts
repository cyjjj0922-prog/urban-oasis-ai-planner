import {
  type ActivityPreferenceKey,
  type DurationMinutes,
  type ItineraryRequest,
  type ItineraryResult,
  type ItineraryStep,
  type MoodKey,
  getMoodLabel,
  getPreferenceLabel,
} from './itineraryTypes.ts';

interface SpotTemplate {
  category: ActivityPreferenceKey;
  spotName: string;
  titlesByMood: Record<MoodKey, string>;
  descriptionsByMood: Record<MoodKey, string>;
  sensoryTips: string[];
  weight: number;
}

const SPOT_LIBRARY: readonly SpotTemplate[] = [
  {
    category: 'lakeside_walk',
    spotName: '湧泉公園 · 星泉湖景觀木棧道',
    titlesByMood: {
      stressed: '沿著星泉湖岸線，交出今天第一口深呼吸',
      spacing_out: '木棧道慢行：讓目光停在隨風起皺的水面',
      photography: '湖畔低角度取景：捕捉垂柳與糖廠的對稱倒影',
      dating: '並肩走過水岸弧線，把城市的喧鬧留在身後',
      culture: '走讀湧泉公園地景：從舊糖廠水池到當代生態湖泊',
    },
    descriptionsByMood: {
      stressed:
        '從湧泉公園南側入口緩步走上木棧道，將手機轉為靜音。觀察水面波紋與風吹過蘆葦的沙沙聲，讓視線從近距離螢幕切換到開闊的湖景遠方。',
      spacing_out:
        '不需要設定目的地，沿著星泉湖弧形木棧道以最慢的步速漫步。遇到陽光柔和的長椅就坐下來幾分鐘，單純聽風與偶爾掠過水面的水鳥聲。',
      photography:
        '站在湖岸東南角木棧道轉折處，將1935年歷史建築與前景綠意同時框入畫面。午後微斜的自然光能讓磚牆質感與湖面反光呈現柔和層次。',
      dating:
        '星泉湖畔開闊卻不顯擁擠，適合兩人保持舒適距離並肩散步。沿路聊著彼此最近看過的一部電影，或是單純享受一段不需要急著找話題的安靜。',
      culture:
        '這座緊鄰糖廠的生態湖泊承接了過去工業區地景的演變。漫步同時可留意園區導覽立牌，想像昔日甘蔗運輸與周邊都市水文如何轉換成今日的市民公園。',
    },
    sensoryTips: [
      '試著在棧道轉角停下十秒，感受風從湖面吹來的濕潤涼意。',
      '若遇見水岸草坡光影正好，不妨放慢腳步讓視線停留久一點。',
    ],
    weight: 1.2,
  },
  {
    category: 'lakeside_walk',
    spotName: '湧泉公園 · 雙木涼亭與老樹草坪',
    titlesByMood: {
      stressed: '老樹蔭下草坡停駐：把思緒放回地面',
      spacing_out: '樹影遮陽發呆席：不滑手機的空白時光',
      photography: '樹葉縫隙的散射光：拍攝自然人像與靜物',
      dating: '樹蔭下的半小時慢聊與並坐',
      culture: '從製糖工業遺構遠眺舊城區天際線',
    },
    descriptionsByMood: {
      stressed:
        '繞至星泉湖另一側的緩坡草地與遮蔭處，讓雙腳離開硬質柏油路面。在綠意包圍下做三次緩慢的腹式呼吸，把待辦清單暫時留給離開園區之後。',
      spacing_out:
        '挑一處靠近水岸大樹下的木椅或草坡邊緣坐下，什麼都不必讀、不必紀錄，就只是看著雲影緩慢移動過臺中東區的天際線。',
      photography:
        '利用樹枝與葉片形成的自然框景，遠拍帝國製糖廠本館的屋瓦輪廓，適合拍攝帶有膠片感與生活氣息的留白構圖。',
      dating:
        '找一處視野能望見湖心與老建築的樹蔭角落歇腳，分享各自帶來的冷泡茶或飲品，把日常瑣事說成輕鬆的午後對話。',
      culture:
        '站在公園高處草坡回望糖廠建築量體，能清楚理解這座 1935 年建築當年如何作為產業核心，如今又如何與現代臺中車站生活圈共存。',
    },
    sensoryTips: [
      '抬頭看看老樹枝椏間篩落的陽光，視覺疲勞會在綠色調裡慢慢退去。',
      '這段草坡幾乎沒有急促車流聲，適合短暫閉目聆聽環境白噪音。',
    ],
    weight: 0.95,
  },
  {
    category: 'heritage_architecture',
    spotName: '帝國製糖廠臺中營業所 · 歷史建築本體',
    titlesByMood: {
      stressed: '走進 1935 年老建築涼廊，讓時光替你降溫',
      spacing_out: '木桁架下的靜謐慢遊：跟隨老屋的陰影移動',
      photography: '紅磚、洗石子與木格窗的幾何光線追逐',
      dating: '在復古建築迴廊裡，交換彼此偏愛的空間細節',
      culture: '走讀帝國製糖廠臺中營業所：產業記憶與修復建築',
    },
    descriptionsByMood: {
      stressed:
        '步入修復後的帝國製糖廠臺中營業所，室內挑高木構屋架與厚實磚牆自然隔絕了外界燥熱。沿著展區緩慢移動，讓安靜有序的空間節奏安撫緊繃神經。',
      spacing_out:
        '不需逐字研讀所有文字，單純感受老建築裡的木頭氣味、地板回音與窗外透進的綠意，像走進一部節奏緩慢的膠片電影場景。',
      photography:
        '重點留意入口牌匾、窗框投射在地面上的格子光影，以及深色木樑與紅磚交接處的材質對比，無論直拍或橫幅都很有文青畫報質感。',
      dating:
        '一起在館內外迴廊散步，聊一聊各自喜歡老屋裡的哪扇窗或哪個角落；歷史空間自帶溫潤的對話氣氛，讓相處變得格外從容。',
      culture:
        '細看營業所興建於 1935 年的建築格局、結構修復痕跡與館內「冶糖」主題常設展陳，認識臺中糖業歷史與這座市定歷史建築的重生脈絡。',
    },
    sensoryTips: [
      '留意屋頂木桁架結構與窗框外湖景的遠近呼應，是營業所最迷人的視角。',
      '進入室內展區請放輕腳步與音量，讓老屋保留圖書館般的安靜質地。',
    ],
    weight: 1.15,
  },
  {
    category: 'photo_spots',
    spotName: '營業所紅磚迴廊與水岸窗景轉角',
    titlesByMood: {
      stressed: '用快門替情緒留下一張安靜的明信片',
      spacing_out: '不追求完美構圖，只拍下此刻順眼的微光',
      photography: '糖廠黃金取景路線：門面牌匾、窗影與水岸反光',
      dating: '為彼此拍下幾張不經意回頭的膠片感側寫',
      culture: '影像紀錄老建築細節：銘牌、磚砌紋理與窗格比例',
    },
    descriptionsByMood: {
      stressed:
        '有意識地把注意力放到尋找畫面裡：一道斜照在紅磚上的光、一片貼近木窗的綠葉。專注取景的十幾分鐘，本身就是很好的正念練習。',
      spacing_out:
        '沿著建築外圍迴廊隨意走拍，只按下幾次快門就好；重點是透過觀景窗重新發現平時匆忙路過卻沒注意到的光線細節。',
      photography:
        '依序拍下建築正面大景、長廊延伸線條、以及面向星泉湖一側的窗台倒影。建議採用低飽和、偏暖綠調的濾鏡或直接以自然光直出。',
      dating:
        '利用長廊縱深與窗框前景互相幫對方拍下自然站姿照，不需刻意擺拍，漫步途中回頭的一瞬往往最貼近都市綠洲的鬆弛感。',
      culture:
        '聚焦建築保存的物質證據——包括日治時期風格的對稱開窗、洗石子柱面與修復後保留的老磚面，建立屬於自己的城市走讀影像筆記。',
    },
    sensoryTips: [
      '下午三點半至五點之間的側逆光最能襯托出紅磚與綠植的立體感。',
      '拍完照記得把手機收起來，用眼睛再看一次剛才框住的風景。',
    ],
    weight: 1.0,
  },
  {
    category: 'cafe_rest',
    spotName: '館內食藝空間 · 1935 窗景茶歇席',
    titlesByMood: {
      stressed: '點一杯溫熱茶飲或手沖咖啡，讓神經徹底著陸',
      spacing_out: '靠窗座位發呆補給：看湖景配一口慢食甜點',
      photography: '窗邊自然光靜物擺拍與老屋質感紀錄',
      dating: '共享一份茶點，為這次約會留下甜而不膩的餘韻',
      culture: '在歷史場域裡品味結合在地風土的當代飲食提案',
    },
    descriptionsByMood: {
      stressed:
        '選一個靠近木窗的位置坐下，點一杯無咖啡因草本茶或溫順拿鐵。看著窗外微風吹動湖面與垂柳，給自己一段不被任何訊息催促的喘息時間。',
      spacing_out:
        '點一杯喜歡的飲品放著慢慢喝，讓身體靠在木椅上完全放鬆。這段時光沒有產出壓力，唯一的工作就是把一杯飲料喝完。',
      photography:
        '利用窗邊灑落的柔和側光，將陶瓷杯盤、木質桌面與窗外模糊的湖岸綠意構成一張靜謐的生活切片照片。',
      dating:
        '各自點一杯飲品並分享一份小點心，在溫潤的木質空間裡聊聊接下來的週末計畫，或是回味「都市綠洲」企劃裡想一起看的慢活電影清單。',
      culture:
        '坐在百年製糖脈絡的空間裡歇息，感受歷史建築轉化為當代生活場域後的日常溫度——文化保存不只是展覽，更是能走進來坐下喝杯茶的現場。',
    },
    sensoryTips: [
      '優先選擇面向星泉湖一側的窗邊席位，光線柔和且視野最開闊。',
      '飲品上桌後先聞一聞香氣再喝第一口，能有效幫助身體切換到休息模式。',
    ],
    weight: 1.1,
  },
];

const TITLES_BY_MOOD_AND_DURATION: Record<
  MoodKey,
  Record<DurationMinutes, string[]>
> = {
  stressed: {
    30: ['半小時湖風降噪處方', '星泉湖畔的緊急深呼吸路線'],
    60: ['卸下緊繃：60 分鐘糖廠減壓散步', '給過載腦袋的木棧道與老屋處方'],
    120: ['城市離線計畫：兩小時糖廠深度療癒', '把節奏還給湖面的慢活午後'],
  },
  spacing_out: {
    30: ['三十分鐘無目的水岸發呆', '剛剛好的白日留白路線'],
    60: ['放空剛剛好：星泉湖畔與老屋靜坐', '一小時感官休眠慢行提案'],
    120: ['無所事事的黃金兩小時', '雲影與茶香：糖廠全日留白散步'],
  },
  photography: {
    30: ['三十分鐘紅磚與湖影速寫', '輕巧取景：糖廠晨昏光影短巡'],
    60: ['1935 膠片感散步：糖廠光影採集路線', '紅磚、木窗與星泉湖的取景散步'],
    120: ['慢門兩小時：帝國糖廠建築與水岸攝影行', '把午後光線裝進記憶卡的漫遊路線'],
  },
  dating: {
    30: ['微風剛剛好的三十分鐘雙人散步', '下班後的糖廠黃昏小約會'],
    60: ['並肩慢行：一小時星泉湖畔約會提案', '老屋迴廊與湖風裡的溫柔對話'],
    120: ['兩小時慢約會：從湖畔散步到窗景茶歇', '把時間浪費在彼此身上的糖廠午後'],
  },
  culture: {
    30: ['三十分鐘快速走讀：1935 營業所建築縮影', '百年糖業地景的輕量導覽散步'],
    60: ['一小時臺中糖業走讀與水岸巡禮', '從工業遺構到城市綠洲的時光散步'],
    120: ['兩小時深度文化漫遊：帝國糖廠的前世與當代日常', '歷史紋理、生態水岸與老屋茶席全體驗'],
  },
};

const RATIONALES_BY_MOOD: Record<MoodKey, string> = {
  stressed:
    '當日常節奏過於緊繃時，你需要的是「開闊視野」與「低刺激環境」。這份路線優先把你帶離車流與螢幕，透過星泉湖的水平線與 1935 年歷史建築的沉穩空間感，幫身體自然降速。',
  spacing_out:
    '放空不需要複雜的打卡清單。我們刻意減少移動跨度，把時間留給湖畔長椅、樹影草坡與微風，讓你在不需思考下一步的狀態裡獲得真正休息。',
  photography:
    '帝國製糖廠臺中營業所最迷人的地方在於「新舊材質並陳」與「水岸反光」。這條路線依照光線與景深順序編排，讓你從開闊遠景拍到建築幾何與室內靜物。',
  dating:
    '好的約會空間需要剛剛好的留白與自然開啟話題的景致。透過平坦好走的湖畔木棧道、自帶故事感的老屋迴廊，加上能安靜對話的窗邊歇腳點，讓相處自在而不費力。',
  culture:
    '與其走馬看花，不如順著地景脈絡走讀：從湧泉公園水文變化切入，走進 1935 年興建的帝國製糖廠臺中營業所本體，最後在歷史空間裡坐下感受老屋重生的當代溫度。',
};

const CLOSING_NOTES: readonly string[] = [
  '都市綠洲（Urban Oasis Film Festival 企劃概念）提醒你：放慢步調，糖廠剛好。離開園區前，別急著打開工作訊息，讓湖風的餘韻多陪你走一段路。',
  '不需要遠行到深山，臺中市區裡的這片水岸與老建築，就足以容納一次短暫的身心重置。願這趟散步為你存下足夠的平靜。',
];

function allocateDurations(
  totalMinutes: DurationMinutes,
  count: number
): number[] {
  if (totalMinutes === 30) {
    return count === 2 ? [15, 15] : [10, 10, 10];
  }
  if (totalMinutes === 60) {
    if (count === 2) return [30, 30];
    if (count === 3) return [20, 20, 20];
    return [15, 15, 15, 15];
  }
  // 120 minutes
  if (count === 2) return [55, 65];
  if (count === 3) return [35, 45, 40];
  return [25, 30, 25, 40];
}

function formatMinuteRange(start: number, end: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(start)}–${pad(end)} 分鐘`;
}

export function generateRuleBasedItinerary(
  request: ItineraryRequest
): ItineraryResult {
  const mood = request.mood;
  const totalMinutes = request.duration;
  const preferences: ActivityPreferenceKey[] =
    request.preferences.length > 0 ? request.preferences : ['lakeside_walk'];
  const variantSeed = request.variantSeed ?? 0;

  const targetStepCount =
    totalMinutes === 30 ? 2 : totalMinutes === 60 ? 3 : Math.min(4, Math.max(3, preferences.length));

  // Build candidate pool prioritizing user-selected preferences
  const preferredPool = SPOT_LIBRARY.filter((spot) =>
    preferences.includes(spot.category)
  );
  const fallbackPool = SPOT_LIBRARY.filter(
    (spot) => !preferences.includes(spot.category)
  );

  // Deterministic rotation based on variantSeed so "換個提案" produces genuinely varied routes
  const rotatedPreferred = [...preferredPool];
  if (rotatedPreferred.length > 1 && variantSeed > 0) {
    const shift = variantSeed % rotatedPreferred.length;
    rotatedPreferred.push(...rotatedPreferred.splice(0, shift));
  }

  const orderedPool = [...rotatedPreferred, ...fallbackPool];

  // Pick unique spots up to targetStepCount
  const chosenTemplates: SpotTemplate[] = [];
  const usedSpotNames = new Set<string>();

  for (const spot of orderedPool) {
    if (chosenTemplates.length >= targetStepCount) break;
    if (!usedSpotNames.has(spot.spotName)) {
      chosenTemplates.push(spot);
      usedSpotNames.add(spot.spotName);
    }
  }

  // Natural geographical flow: if cafe_rest is included, place it near the end
  chosenTemplates.sort((a, b) => {
    if (a.category === 'cafe_rest' && b.category !== 'cafe_rest') return 1;
    if (a.category !== 'cafe_rest' && b.category === 'cafe_rest') return -1;
    return 0;
  });

  const durations = allocateDurations(totalMinutes, chosenTemplates.length);
  let cursor = 0;

  const steps: ItineraryStep[] = chosenTemplates.map((template, idx) => {
    const mins = durations[idx] ?? 20;
    const start = cursor;
    const end = cursor + mins;
    cursor = end;

    return {
      order: idx + 1,
      title: template.titlesByMood[mood],
      spotName: template.spotName,
      suggestedMinutes: mins,
      timeRangeLabel: formatMinuteRange(start, end),
      description: template.descriptionsByMood[mood],
      sensoryTip:
        template.sensoryTips[(idx + variantSeed) % template.sensoryTips.length],
      category: template.category,
    };
  });

  const titles = TITLES_BY_MOOD_AND_DURATION[mood][totalMinutes];
  const itineraryName = titles[variantSeed % titles.length];

  const prefText = preferences.map(getPreferenceLabel).join('、');
  const rationale = `${RATIONALES_BY_MOOD[mood]}（已依據你偏好的「${prefText}」調整節奏配置）`;

  return {
    id: `oasis-${mood}-${totalMinutes}-${variantSeed}-${Date.now()}`,
    itineraryName,
    moodLabel: getMoodLabel(mood),
    totalMinutes,
    rationale,
    closingNote: CLOSING_NOTES[variantSeed % CLOSING_NOTES.length],
    steps,
    source: 'rule-engine',
    variantIndex: variantSeed,
  };
}
