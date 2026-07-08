import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { HedgeFundPerformanceChart } from '../graph/HedgeFundPerformanceChart';
import { Button } from '@/components/ui/button';

const cardClass =
  'relative overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/35 p-6 shadow-[0_18px_36px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10';

export const LivePickPreview = () => {
  return (
    <ScrollSection
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--background)] text-[var(--foreground)]"
      triggerClass="preview-content"
    >
      <div className="max-w-7xl mx-auto preview-content">
        <SectionHeader
          mainText="Our Track Record"
          subText="Real results, not a backtest — see how SPI has performed against the broader market."
        />

        <div className="mx-auto max-w-6xl">
          <div className={cardClass}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_50%)]"
            />

            <div className="relative z-10 flex flex-col gap-4">
              <p className="text-center text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
                2025 Cumulative Return vs. Market
              </p>
              <HedgeFundPerformanceChart heightClassName="h-[340px] w-full sm:h-[420px] lg:h-[480px]" />
              <p className="text-center text-[11px] text-[var(--muted-text)]/60">
                EyeLand R2S Partners, LP · Jan 1 – Nov 27, 2025 · Past performance does not guarantee future results
              </p>

              <Button
                asChild
                className="mx-auto mt-2 w-fit border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(250,204,21,0.2)] transition-all hover:bg-yellow-300 hover:shadow-[0_12px_32px_rgba(250,204,21,0.28)]"
              >
                <Link to="/stock">
                  Explore a live pick
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
