
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StockModal } from '../components/ui/stock-modal';
import { SAMPLE_STOCKS } from '../constants';
import { IStock } from '../types';
import { TrendingUp } from 'lucide-react';

export const Stocks: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStockClick = (stock: IStock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Recommended Stocks
          </h1>
          <p className="text-xl text-muted-foreground">
            Our AI-powered analysis has identified these high-potential opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_STOCKS.map((stock, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleStockClick(stock)}
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

          {/* Coming Soon Cards */}
          {Array.from({ length: 9 }).map((_, index) => (
            <Card key={`coming-soon-${index}`} className="bg-card border-border border-dashed">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  More curated picks being analyzed
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-muted rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            New stock recommendations are added weekly based on our latest analysis
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-secondary text-secondary-foreground">
              Analysis refreshed daily
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground">
              New picks weekly
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground">
              AI-powered selection
            </Badge>
          </div>
        </div>
      </div>

      <StockModal 
        stock={selectedStock} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};
