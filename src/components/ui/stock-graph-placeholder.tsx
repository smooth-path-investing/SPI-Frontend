
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface StockGraphPlaceholderProps {
  height?: string;
  ticker?: string;
  className?: string;
}

export const StockGraphPlaceholder: React.FC<StockGraphPlaceholderProps> = ({ 
  height = 'h-64', 
  ticker = '',
  className = '' 
}) => {
  return (
    <div
      className={`${height} ${className} rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center`}
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-black/20 border border-[var(--card-border)] rounded-lg flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-[var(--accent)]" />
        </div>
        <p className="text-[var(--foreground)] font-medium">
          {ticker ? `${ticker} Analysis` : 'Smooth Path Logo'}
        </p>
        <p className="text-[var(--muted-text)] text-sm mt-1">Coming Soon</p>
      </div>
    </div>
  );
};
