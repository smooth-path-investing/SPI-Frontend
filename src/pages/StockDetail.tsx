import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, MessageSquare, X } from 'lucide-react';
import { StockGraphPlaceholder } from '@/components/ui/stock-graph-placeholder';
import { MetricRow } from '@/components/stock/MetricRow';
import { getStocksForPortfolio } from '@/constants/stockData';

const STOCK_DETAIL_TEXT = {
  back: 'Back to Portfolio',
  notFound: 'Stock not found',
  priceChart: 'Price Chart',
  about: 'About',
  keyFactors: 'Key Predictive Factors',
  keyFactorsDescription:
    'Our proprietary algorithm identified these factors as the most significant predictors for this stock:',
  keyMetrics: 'Key Metrics',
  marketCap: 'Market Cap',
  peRatio: 'P/E Ratio',
  dividendYield: 'Dividend Yield',
  beta: 'Beta',
  modelPerformance: 'Model Performance',
  predictionAccuracy: 'Prediction Accuracy',
  rSquared: 'R-Squared',
  confidenceLevel: 'Confidence Level',
  recommendation: 'Recommendation',
  rating: 'Rating',
  askAiAbout: 'Ask AI About',
  aiComingSoon: 'AI Chatbot - Coming Soon',
};

export const StockDetail: React.FC = () => {
  const { portfolioId, ticker } = useParams<{ portfolioId: string; ticker: string }>();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const stocks = portfolioId ? getStocksForPortfolio(portfolioId) : [];
  const stock = stocks.find(s => s.ticker === ticker);

  if (!stock) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-muted-foreground">{STOCK_DETAIL_TEXT.notFound}</p>
          <Button 
            onClick={() => navigate(`/portfolio/${portfolioId}`)}
            className="mt-4 mx-auto block"
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
    <div className="min-h-screen bg-background text-foreground pt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pr-4">
        {/* Back Button */}
        <Button 
          onClick={() => navigate(`/portfolio/${portfolioId}`)}
          variant="outline"
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {STOCK_DETAIL_TEXT.back}
        </Button>

        {/* Stock Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{stock.ticker}</h1>
                <Badge variant="outline">{stock.sector}</Badge>
              </div>
              <p className="text-xl text-muted-foreground">{stock.name}</p>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="text-5xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center gap-2 text-xl ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
              <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.priceChart}</CardTitle>
              </CardHeader>
              <CardContent>
                <StockGraphPlaceholder height="h-96" ticker={stock.ticker} />
              </CardContent>
            </Card>

            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.about} {stock.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {stock.description}
                </p>
              </CardContent>
            </Card>

            {/* Key Factors */}
            <Card>
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.keyFactors}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {STOCK_DETAIL_TEXT.keyFactorsDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stock.factors.map((factor, index) => (
                    <Badge key={index} variant="secondary">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Key Metrics */}
          <div className="space-y-6">
            {/* Key Metrics Card */}
            <Card>
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.keyMetrics}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricRow
                  label={STOCK_DETAIL_TEXT.marketCap}
                  value={stock.keyMetrics.marketCap}
                />
                <MetricRow
                  label={STOCK_DETAIL_TEXT.peRatio}
                  value={stock.keyMetrics.peRatio}
                />
                <MetricRow
                  label={STOCK_DETAIL_TEXT.dividendYield}
                  value={stock.keyMetrics.dividend}
                />
                <MetricRow
                  label={STOCK_DETAIL_TEXT.beta}
                  value={stock.keyMetrics.beta}
                  hasBorder={false}
                />
              </CardContent>
            </Card>

            {/* Model Performance */}
            <Card>
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.modelPerformance}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricRow
                  label={STOCK_DETAIL_TEXT.predictionAccuracy}
                  value="87.3%"
                  valueClassName="font-semibold text-green-400"
                />
                <MetricRow
                  label={STOCK_DETAIL_TEXT.rSquared}
                  value="0.762"
                />
                <MetricRow
                  label={STOCK_DETAIL_TEXT.confidenceLevel}
                  value="High"
                  valueClassName="font-semibold text-green-400"
                  hasBorder={false}
                />
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>{STOCK_DETAIL_TEXT.recommendation}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricRow
                  label={STOCK_DETAIL_TEXT.rating}
                  value={
                    <Badge 
                      variant={
                        stock.recommendation.includes('Buy') ? 'default' : 
                        stock.recommendation.includes('Sell') ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {stock.recommendation}
                    </Badge>
                  }
                />
                <div className="py-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{STOCK_DETAIL_TEXT.confidenceLevel}</span>
                    <span className="font-semibold">{stock.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${stock.confidence}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>

      {/* Chatbot Sidebar */}
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-card border-l border-border shadow-xl transition-transform duration-300 ease-in-out z-40 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">{STOCK_DETAIL_TEXT.askAiAbout} {stock.ticker}</h3>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-muted-foreground">{STOCK_DETAIL_TEXT.aiComingSoon}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
