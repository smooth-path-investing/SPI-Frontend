import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, X } from 'lucide-react';
import { StockGraphPlaceholder } from '@/components/ui/stock-graph-placeholder';
import { StockPriceChart } from '@/components/graph/StockPriceChart';
import {
  CumulativeReturnsChart,
  IndicatorWeightsChart,
  NormalizedIndicatorChart,
} from '@/components/graph/TickerAnalyticsCharts';
import { getStockChartForPortfolioTicker, getStocksForPortfolio } from '@/constants/stockData';
import { getTickerAnalytics } from '@/constants/tickerAnalytics';
import {
  isStockPreviewSampleTicker,
  STOCK_PREVIEW_SAMPLE,
  STOCK_PREVIEW_SAMPLE_CHART,
} from '@/constants/stockPreviewSample';

const STOCK_DETAIL_TEXT = {
  backToPortfolio: 'Back to Portfolio',
  backToStocks: 'Back to Stocks',
  notFound: 'Stock not found',
  priceChart: 'Price Chart',
  askAiAbout: 'Ask AI About',
  aiComingSoon: 'AI Chatbot - Coming Soon',
};

const CHART_CARD_CLASS =
  'h-full overflow-hidden bg-[var(--card-bg)] border border-white/35 text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex flex-col';

const CHART_CARD_HEADER_CLASS =
  'flex min-h-[130px] sm:min-h-[138px] flex-col justify-between gap-3 px-5 py-5 sm:px-6 sm:py-6';

const CHART_CARD_CONTENT_CLASS = 'flex-1 p-4 sm:p-6';

const formatCoverageDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const StockDetail: React.FC = () => {
  const { portfolioId, ticker } = useParams<{ portfolioId?: string; ticker: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const resolvedPortfolioId = portfolioId ?? 'long-contrarian';
  const isStockPreviewRoute = location.pathname.startsWith('/stock/');
  const isPortfolioStockRoute = /^\/portfolio(?:\/[^/]+)?\/stock\/[^/]+$/.test(location.pathname);
  const backPath = isStockPreviewRoute
    ? '/stock'
    : resolvedPortfolioId === 'long-contrarian'
      ? '/portfolio'
      : `/portfolio/${resolvedPortfolioId}`;
  const backLabel = isStockPreviewRoute
    ? STOCK_DETAIL_TEXT.backToStocks
    : STOCK_DETAIL_TEXT.backToPortfolio;

  const stocks = getStocksForPortfolio(resolvedPortfolioId);
  const stock = isStockPreviewRoute
    ? (isStockPreviewSampleTicker(ticker) ? STOCK_PREVIEW_SAMPLE : undefined)
    : stocks.find((item) => item.ticker === ticker);
  const stockChartData = isStockPreviewRoute
    ? (isStockPreviewSampleTicker(ticker) ? STOCK_PREVIEW_SAMPLE_CHART : [])
    : ticker
      ? getStockChartForPortfolioTicker(resolvedPortfolioId, ticker)
      : [];
  const chartStart = stockChartData[0];
  const chartEnd = stockChartData[stockChartData.length - 1];
  const pagePaddingTopClass = isPortfolioStockRoute ? 'pt-5 sm:pt-6' : 'pt-24';
  const chatPanelPositionClass = isPortfolioStockRoute
    ? 'top-0 h-screen'
    : 'top-16 h-[calc(100vh-4rem)]';

  if (!stock) {
    return (
      <div
        className={`min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 ${pagePaddingTopClass}`}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[var(--muted-text)]">{STOCK_DETAIL_TEXT.notFound}</p>
          <Button
            onClick={() => navigate(backPath)}
            className="mt-4 mx-auto block border-[var(--accent)]/50 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Button>
        </div>
      </div>
    );
  }

  const tickerAnalytics = getTickerAnalytics(stock, stockChartData);

  return (
    <div
      className={`min-h-screen bg-[var(--background)] text-[var(--foreground)] relative ${pagePaddingTopClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 pr-4">
        {/* Back Button */}
        <Button
          onClick={() => navigate(backPath)}
          variant="outline"
          className="mb-4 sm:mb-5 rounded-full border-white/15 bg-black/25 px-4 text-[var(--foreground)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)] hover:text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backLabel}
        </Button>

        {/* Stock Header */}
        <div className="relative mb-8 overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/40 px-5 py-6 sm:px-7 sm:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_42%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                {stock.name}
              </h1>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:min-w-[360px]">
              <div className="flex min-h-[96px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                  Type
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                  {stock.sector}
                </p>
              </div>
              <div className="flex min-h-[96px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                  Current Price
                </p>
                <p className="mt-2 text-xl font-semibold tabular-nums text-[var(--foreground)] sm:text-2xl">
                  ${stock.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:auto-rows-fr">
            <Card className={CHART_CARD_CLASS}>
              <div className={CHART_CARD_HEADER_CLASS}>
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
              </div>
              <CardContent className={CHART_CARD_CONTENT_CLASS}>
                {stockChartData.length > 0 ? (
                  <StockPriceChart data={stockChartData} ticker={stock.ticker} />
                ) : (
                  <StockGraphPlaceholder height="h-96" ticker={stock.ticker} />
                )}
              </CardContent>
            </Card>

            <Card className={CHART_CARD_CLASS}>
              <div className={CHART_CARD_HEADER_CLASS}>
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
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      {stock.ticker}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)]/80 bg-black/20 px-3 py-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                      IVV
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className={CHART_CARD_CONTENT_CLASS}>
                <CumulativeReturnsChart data={tickerAnalytics.cumulativeReturns} />
              </CardContent>
            </Card>

            <Card className={CHART_CARD_CLASS}>
              <div className={CHART_CARD_HEADER_CLASS}>
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
              </div>
              <CardContent className={CHART_CARD_CONTENT_CLASS}>
                <IndicatorWeightsChart data={tickerAnalytics.indicatorWeights} />
              </CardContent>
            </Card>

            <Card className={CHART_CARD_CLASS}>
              <div className={CHART_CARD_HEADER_CLASS}>
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
              </div>
              <CardContent className={CHART_CARD_CONTENT_CLASS}>
                <NormalizedIndicatorChart
                  data={tickerAnalytics.normalizedIndicatorSeries}
                  indicators={tickerAnalytics.indicators}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)]"
        size="icon"
      >
        {isChatOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
      </Button>

      {/* Chatbot Sidebar */}
      <div
        className={`fixed right-0 w-[min(100vw,400px)] lg:w-[min(1000px,82vw)] bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-xl transition-transform duration-300 ease-in-out z-40 ${chatPanelPositionClass} ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[var(--card-border)]">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{STOCK_DETAIL_TEXT.askAiAbout} {stock.ticker}</h3>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-[var(--muted-text)]">{STOCK_DETAIL_TEXT.aiComingSoon}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
