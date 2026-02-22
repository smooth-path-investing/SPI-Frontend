import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, MessageSquare, X } from 'lucide-react';
import { StockGraphPlaceholder } from '@/components/ui/stock-graph-placeholder';
import { StockPriceChart } from '@/components/graph/StockPriceChart';
import { getStockChartForPortfolioTicker, getStocksForPortfolio } from '@/constants/stockData';

const STOCK_DETAIL_TEXT = {
  back: 'Back to Portfolio',
  notFound: 'Stock not found',
  priceChart: 'Price Chart',
  about: 'About',
  keyFactors: 'Key Predictive Factors',
  keyFactorsDescription:
    'Our proprietary algorithm identified these factors as the most significant predictors for this stock:',
  askAiAbout: 'Ask AI About',
  aiComingSoon: 'AI Chatbot - Coming Soon',
};

export const StockDetail: React.FC = () => {
  const { portfolioId, ticker } = useParams<{ portfolioId: string; ticker: string }>();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const stocks = portfolioId ? getStocksForPortfolio(portfolioId) : [];
  const stock = stocks.find(s => s.ticker === ticker);
  const stockChartData =
    portfolioId && ticker ? getStockChartForPortfolioTicker(portfolioId, ticker) : [];

  if (!stock) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[var(--muted-text)]">{STOCK_DETAIL_TEXT.notFound}</p>
          <Button
            onClick={() => navigate(`/portfolio/${portfolioId}`)}
            className="mt-4 mx-auto block border-[var(--accent)]/50 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {STOCK_DETAIL_TEXT.back}
          </Button>
        </div>
      </div>
    );
  }

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 pr-4">
        {/* Back Button */}
        <Button
          onClick={() => navigate(`/portfolio/${portfolioId}`)}
          variant="outline"
          className="mb-6 border-[var(--accent)]/50 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {STOCK_DETAIL_TEXT.back}
        </Button>

        {/* Stock Header */}
        <div className="mb-8 rounded-[var(--radius)] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/40 p-5 sm:p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{stock.ticker}</h1>
                <Badge className="border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]" variant="outline">
                  {stock.sector}
                </Badge>
              </div>
              <p className="text-base sm:text-xl text-[var(--muted-text)]">{stock.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-[var(--card-border)]/80 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1">Current Value</p>
              <p className="text-3xl sm:text-4xl font-bold tabular-nums">${stock.price.toFixed(2)}</p>
            </div>
            <div className="rounded-md border border-[var(--card-border)]/80 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1">Daily Change</p>
              <div className="flex items-center gap-2 text-xl sm:text-2xl text-[var(--accent)] font-semibold tabular-nums">
              {isPositive ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
              <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_1px_minmax(0,1fr)] gap-6 lg:gap-8">
          {/* Left Column - Chart and Description */}
          <div className="space-y-6">
            {/* Chart */}
            <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.priceChart}</CardTitle>
              </CardHeader>
              <CardContent>
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
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-xl transition-transform duration-300 ease-in-out z-40 ${
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
