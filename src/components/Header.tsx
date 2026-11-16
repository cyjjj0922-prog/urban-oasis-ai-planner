import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '#spaces', label: '糖廠風景' },
  { href: '#planner', label: '行程規劃' },
  { href: '#guide', label: '散步指南' },
  { href: '#concept', label: '企劃概念' },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/92 backdrop-blur-md border-b border-[#E4DDD0]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-editorial text-lg sm:text-xl font-semibold tracking-wide text-[#1E3B2E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3B2E]"
        >
          都市綠洲
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="主導覽列"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4D5B52]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#1E3B2E] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#1E3B2E] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3B2E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#planner"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[#1E3B2E] text-[#FAF7F2] rounded-lg hover:bg-[#14291F] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
          >
            開始規劃
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '關閉導覽選單' : '開啟導覽選單'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#1E3B2E] hover:bg-[#EFEAE0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B2E]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden border-t border-[#E4DDD0] bg-[#FAF7F2] px-5 py-4">
          <nav aria-label="行動版導覽列" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-3 px-2 text-base font-medium text-[#2E3C34] hover:text-[#1E3B2E] hover:bg-[#EFEAE0]/60 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#planner"
              onClick={handleLinkClick}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-medium bg-[#1E3B2E] text-[#FAF7F2] rounded-lg hover:bg-[#14291F] transition-colors"
            >
              開始規劃我的療癒行程
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
