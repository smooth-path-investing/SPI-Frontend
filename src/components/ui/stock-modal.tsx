
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
      <DialogContent className="max-w-4xl bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <div>
              <span className="text-foreground">{stock.ticker}</span>
              <span className="ml-3 text-lg text-muted-foreground">{stock.name}</span>
            </div>
            {stock.price && (
              <div className="text-right">
                <div className="text-2xl font-bold">${stock.price}</div>
                <div className={`text-sm ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change && stock.changePercent && (
                    `${stock.change > 0 ? '+' : ''}${stock.change} (${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%)`
                  )}
                </div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <StockGraphPlaceholder height="h-72" ticker={stock.ticker} />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Why We Selected This Stock</h3>
              <ul className="space-y-2">
                {stock.reason.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Key Indicators</h3>
              <div className="space-y-2">
                {stock.indicators.map((indicator, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-secondary text-secondary-foreground">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-muted border border-border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-foreground mr-2" />
              <span className="text-foreground font-semibold">Real-time Data Coming Soon</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Live price updates, real-time indicators, and enhanced analytics will be available in our next release.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
