
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { StockGraphPlaceholder } from './stock-graph-placeholder';
import { IStock } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface StockModalProps {
  stock: IStock | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StockModal: React.FC<StockModalProps> = ({ stock, isOpen, onClose }) => {
  if (!stock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border text-foreground w-[calc(100%-32px)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <span className="text-foreground">{stock.ticker}</span>
              <span className="ml-2 text-base sm:text-lg text-muted-foreground">{stock.name}</span>
            </div>
            {stock.price && (
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold">${stock.price}</div>
                <div className={`text-xs sm:text-sm ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change && stock.changePercent && (
                    `${stock.change > 0 ? '+' : ''}${stock.change} (${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%)`
                  )}
                </div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <StockGraphPlaceholder height="h-56 sm:h-72" ticker={stock.ticker} />

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Why We Selected This Stock</h3>
              <ul className="space-y-2">
                {stock.reason.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 sm:mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Key Indicators</h3>
              <div className="flex flex-wrap gap-2">
                {stock.indicators.map((indicator, index) => (
                  <Badge key={index} variant="secondary" className="text-xs sm:text-sm bg-secondary text-secondary-foreground">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-muted border border-border rounded-lg p-3 sm:p-4 text-sm sm:text-base">
            <div className="flex items-center mb-1 sm:mb-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-foreground mr-2" />
              <span className="text-foreground font-semibold">Real-time Data Coming Soon</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Live price updates, real-time indicators, and enhanced analytics will be available in our next release.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
