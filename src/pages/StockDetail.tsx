import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StockGraphPlaceholder } from '@/components/ui/stock-graph-placeholder';
import { getStocksForPortfolio } from '@/constants/stockData';

export const StockDetail: React.FC = () => {
  const { portfolioId, ticker } = useParams<{ portfolioId: string; ticker: string }>();
  const navigate = useNavigate();

  const stocks = portfolioId ? getStocksForPortfolio(portfolioId) : [];
  const stock = stocks.find(s => s.ticker === ticker);

  if (!stock) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-muted-foreground">Stock not found</p>
          <Button 
            onClick={() => navigate(`/portfolio/${portfolioId}`)}
            className="mt-4 mx-auto block"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          onClick={() => navigate(`/portfolio/${portfolioId}`)}
          variant="outline"
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
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
                <CardTitle>Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <StockGraphPlaceholder height="h-96" ticker={stock.ticker} />
              </CardContent>
            </Card>

            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {stock.name}</CardTitle>
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
                <CardTitle>Key Predictive Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our proprietary algorithm identified these factors as the most significant predictors for this stock:
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
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-semibold">{stock.keyMetrics.marketCap}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-semibold">{stock.keyMetrics.peRatio}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Dividend Yield</span>
                  <span className="font-semibold">{stock.keyMetrics.dividend}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Beta</span>
                  <span className="font-semibold">{stock.keyMetrics.beta}</span>
                </div>
              </CardContent>
            </Card>

            {/* Model Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Prediction Accuracy</span>
                  <span className="font-semibold text-green-400">87.3%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">R-Squared</span>
                  <span className="font-semibold">0.762</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Confidence Level</span>
                  <span className="font-semibold text-green-400">High</span>
                </div>
              </CardContent>
            </Card>

            {/* Trading Signal */}
            <Card className="border-green-500/50 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-400">Current Signal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">BUY</div>
                  <p className="text-sm text-muted-foreground">
                    Based on our multi-factor analysis and current market conditions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
