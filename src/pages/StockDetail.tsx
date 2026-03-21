import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { StockGraphPlaceholder } from '@/components/ui/stock-graph-placeholder';
import { StockPriceChart } from '@/components/graph/StockPriceChart';
import {
  CumulativeReturnsChart,
  IndicatorWeightsChart,
  NormalizedIndicatorChart,
} from '@/components/graph/TickerAnalyticsCharts';
import { fetchStockAssetChartSeries, type StockAssetChartSeries } from '@/API/fetchStockAssets';
import { getStockChartForPortfolioTicker, getStocksForPortfolio } from '@/constants/stockData';
import { getTickerAnalytics } from '@/constants/tickerAnalytics';
import {
  isStockPreviewSampleTicker,
  STOCK_PREVIEW_SAMPLE,
  STOCK_PREVIEW_SAMPLE_CHART,
} from '@/constants/stockPreviewSample';
import type { CumulativeReturnComparisonPoint } from '@/features/stocks/analytics/types';
import {
  ChartCard,
  DEFAULT_PORTFOLIO_ID,
  formatCoverageDate,
  getStockDetailBackLabel,
  getStockDetailBackPath,
  isPortfolioStockDetailPath,
  isStockPreviewDetailPath,
  StockChatSidebar,
  StockDetailSummary,
} from '@/features/stocks';

const STOCK_DETAIL_TEXT = {
  notFound: 'Stock not found',
  priceChart: 'Price Chart',
  loadingPriceHistory: 'Loading price history...',
  priceHistoryUnavailable: 'Price history is unavailable for this ticker.',
  loadingBenchmarkComparison: 'Loading cumulative return comparison...',
  benchmarkComparisonUnavailable: 'Benchmark comparison is unavailable for this ticker.',
};

const buildCumulativeReturnsFromSeries = (
  stockAssetSeries: StockAssetChartSeries | null,
): CumulativeReturnComparisonPoint[] => {
  if (!stockAssetSeries) {
    return [];
  }

  const tickerPriceByDate = new Map(
    stockAssetSeries.ticker_points.map((point) => [point.date, point.close]),
  );
  const ivvPriceByDate = new Map(
    stockAssetSeries.ivv_points.map((point) => [point.date, point.close]),
  );
  const sharedDates = Array.from(
    new Set(
      stockAssetSeries.ticker_points
        .map((point) => point.date)
        .filter((date) => ivvPriceByDate.has(date)),
    ),
  ).sort((left, right) => left.localeCompare(right));

  if (sharedDates.length === 0) {
    return [];
  }

  const startingTickerPrice = tickerPriceByDate.get(sharedDates[0]);
  const startingIvvPrice = ivvPriceByDate.get(sharedDates[0]);

  if (
    startingTickerPrice == null ||
    startingIvvPrice == null ||
    startingTickerPrice === 0 ||
    startingIvvPrice === 0
  ) {
    return [];
  }

  return sharedDates.map((date) => ({
    date,
    stockCum: Number(
      ((((tickerPriceByDate.get(date) ?? startingTickerPrice) / startingTickerPrice) - 1) * 100).toFixed(2),
    ),
    ivvCum: Number(
      ((((ivvPriceByDate.get(date) ?? startingIvvPrice) / startingIvvPrice) - 1) * 100).toFixed(2),
    ),
  }));
};

const ChartStatusMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex h-[280px] w-full items-center justify-center rounded-lg border border-[var(--card-border)]/60 bg-black/10 px-6 text-center text-sm text-[var(--muted-text)] sm:h-[320px]">
    {message}
  </div>
);

