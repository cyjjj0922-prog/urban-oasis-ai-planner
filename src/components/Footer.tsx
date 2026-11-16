export function Footer() {
  return (
    <footer className="bg-[#1E3B2E] text-[#FAF7F2] py-14 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#335544]">
          <div className="md:col-span-6 space-y-3">
            <p className="font-editorial text-xl font-semibold tracking-wide">
              都市綠洲 AI 療癒行程規劃器
            </p>
            <p className="text-sm text-[#D1DFD5] leading-relaxed max-w-md">
              放慢步調，糖廠剛好。為都市裡需要片刻喘息的旅人，整理帝國製糖廠臺中營業所與星泉湖畔的溫柔散步提案。
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs tracking-widest text-[#9EB7A7] mb-3">
              頁面導覽
            </p>
            <ul className="space-y-2 text-[#E5EDE7]">
              <li>
                <a href="#spaces" className="hover:text-white transition-colors">
                  糖廠風景速寫
                </a>
              </li>
              <li>
                <a href="#planner" className="hover:text-white transition-colors">
                  療癒行程規劃器
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
                  現場散步備忘
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-white transition-colors">
                  企劃背景說明
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs tracking-widest text-[#9EB7A7] mb-3">
              場域資訊
            </p>
            <p className="text-[#E5EDE7] leading-relaxed">
              帝國製糖廠臺中營業所
              <br />
              臺中市東區樂業路 30 號
              <br />
              湧泉公園 · 星泉湖畔
            </p>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#A9BFB1]">
          <p>
            大學程式設計課程 HW02 應用服務原型 · Urban Oasis Film Festival 企劃延伸
          </p>
          <p>放慢步調，糖廠剛好</p>
        </div>
      </div>
    </footer>
  );
}
