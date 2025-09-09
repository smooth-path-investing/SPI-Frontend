import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { IStock } from '../../types';

interface FeaturedPicksProps {
  stocks: IStock[];
  onStockClick: (stock: IStock) => void;
}

export const FeaturedPicks: React.FC<FeaturedPicksProps> = ({ stocks, onStockClick }) => {
  const featuredStocks = stocks.slice(0, 2);

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Featured Picks</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {featuredStocks.map((stock, index) => (
          <Card 
            key={index}
            className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => onStockClick(stock)}
          >
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-3xl font-bold text-foreground">{stock.ticker}</h3>
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg">{stock.name}</p>
                </div>
                {stock.price && (
                  <div className="text-right">
                    <div className="text-2xl font-bold">${stock.price}</div>
                    <div className={`text-lg ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.changePercent && (
                        `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%`
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Investment Thesis</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {stock.reason[0]} Our analysis shows strong fundamentals combined with attractive valuation metrics.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Catalysts</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {stock.indicators.slice(0, 4).map((indicator, indicatorIndex) => (
                      <Badge 
                        key={indicatorIndex} 
                        variant="secondary" 
                        className="text-xs bg-secondary text-secondary-foreground justify-center"
                      >
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent">
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};