export const StockDetail: React.FC = () => {
  const { portfolioId, ticker } = useParams<{ portfolioId?: string; ticker: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [stockAssetSeries, setStockAssetSeries] = useState<StockAssetChartSeries | null>(null);
  const [isLoadingStockAssetSeries, setIsLoadingStockAssetSeries] = useState(false);
  const resolvedPortfolioId = portfolioId ?? DEFAULT_PORTFOLIO_ID;
  const isStockPreviewRoute = isStockPreviewDetailPath(location.pathname);
  const isPortfolioStockRoute = isPortfolioStockDetailPath(location.pathname);
  const backPath = getStockDetailBackPath(location.pathname, resolvedPortfolioId);
  const backLabel = getStockDetailBackLabel(location.pathname);

  const stocks = getStocksForPortfolio(resolvedPortfolioId);
  const stock = isStockPreviewRoute
    ? isStockPreviewSampleTicker(ticker)
      ? STOCK_PREVIEW_SAMPLE
      : undefined
    : stocks.find((item) => item.ticker === ticker);
  const localStockChartData = isStockPreviewRoute
    ? isStockPreviewSampleTicker(ticker)
      ? STOCK_PREVIEW_SAMPLE_CHART
      : []
    : ticker
      ? getStockChartForPortfolioTicker(resolvedPortfolioId, ticker)
      : [];
  const pagePaddingTopClass = isPortfolioStockRoute ? 'pt-5 sm:pt-6' : 'pt-24';
  const chatPanelPositionClass = isPortfolioStockRoute
    ? 'top-0 h-screen'
    : 'top-16 h-[calc(100vh-4rem)]';

  useEffect(() => {
    if (!ticker || isStockPreviewRoute) {
      setStockAssetSeries(null);
      setIsLoadingStockAssetSeries(false);
      return;
    }

    let isCancelled = false;

    const loadStockAssetSeries = async () => {
      setIsLoadingStockAssetSeries(true);

      try {
        const nextStockAssetSeries = await fetchStockAssetChartSeries(ticker);

        if (!isCancelled) {
          setStockAssetSeries(nextStockAssetSeries);
        }
      } catch (error) {
        console.error(`Failed to load stock asset data for ${ticker}:`, error);

        if (!isCancelled) {
          setStockAssetSeries(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingStockAssetSeries(false);
        }
      }
    };

    void loadStockAssetSeries();

    return () => {
      isCancelled = true;
    };
  }, [isStockPreviewRoute, ticker]);

  if (!stock) {
    return (
      <div
        className={`min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 ${pagePaddingTopClass}`}
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-center text-[var(--muted-text)]">{STOCK_DETAIL_TEXT.notFound}</p>
          <Button
            onClick={() => navigate(backPath)}
            className="mt-4 mx-auto block border-[var(--accent)]/50 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Button>
        </div>
      </div>
    );
  }

  const tickerAnalytics = getTickerAnalytics(stock, localStockChartData);
  const priceChartData = isStockPreviewRoute ? localStockChartData : (stockAssetSeries?.ticker_points ?? []);
  const cumulativeReturnsData = isStockPreviewRoute
    ? tickerAnalytics.cumulativeReturns
    : buildCumulativeReturnsFromSeries(stockAssetSeries);
  const chartStart = priceChartData[0];
  const chartEnd = priceChartData[priceChartData.length - 1];

  return (
    <div
      className={`relative min-h-screen bg-[var(--background)] text-[var(--foreground)] ${pagePaddingTopClass}`}
    >
      <div className="mx-auto max-w-[88rem] px-4 pb-10 pr-4 sm:px-6 sm:pb-12 lg:px-8">
        <StockDetailSummary
          stock={stock}
          backLabel={backLabel}
          onBack={() => navigate(backPath)}
        />

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:auto-rows-fr">
            <ChartCard
              header={
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]/90">
                      {STOCK_DETAIL_TEXT.priceChart}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      {stock.ticker} price path
                    </h2>
                  </div>
                  {chartStart && chartEnd && (
                    <p className="text-sm text-[var(--muted-text)]">
                      Coverage: {formatCoverageDate(chartStart.date)} to{' '}
                      {formatCoverageDate(chartEnd.date)}
                    </p>
                  )}
                </div>
              }
            >
              {priceChartData.length > 0 ? (
                <StockPriceChart data={priceChartData} ticker={stock.ticker} />
              ) : isStockPreviewRoute ? (
                <StockGraphPlaceholder height="h-96" ticker={stock.ticker} />
              ) : (
                <ChartStatusMessage
                  message={
                    isLoadingStockAssetSeries
                      ? STOCK_DETAIL_TEXT.loadingPriceHistory
                      : STOCK_DETAIL_TEXT.priceHistoryUnavailable
                  }
                />
              )}
            </ChartCard>

            <ChartCard
              header={
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]/90">
                      Benchmark Comparison
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Cumulative returns vs IVV
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--muted-text)]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)]/80 bg-black/20 px-3 py-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                      {stock.ticker}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)]/80 bg-black/20 px-3 py-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      IVV
                    </span>
                  </div>
                </div>
              }
            >
              {cumulativeReturnsData.length > 0 ? (
                <CumulativeReturnsChart data={cumulativeReturnsData} />
              ) : (
                <ChartStatusMessage
                  message={
                    isLoadingStockAssetSeries
                      ? STOCK_DETAIL_TEXT.loadingBenchmarkComparison
                      : STOCK_DETAIL_TEXT.benchmarkComparisonUnavailable
                  }
                />
              )}
            </ChartCard>

            <ChartCard
              header={
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]/90">
                      Indicator Mix
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Indicator weights
                    </h2>
                  </div>
                  <p className="text-sm text-[var(--muted-text)]">
                    Relative weight assigned to the main drivers behind the current {stock.ticker}{' '}
                    view.
                  </p>
                </div>
              }
            >
              <IndicatorWeightsChart data={tickerAnalytics.indicatorWeights} />
            </ChartCard>

            <ChartCard
              header={
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]/90">
                      Relative Performance
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Rebased indicator series
                    </h2>
                  </div>
                  <p className="text-sm text-[var(--muted-text)]">
                    All indicator series rebased to 100 for relative trend comparison.
                  </p>
                </div>
              }
            >
              <NormalizedIndicatorChart
                data={tickerAnalytics.normalizedIndicatorSeries}
                indicators={tickerAnalytics.indicators}
              />
            </ChartCard>
          </div>
        </div>
      </div>

      <StockChatSidebar
        isOpen={isChatOpen}
        ticker={stock.ticker}
        panelPositionClass={chatPanelPositionClass}
        onToggle={() => setIsChatOpen((previousState) => !previousState)}
      />
    </div>
  );
};
