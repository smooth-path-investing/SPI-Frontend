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
import { fetchStockIndicatorWeights } from '@/API/fetchStockFactorCoefvec';
import { fetchStockFundamentalChartSeries } from '@/API/fetchStockFundamental';
import { getStockChartForPortfolioTicker, getStocksForPortfolio } from '@/constants/stockData';
import { getTickerAnalytics } from '@/constants/tickerAnalytics';
import {
  isStockPreviewSampleTicker,
  STOCK_PREVIEW_SAMPLE,
  STOCK_PREVIEW_SAMPLE_CHART,
} from '@/constants/stockPreviewSample';
import type {
  CumulativeReturnComparisonPoint,
  IndicatorNormalizedPoint,
  IndicatorWeightPoint,
  TickerIndicatorMeta,
} from '@/features/stocks/analytics/types';
import {
  ChartCard,
  DEFAULT_PORTFOLIO_ID,
  formatCoverageDate,
  getStockDetailBackLabel,
  getStockDetailBackPath,
  isPortfolioStockDetailPath,
  isStockPreviewDetailPath,
  type StockPricePoint,
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
  loadingIndicatorWeights: 'Loading indicator weights...',
  indicatorWeightsUnavailable: 'Indicator weights are unavailable for this ticker.',
  loadingRebasedIndicators: 'Loading rebased indicator series...',
  rebasedIndicatorsUnavailable: 'Rebased indicator series are unavailable for this ticker.',
};

const REBASED_PRICE_SERIES_KEY = 'stock_price';
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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

