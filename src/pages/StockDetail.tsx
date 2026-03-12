import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, X } from 'lucide-react';
import { StockGraphPlaceholder } from '@/components/ui/stock-graph-placeholder';
import { StockPriceChart } from '@/components/graph/StockPriceChart';
import { getStockChartForPortfolioTicker, getStocksForPortfolio } from '@/constants/stockData';
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
  about: 'About',
  keyFactors: 'Key Predictive Factors',
  keyFactorsDescription:
    'Our proprietary algorithm identified these factors as the most significant predictors for this stock:',
  askAiAbout: 'Ask AI About',
  aiComingSoon: 'AI Chatbot - Coming Soon',
};

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
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-3 shadow-[0_18px_34px_rgba(0,0,0,0.16)] sm:h-28 sm:w-28">
                <span className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
                  {stock.ticker}
                </span>
              </div>
              <div className="min-w-0">
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]/90">
                  Portfolio holding
                </p>
                <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                  {stock.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_1px_minmax(0,1fr)] gap-6 lg:gap-8">
          {/* Left Column - Chart and Description */}
          <div className="space-y-6">
            {/* Chart */}
            <Card className="overflow-hidden bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
              <div className="border-b border-[var(--card-border)]/80 px-5 py-5 sm:px-6 sm:py-6">
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
              <CardContent className="p-4 sm:p-6">
                {stockChartData.length > 0 ? (
                  <StockPriceChart data={stockChartData} ticker={stock.ticker} />
                ) : (
                  <StockGraphPlaceholder height="h-96" ticker={stock.ticker} />
                )}
              </CardContent>
            </Card>

            {/* Company Description */}
            <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.about} {stock.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--muted-text)] leading-relaxed">
                  {stock.description}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block w-px bg-white/80" />

          {/* Right Column - Key Factors */}
          <div className="space-y-6 lg:pl-1">
            {/* Key Factors */}
            <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.15)] lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.keyFactors}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-text)] mb-4">
                  {STOCK_DETAIL_TEXT.keyFactorsDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stock.factors.map((factor, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--foreground)]"
                    >
                      {factor}
                    </Badge>
                  ))}
                </div>
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
        className={`fixed right-0 bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-xl transition-transform duration-300 ease-in-out z-40 ${chatPanelPositionClass} ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '400px' }}
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
