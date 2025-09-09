import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IStock } from '../../types';

interface StockRecommendationsProps {
  stocks: IStock[];
  onStockClick: (stock: IStock) => void;
}

export const StockRecommendations: React.FC<StockRecommendationsProps> = ({ stocks, onStockClick }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-foreground">All Current Recommendations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((stock, index) => (
          <Card 
            key={index} 
            className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => onStockClick(stock)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{stock.ticker}</h3>
                  <p className="text-muted-foreground text-sm">{stock.name}</p>
                </div>
                {stock.price && (
                  <div className="text-right">
                    <div className="text-lg font-bold">${stock.price}</div>
                    <div className={`text-sm ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.changePercent && (
                        `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%`
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Reasons</h4>
                  <ul className="space-y-1">
                    {stock.reason.slice(0, 2).map((reason, reasonIndex) => (
                      <li key={reasonIndex} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Top Indicators</h4>
                  <div className="flex flex-wrap gap-1">
                    {stock.indicators.slice(0, 2).map((indicator, indicatorIndex) => (
                      <Badge 
                        key={indicatorIndex} 
                        variant="secondary" 
                        className="text-xs bg-secondary text-secondary-foreground"
                      >
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Click for detailed analysis
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};