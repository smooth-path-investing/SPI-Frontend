import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FactorDualAxisChart } from '@/components/graph/FactorDualAxisChart';
import {
  buildPortfolioStockDetailPath,
  ChartCard,
  fetchStockFactorSeries,
  fetchStockMeta,
  type FactorChart,
} from '@/features/stocks';

const KIND_LABEL: Record<FactorChart['kind'], string> = {
  macro: 'Macro factor',
  market: 'Market factor',
  fundamental: 'Fundamental factor',
};

export const StockFactorCharts: React.FC = () => {
  const { portfolioId, ticker } = useParams<{ portfolioId?: string; ticker: string }>();
  const navigate = useNavigate();
  const normalizedTicker = (ticker ?? '').trim().toUpperCase();

  const [name, setName] = useState('');
  const [charts, setCharts] = useState<FactorChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const backPath = useMemo(
    () => buildPortfolioStockDetailPath(portfolioId ?? 'long-contrarian', normalizedTicker),
    [portfolioId, normalizedTicker],
  );

  useEffect(() => {
    if (!normalizedTicker) return;
    let isCancelled = false;
    setIsLoading(true);

    Promise.all([fetchStockFactorSeries(normalizedTicker), fetchStockMeta(normalizedTicker)])
      .then(([series, meta]) => {
        if (isCancelled) return;
        setCharts(series.charts);
        setName(meta?.name ?? '');
      })
      .catch(() => {
        if (!isCancelled) setCharts([]);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [normalizedTicker]);

  return (
    <div className="relative min-h-screen bg-[var(--background)] pt-8 text-[var(--foreground)] sm:pt-24">
      <div className="mx-auto max-w-[88rem] px-4 pb-12 sm:px-6 lg:px-8">
        <Button
          onClick={() => navigate(backPath)}
          variant="outline"
          className="mb-5 rounded-full border-white/15 bg-black/25 px-4 text-[var(--foreground)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)] hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {normalizedTicker} analysis
        </Button>

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]/90">
            Factor Detail
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {normalizedTicker} vs. its factors
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
            {name ? `${name} — ` : ''}each chart overlays the {normalizedTicker} price (gold, left
            axis) against one driving factor (white, right axis) over time.
          </p>
        </div>

        {isLoading ? (
          <p className="py-16 text-center text-sm text-[var(--muted-text)]">Loading factor charts…</p>
        ) : charts.length === 0 ? (
          <p className="py-16 text-center text-sm text-[var(--muted-text)]">
            No factors are available for {normalizedTicker}.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {charts.map((chart, index) => (
              <ChartCard
                key={chart.factorName}
                header={
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]/90">
                      Factor {index + 1} · {KIND_LABEL[chart.kind]}
                    </p>
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {normalizedTicker} vs {chart.factorName}
                    </h2>
                    <div className="flex flex-wrap gap-2 text-xs text-[var(--muted-text)]">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)]/80 bg-black/20 px-3 py-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                        {normalizedTicker}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)]/80 bg-black/20 px-3 py-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                        {chart.factorName}
                      </span>
                    </div>
                  </div>
                }
              >
                {chart.available ? (
                  <FactorDualAxisChart
                    data={chart.points}
                    ticker={normalizedTicker}
                    factorName={chart.factorName}
                  />
                ) : (
                  <div className="flex h-[260px] w-full items-center justify-center rounded-[22px] border border-[var(--card-border)]/60 bg-black/10 px-6 text-center text-sm text-[var(--muted-text)] sm:h-[300px]">
                    Time-series data for {chart.factorName} is not seeded yet.
                  </div>
                )}
              </ChartCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
