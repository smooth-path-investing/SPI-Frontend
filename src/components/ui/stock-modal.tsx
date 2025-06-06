
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { StockGraphPlaceholder } from './stock-graph-placeholder';
import { IStock } from '../../types';

interface StockModalProps {
  stock: IStock | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StockModal: React.FC<StockModalProps> = ({ stock, isOpen, onClose }) => {
  if (!stock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <div>
              <span className="text-blue-400">{stock.ticker}</span>
              <span className="ml-3 text-lg text-gray-300">{stock.name}</span>
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
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Why We Selected This Stock</h3>
              <ul className="space-y-2">
                {stock.reason.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-400">Key Indicators</h3>
              <div className="space-y-2">
                {stock.indicators.map((indicator, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-purple-900/30 text-purple-300">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-yellow-400 font-semibold">Real-time Data Coming Soon</span>
            </div>
            <p className="text-yellow-300 text-sm">
              Live price updates, real-time indicators, and enhanced analytics will be available in our next release.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
