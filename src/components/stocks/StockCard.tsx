import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { StockData } from '@/constants/stockData';

interface StockCardProps {
  stock: StockData;
  onViewDetails: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onViewDetails }) => {
  const isPositive = stock.changePercent >= 0;
  
  const getRecommendationColor = (rec: string) => {
    if (rec.includes('Buy')) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (rec.includes('Sell')) return 'bg-red-500/20 text-red-400 border-red-500/50';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
  };

  return (
    <Card className="hover:bg-accent/50 transition-all duration-300 cursor-pointer" onClick={onViewDetails}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-1">{stock.ticker}</CardTitle>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className="text-xs">
              {stock.sector}
            </Badge>
            <Badge className={`text-xs font-semibold ${getRecommendationColor(stock.recommendation)}`}>
              {stock.recommendation}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Price Information */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="bg-accent/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Confidence Level</span>
            <span className="text-sm font-bold">{stock.confidence}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${stock.confidence >= 80 ? 'bg-green-500' : stock.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${stock.confidence}%` }}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-muted-foreground">Market Cap</div>
            <div className="font-semibold">{stock.keyMetrics.marketCap}</div>
          </div>
          <div>
            <div className="text-muted-foreground">P/E Ratio</div>
            <div className="font-semibold">{stock.keyMetrics.peRatio}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Dividend</div>
            <div className="font-semibold">{stock.keyMetrics.dividend}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Beta</div>
            <div className="font-semibold">{stock.keyMetrics.beta}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {stock.description}
        </p>

        {/* View Details Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analysis
        </Button>
      </CardContent>
    </Card>
  );
};
