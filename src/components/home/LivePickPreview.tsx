import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { HedgeFundPerformanceChart } from '../graph/HedgeFundPerformanceChart';
import { STOCK_PREVIEW_SAMPLE } from '@/constants/stockPreviewSample';
import { Button } from '@/components/ui/button';

const cardClass =
  'relative overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/35 p-6 shadow-[0_18px_36px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10';

export const LivePickPreview = () => {
  const stock = STOCK_PREVIEW_SAMPLE;
  const isPositive = stock.change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <ScrollSection
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--background)] text-[var(--foreground)]"
      triggerClass="preview-content"
    >
      <div className="max-w-7xl mx-auto preview-content">
        <SectionHeader
          mainText="What a Pick Looks Like"
          subText="Every recommendation comes with a chart, a confidence score, and the exact reasons we own it."
        />

        <div className="mx-auto max-w-5xl">
          <div className={cardClass}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_50%)]"
            />

            <div className="relative z-10 mb-5">
              <span className="rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">
                Sample Pick
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left column: stock info */}
              <div className="flex flex-col gap-6">
                {/* Ticker + name + price */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                      {stock.ticker}
                    </span>
                    <span className="text-sm text-[var(--muted-text)]">{stock.name}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-semibold tabular-nums text-[var(--foreground)]">
                      ${stock.price.toFixed(2)}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}
                    >
                      <TrendIcon className="h-3.5 w-3.5" />
                      {isPositive ? '+' : ''}
                      {stock.change.toFixed(2)} ({isPositive ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                {/* Recommendation + Confidence */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-lg border px-4 py-1.5 text-sm font-bold uppercase tracking-wide ${
                        stock.recommendation === 'Buy'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-red-500/30 bg-red-500/10 text-red-400'
                      }`}
                    >
                      {stock.recommendation}
                    </span>
                    <span className="text-sm text-[var(--muted-text)]">Recommendation</span>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
                        Model Confidence
                      </span>
                      <span className="text-sm font-semibold text-[var(--accent)]">
                        {stock.confidence}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-yellow-300 transition-all duration-700"
                        style={{ width: `${stock.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Factors */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
                    Why we own it
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {stock.factors.map((factor) => (
                      <li
                        key={factor}
                        className="flex items-center gap-2.5 text-sm text-[var(--foreground)]/85"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="mt-auto w-fit border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(250,204,21,0.2)] transition-all hover:bg-yellow-300 hover:shadow-[0_12px_32px_rgba(250,204,21,0.28)]"
                >
                  <Link to="/stock">
                    Explore a live pick
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              {/* Right column: hedge fund performance chart */}
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
                  2025 Cumulative Return vs. Market
                </p>
                <HedgeFundPerformanceChart />
                <p className="text-center text-[11px] text-[var(--muted-text)]/60">
                  EyeLand R2S Partners, LP · Jan 1 – Nov 27, 2025 · Past performance does not guarantee future results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
