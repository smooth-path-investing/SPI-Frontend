
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
    <div className={`${height} ${className} bg-card rounded-lg border border-border flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-foreground" />
        </div>
        <p className="text-foreground font-medium">
          {ticker ? `${ticker} Chart` : 'Performance Chart'}
        </p>
        <p className="text-muted-foreground text-sm mt-1">Coming Soon</p>
      </div>
    </div>
  );
};
