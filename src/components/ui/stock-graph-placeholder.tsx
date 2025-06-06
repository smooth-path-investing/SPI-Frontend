
import React from 'react';

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
    <div className={`${height} ${className} bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/20 flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-white font-medium">
          {ticker ? `${ticker} Chart` : 'Performance Chart'}
        </p>
        <p className="text-white/60 text-sm mt-1">Coming Soon</p>
      </div>
    </div>
  );
};
