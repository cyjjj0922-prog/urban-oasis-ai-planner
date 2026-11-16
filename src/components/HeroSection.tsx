import { ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ResilientImage } from './ResilientImage.tsx';

const HERO_IMAGE_PATH = '/src/assets/images/hero_sugar_factory_1794829810619.jpg';

const UTILITY_STRIP_ITEMS = [
  {
    label: '場域座標',
    value: '帝國製糖廠臺中營業所 · 東區樂業路',
  },
  {
    label: '自然地景',
    value: '湧泉公園星泉湖 · 垂柳水岸與草坡',
  },
  {
    label: '歷史紋理',
    value: '1935 年製糖會社建築 · 木構與紅磚',
  },
  {
    label: '企劃定位',
    value: '都市綠洲影展企劃 · 慢活伴遊原型',
  },
] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      className="pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-[#E4DDD0]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left editorial headline & value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between py-2"
          >
            <div>
              <p className="text-xs sm:text-sm tracking-[0.14em] text-[#5B7062] font-medium mb-5">
                都市綠洲 AI 療癒行程規劃器 · 臺中東區
              </p>

              <h1
                className="font-editorial font-semibold text-[#1E3B2E] leading-[1.18] tracking-tight mb-6"
                style={{
                  fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)',
                  textWrap: 'balance',
                }}
              >
                放慢步調，
                <br />
                糖廠剛好
              </h1>

              <p className="text-base sm:text-[17px] leading-[1.85] text-[#45534A] max-w-[44ch] mb-8">
                不需要請長假遠行。在車流繁忙的臺中市區邊緣，帝國製糖廠臺中營業所與星泉湖保留了一片剛好適合喘息的水岸綠地——依照此刻心情與空檔時間，為你編排一段剛剛好的城市離線散步。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#planner"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium bg-[#1E3B2E] text-[#FAF7F2] rounded-lg hover:bg-[#14291F] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
              >
                <span>編排我的療癒行程</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#spaces"
                className="text-sm font-medium text-[#3B5446] hover:text-[#1E3B2E] underline underline-offset-4 decoration-[#B9C5BC] hover:decoration-[#1E3B2E] transition-colors py-2 whitespace-nowrap shrink-0"
              >
                先看看糖廠風景
              </a>
            </div>
          </motion.div>

          {/* Right dominant 16:9 visual carrier */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative overflow-hidden rounded-xl border border-[#DFD7C8] bg-[#EAE4D7] flex-1 min-h-[260px] sm:min-h-[360px]">
              <ResilientImage
                src={HERO_IMAGE_PATH}
                alt="午後陽光映照下的帝國製糖廠臺中營業所與星泉湖水岸綠地"
                className="w-full h-full object-cover lg:absolute lg:inset-0"
                aspectClassName="aspect-[16/9]"
                fallbackTitle="帝國製糖廠臺中營業所 · 星泉湖水岸"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-[#647269]">
              <span className="font-editorial italic tracking-wide">
                圖 01 — 帝國製糖廠臺中營業所與星泉湖水岸光影
              </span>
              <span className="hidden sm:inline whitespace-nowrap">
                臺中市東區 · 湧泉公園
              </span>
            </figcaption>
          </motion.figure>
        </div>

        {/* Full-width 4-column unboxed utility strip below the hero split */}
        <div className="mt-12 pt-8 border-t border-[#E4DDD0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {UTILITY_STRIP_ITEMS.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <p className="text-xs tracking-[0.08em] text-[#6E8074] font-medium">
                {item.label}
              </p>
              <p className="text-sm font-medium text-[#24322B] leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