const getSeriesAlignmentKey = (date: string): string => {
  const normalizedDate = date.trim();

  if (!ISO_DATE_PATTERN.test(normalizedDate)) {
    return normalizedDate;
  }

  const parsedDate = new Date(`${normalizedDate}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return normalizedDate;
  }

  const quarter = Math.floor(parsedDate.getUTCMonth() / 3) + 1;

  return `${parsedDate.getUTCFullYear()}-Q${quarter}`;
};

const mergeNormalizedSeriesWithPrice = (
  normalizedSeries: IndicatorNormalizedPoint[],
  indicators: TickerIndicatorMeta[],
  priceSeries: StockPricePoint[],
  tickerSymbol: string,
): {
  data: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
} => {
  if (normalizedSeries.length === 0 || indicators.length === 0 || priceSeries.length === 0) {
    return {
      data: normalizedSeries,
      indicators,
    };
  }

  const exactPriceByDate = new Map<string, number>();
  const alignedPriceByPeriod = new Map<string, number>();

  priceSeries.forEach((point) => {
    if (!point.date || typeof point.close !== 'number' || !Number.isFinite(point.close) || point.close <= 0) {
      return;
    }

    exactPriceByDate.set(point.date, point.close);
    alignedPriceByPeriod.set(getSeriesAlignmentKey(point.date), point.close);
  });

  const matchedRows = normalizedSeries.flatMap((row) => {
    const exactPrice = exactPriceByDate.get(row.date);
    const alignedPrice = alignedPriceByPeriod.get(getSeriesAlignmentKey(row.date));
    const close = exactPrice ?? alignedPrice;

    if (typeof close !== 'number' || !Number.isFinite(close) || close <= 0) {
      return [];
    }

    return [
      {
        close,
        row,
      },
    ];
  });

  const rebasingBasis = matchedRows[0]?.close;

  if (typeof rebasingBasis !== 'number' || !Number.isFinite(rebasingBasis) || rebasingBasis <= 0) {
    return {
      data: normalizedSeries,
      indicators,
    };
  }

  const mergedData = matchedRows.map(({ close, row }) => ({
    ...row,
    [REBASED_PRICE_SERIES_KEY]: Number(((close / rebasingBasis) * 100).toFixed(2)),
  }));

  if (mergedData.length === 0) {
    return {
      data: normalizedSeries,
      indicators,
    };
  }

  return {
    data: mergedData,
    indicators: [
      {
        key: REBASED_PRICE_SERIES_KEY,
        label: `${tickerSymbol} price`,
        weight: 0,
        seriesType: 'stock',
      },
      ...indicators.filter((indicator) => indicator.key !== REBASED_PRICE_SERIES_KEY),
    ],
  };
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
  const normalizedRouteTicker = ticker?.trim().toUpperCase() ?? '';
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [stockAssetSeries, setStockAssetSeries] = useState<StockAssetChartSeries | null>(null);
  const [isLoadingStockAssetSeries, setIsLoadingStockAssetSeries] = useState(false);
  const [indicatorWeights, setIndicatorWeights] = useState<IndicatorWeightPoint[]>([]);
  const [isLoadingIndicatorWeights, setIsLoadingIndicatorWeights] = useState(false);
  const [normalizedIndicatorSeries, setNormalizedIndicatorSeries] = useState<
    IndicatorNormalizedPoint[]
  >([]);
  const [normalizedIndicators, setNormalizedIndicators] = useState<TickerIndicatorMeta[]>([]);
  const [isLoadingNormalizedIndicators, setIsLoadingNormalizedIndicators] = useState(false);
  const resolvedPortfolioId = portfolioId ?? DEFAULT_PORTFOLIO_ID;
  const isStockPreviewRoute = isStockPreviewDetailPath(location.pathname);
  const isPortfolioStockRoute = isPortfolioStockDetailPath(location.pathname);
  const backPath = getStockDetailBackPath(location.pathname, resolvedPortfolioId);
  const backLabel = getStockDetailBackLabel(location.pathname);

  const stocks = getStocksForPortfolio(resolvedPortfolioId);
  const stock = isStockPreviewRoute
    ? isStockPreviewSampleTicker(normalizedRouteTicker)
      ? STOCK_PREVIEW_SAMPLE
      : undefined
    : stocks.find((item) => item.ticker.trim().toUpperCase() === normalizedRouteTicker);
  const resolvedTicker = stock?.ticker?.trim().toUpperCase() ?? normalizedRouteTicker;
  const localStockChartData = isStockPreviewRoute
    ? isStockPreviewSampleTicker(resolvedTicker)
      ? STOCK_PREVIEW_SAMPLE_CHART
      : []
    : resolvedTicker
      ? getStockChartForPortfolioTicker(resolvedPortfolioId, resolvedTicker)
      : [];
  const pagePaddingTopClass = isPortfolioStockRoute ? 'pt-5 sm:pt-6' : 'pt-24';
  const chatPanelPositionClass = isPortfolioStockRoute
    ? 'top-0 h-screen'
    : 'top-16 h-[calc(100vh-4rem)]';

  useEffect(() => {
    if (!resolvedTicker || isStockPreviewRoute) {
      setStockAssetSeries(null);
      setIsLoadingStockAssetSeries(false);
      return;
    }

    let isCancelled = false;

    const loadStockAssetSeries = async () => {
      setIsLoadingStockAssetSeries(true);

      try {
        const nextStockAssetSeries = await fetchStockAssetChartSeries(resolvedTicker);

        if (!isCancelled) {
          setStockAssetSeries(nextStockAssetSeries);
        }
      } catch (error) {
        console.error(`Failed to load stock asset data for ${resolvedTicker}:`, error);

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
  }, [isStockPreviewRoute, resolvedTicker]);

  useEffect(() => {
    if (!resolvedTicker || isStockPreviewRoute) {
      setIndicatorWeights([]);
      setIsLoadingIndicatorWeights(false);
      return;
    }

    let isCancelled = false;

    const loadIndicatorWeights = async () => {
      setIsLoadingIndicatorWeights(true);

      try {
        const nextIndicatorWeights = await fetchStockIndicatorWeights(resolvedTicker);

        if (!isCancelled) {
          setIndicatorWeights(nextIndicatorWeights ?? []);
        }
      } catch (error) {
        console.error(`Failed to load indicator weights for ${resolvedTicker}:`, error);

        if (!isCancelled) {
          setIndicatorWeights([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingIndicatorWeights(false);
        }
      }
    };

    void loadIndicatorWeights();

    return () => {
      isCancelled = true;
    };
  }, [isStockPreviewRoute, resolvedTicker]);

  useEffect(() => {
    if (!resolvedTicker || isStockPreviewRoute) {
      setNormalizedIndicatorSeries([]);
      setNormalizedIndicators([]);
      setIsLoadingNormalizedIndicators(false);
      return;
    }

    let isCancelled = false;

    const loadNormalizedIndicatorSeries = async () => {
      setIsLoadingNormalizedIndicators(true);

      try {
        const nextNormalizedIndicatorSeries = await fetchStockFundamentalChartSeries(resolvedTicker);

        if (!isCancelled) {
          setNormalizedIndicatorSeries(nextNormalizedIndicatorSeries?.data ?? []);
          setNormalizedIndicators(nextNormalizedIndicatorSeries?.indicators ?? []);
        }
      } catch (error) {
        console.error(`Failed to load rebased indicator series for ${resolvedTicker}:`, error);

        if (!isCancelled) {
          setNormalizedIndicatorSeries([]);
          setNormalizedIndicators([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingNormalizedIndicators(false);
        }
      }
    };

    void loadNormalizedIndicatorSeries();

    return () => {
      isCancelled = true;
    };
  }, [isStockPreviewRoute, resolvedTicker]);

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
  const indicatorWeightsData = isStockPreviewRoute ? tickerAnalytics.indicatorWeights : indicatorWeights;
  const normalizedIndicatorSeriesData = isStockPreviewRoute
    ? tickerAnalytics.normalizedIndicatorSeries
    : normalizedIndicatorSeries;
  const normalizedIndicatorMeta = isStockPreviewRoute
    ? tickerAnalytics.indicators
    : normalizedIndicators;
  const normalizedIndicatorChart = mergeNormalizedSeriesWithPrice(
    normalizedIndicatorSeriesData,
    normalizedIndicatorMeta,
    priceChartData,
    stock.ticker,
  );
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
              {indicatorWeightsData.length > 0 ? (
                <IndicatorWeightsChart data={indicatorWeightsData} />
              ) : (
                <ChartStatusMessage
                  message={
                    isLoadingIndicatorWeights
                      ? STOCK_DETAIL_TEXT.loadingIndicatorWeights
                      : STOCK_DETAIL_TEXT.indicatorWeightsUnavailable
                  }
                />
              )}
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
                    Ticker price and indicator series rebased to 100 for relative trend comparison.
                  </p>
                </div>
              }
            >
              {normalizedIndicatorChart.data.length > 0 &&
              normalizedIndicatorChart.indicators.length > 0 ? (
                <NormalizedIndicatorChart
                  data={normalizedIndicatorChart.data}
                  indicators={normalizedIndicatorChart.indicators}
                />
              ) : (
                <ChartStatusMessage
                  message={
                    isLoadingNormalizedIndicators
                      ? STOCK_DETAIL_TEXT.loadingRebasedIndicators
                      : STOCK_DETAIL_TEXT.rebasedIndicatorsUnavailable
                  }
                />
              )}
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
