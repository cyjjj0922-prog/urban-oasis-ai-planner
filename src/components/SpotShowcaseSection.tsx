import { ArrowUpRight } from 'lucide-react';
import { type ActivityPreferenceKey } from '../shared/itineraryTypes.ts';
import { ResilientImage } from './ResilientImage.tsx';

interface SpotShowcaseSectionProps {
  onSelectSpotlight: (pref: ActivityPreferenceKey) => void;
}

const SPOT_CARDS: readonly {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  preferenceKey: ActivityPreferenceKey;
  ctaLabel: string;
}[] = [
  {
    index: '01',
    title: '星泉湖畔木棧道',
    subtitle: '水岸散步 · 垂柳與微風',
    description:
      '沿著生態湖泊架設的木質步道與緩坡草地，視野開闊且沒有急促車流聲。適合把思緒交給水面波紋，讓視覺與呼吸一起降速。',
    image: '/src/assets/images/lakeside_walk_oasis_1794829810248.jpg',
    alt: '星泉湖畔木棧道與垂柳倒影的寧靜散步風景',
    preferenceKey: 'lakeside_walk',
    ctaLabel: '以湖畔散步為主軸',
  },
  {
    index: '02',
    title: '1935 歷史建築廊道',
    subtitle: '老屋肌理 · 紅磚與木構',
    description:
      '興建於 1935 年的帝國製糖廠臺中營業所本體，保留了修復後的木桁架、洗石子與紅磚牆面。午後陽光穿透窗格時，自成安靜的電影景框。',
    image: '/src/assets/images/heritage_brick_pavilion_1794829810878.jpg',
    alt: '帝國製糖廠臺中營業所紅磚與木構窗景長廊',
    preferenceKey: 'heritage_architecture',
    ctaLabel: '以歷史建築為主軸',
  },
  {
    index: '03',
    title: '窗景茶歇與食藝空間',
    subtitle: '慢食歇腳 · 老屋飲品時光',
    description:
      '走進面向湖景的室內木窗座位，點一杯手沖咖啡或草本茶飲。在老建築的溫潤氣息裡短暫躲避豔陽或午後陣雨，讓休息變得理直氣壯。',
    image: '/src/assets/images/botanical_cafe_rest_1794829812040.jpg',
    alt: '面向綠色湖畔花園的復古木窗茶歇與咖啡座位',
    preferenceKey: 'cafe_rest',
    ctaLabel: '以休息用餐為主軸',
  },
];

export function SpotShowcaseSection({
  onSelectSpotlight,
}: SpotShowcaseSectionProps) {
  return (
    <section
      id="spaces"
      className="py-16 sm:py-24 bg-[#F3EFE6]/70 border-b border-[#E4DDD0]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.14em] text-[#5B7062] font-medium mb-3">
              場域風景速寫
            </p>
            <h2
              className="font-editorial text-2xl sm:text-4xl font-semibold text-[#1E3B2E] leading-snug"
              style={{ textWrap: 'balance' }}
            >
              在老屋與湖水之間，找到城市喘息的三種溫度
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#546359] max-w-sm leading-relaxed">
            點選任一空間卡片，系統會自動將該體驗納入下方行程規劃器的優先偏好。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPOT_CARDS.map((card) => (
            <article
              key={card.index}
              className="group flex flex-col bg-[#FAF7F2] border border-[#E2DACB] rounded-xl overflow-hidden transition-colors hover:border-[#9EB0A2]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E1D3]">
                <ResilientImage
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  aspectClassName="aspect-[4/3]"
                  fallbackTitle={card.title}
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#697A6E] mb-2.5">
                    <span className="font-latin-serif text-sm font-medium text-[#1E3B2E] tabular-nums">
                      {card.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{card.subtitle}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-semibold text-[#1E3B2E] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#4F5D54] leading-[1.8] mb-6">
                    {card.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectSpotlight(card.preferenceKey)}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#EAE3D6] text-sm font-medium text-[#1E3B2E] hover:text-[#4B6958] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
                >
                  <span>{card.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
