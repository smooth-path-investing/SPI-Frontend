import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/sectionHeaders/reusableHeaders/sectionHeader';
import { CalendarClock, Package, Target, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';

interface StockList {
  id: string;
  title: string;
  target: string;
  cadence: string;
  holdings: string;
  lastUpdated: string;
  accentLineClass: string;
  badgeClass: string;
  headerKickerClass: string;
  titleClass: string;
  icon: LucideIcon;
}

const STOCK_LISTS: StockList[] = [
  {
    id: 'long-contrarian',
    title: 'Long Stocks List',
    target: 'S&P 500 plus/minus 15%',
    cadence: 'Quarterly',
    holdings: '10 stocks',
    lastUpdated: 'February 20, 2026',
    accentLineClass: 'from-white via-white/85 to-transparent',
    badgeClass: 'border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]',
    headerKickerClass: 'text-[var(--accent)]',
    titleClass: 'text-[var(--foreground)]',
    icon: TrendingUp,
  },
  {
    id: 'short-contrarian',
    title: 'Short Stocks List',
    target: 'S&P 500 plus/minus 15%',
    cadence: 'Quarterly',
    holdings: '10 stocks',
    lastUpdated: 'February 20, 2026',
    accentLineClass: 'from-white via-white/85 to-transparent',
    badgeClass: 'border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]',
    headerKickerClass: 'text-[var(--accent)]',
    titleClass: 'text-[var(--foreground)]',
    icon: TrendingDown,
  },
];

export const Stocks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionHeader
          mainText="SPI Stock Selection"
          subText="build your portfolio with our 10 recommended stocks every quarter"
        />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {STOCK_LISTS.map((list) => {
            const ListIcon = list.icon;

            return (
              <div key={list.id} className="relative mx-auto w-full max-w-xl md:max-w-none">
                <header className="mb-3 sm:mb-4">
                  <p className={`hidden sm:block text-xs uppercase tracking-[0.14em] mb-1 ${list.headerKickerClass}`}>
                    Stock Profile
                  </p>
                  <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${list.titleClass}`}>
                    {list.title}
                  </h2>
                </header>

                <article className="rounded-[var(--radius)] border-2 border-white/20 bg-gradient-to-b from-[var(--card-bg)] to-black/70 p-4 sm:p-7 shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition-all duration-300 hover:border-[var(--card-hover)]/70 hover:shadow-[0_18px_32px_rgba(0,0,0,0.26)]">
                  <div className={`h-[2px] w-full mb-5 sm:mb-6 rounded-full bg-gradient-to-r ${list.accentLineClass}`} />

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                    <div className={`inline-flex items-center justify-center rounded-md border p-1.5 sm:p-2 ${list.badgeClass}`}>
                      <ListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-[var(--muted-text)]">
                      Quarterly Recommendation Set
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7">
                    <div className="rounded-md border border-white/15 bg-black/15 p-2.5 sm:p-3">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" />
                        Target
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-[var(--foreground)]">{list.target}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="rounded-md border border-white/15 bg-black/15 p-2.5 sm:p-3">
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1 flex items-center gap-1.5">
                          <CalendarClock className="w-3.5 h-3.5" />
                          Rebalance
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-[var(--foreground)]">{list.cadence}</p>
                      </div>
                      <div className="rounded-md border border-white/15 bg-black/15 p-2.5 sm:p-3">
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5" />
                          Holdings
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-[var(--foreground)]">{list.holdings}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[var(--muted-text)] mb-3">Last Updated: {list.lastUpdated}</p>

                  <Button
                    onClick={() => navigate(`/portfolio/${list.id}`)}
                    className="w-full h-10 sm:h-11 bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)] font-semibold"
                  >
                    View List
                  </Button>
                </article>

                {list.id === 'long-contrarian' ? (
                  <div className="hidden md:block absolute top-0 -right-4 h-full w-px bg-white/80" />
                ) : null}
                {list.id === 'long-contrarian' ? (
                  <div className="md:hidden mt-5 h-px w-full bg-white/80" />
                ) : null}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
