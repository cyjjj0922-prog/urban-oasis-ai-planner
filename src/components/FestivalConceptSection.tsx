const WALKING_TIPS = [
  {
    index: '01',
    title: '推薦造訪光影時段',
    detail:
      '平日 15:30 至 17:30 之間陽光斜照星泉湖面，紅磚與綠樹的陰影對比最柔和，氣溫也適合沿木棧道慢走。',
  },
  {
    index: '02',
    title: '步行與交通接駁',
    detail:
      '距離臺中火車站後站步行約十至十五分鐘，亦可騎乘微笑單車沿復興路與樂業路抵達湧泉公園周邊。',
  },
  {
    index: '03',
    title: '歷史場域散步禮儀',
    detail:
      '帝國製糖廠臺中營業所為市定歷史建築，進入木構室內空間時請放輕腳步，讓老屋維持圖書館般的沉靜感。',
  },
] as const;

export function FestivalConceptSection() {
  return (
    <>
      {/* Practical Walking Guide Section */}
      <section
        id="guide"
        className="py-16 sm:py-20 bg-[#F3EFE6]/60 border-b border-[#E4DDD0] scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-xl mb-10">
            <p className="text-xs tracking-[0.14em] text-[#5B7062] font-medium mb-3">
              現場散步備忘
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1E3B2E]">
              出發前往帝國製糖廠前的小提醒
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {WALKING_TIPS.map((tip) => (
              <div
                key={tip.index}
                className="bg-[#FAF7F2] border border-[#E2DACB] rounded-xl p-6"
              >
                <p className="font-latin-serif text-sm font-medium text-[#5B7062] tabular-nums mb-2">
                  {tip.index}
                </p>
                <h3 className="font-editorial text-lg font-semibold text-[#1E3B2E] mb-2.5">
                  {tip.title}
                </h3>
                <p className="text-sm text-[#4F5E55] leading-[1.8]">
                  {tip.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept & Project Background Section */}
      <section
        id="concept"
        className="py-16 sm:py-24 border-b border-[#E4DDD0] scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.14em] text-[#5B7062] font-medium mb-3">
                企劃背景與設計初衷
              </p>
              <h2
                className="font-editorial text-2xl sm:text-4xl font-semibold text-[#1E3B2E] leading-snug mb-5"
                style={{ textWrap: 'balance' }}
              >
                都市綠洲 Urban Oasis Film Festival 企劃構想
              </h2>
              <p className="text-xs text-[#6B7A70] leading-relaxed">
                本網站為大學程式設計課程 HW02 應用服務原型，結合城市慢活影展企劃提案與臺中真實歷史地景而設計。
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#425048] leading-[1.9]">
              <p>
                「都市綠洲 Urban Oasis Film Festival」是一項聚焦當代都市青年的策展與行銷企劃構想，討論我們在課業、工作與社群訊息之間，如何替自己保留短暫而真實的喘息空檔。
              </p>
              <p>
                在企劃想像中，我們將目光投向臺中東區的「帝國製糖廠臺中營業所」與星泉湖水岸——它離火車站不遠，卻同時擁有 1935 年的歷史建築厚度、開闊的水面與綠地。因此，這套行程規劃器並非宣傳一場已經正式舉辦的售票影展，而是把企劃裡的「放慢步調，糖廠剛好」理念轉化為日常即可使用的小型散步伴遊工具。
              </p>

              <div className="pt-4 border-t border-[#E4DDD0] grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-xs text-[#69796F] font-medium mb-1">
                    企劃提案性質說明
                  </p>
                  <p className="text-[#2F3D35] leading-relaxed">
                    影展主題屬於課程行銷企劃之設計構想，本站所有推薦路線皆立足於糖廠與湧泉公園日常開放之真實場域空間。
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#69796F] font-medium mb-1">
                    雙軌智慧推薦機制
                  </p>
                  <p className="text-[#2F3D35] leading-relaxed">
                    支援伺服器端 Gemini 模型個人化生成，並內建完整規則式慢活演算引擎，確保任何環境下都能流暢編排行程。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
