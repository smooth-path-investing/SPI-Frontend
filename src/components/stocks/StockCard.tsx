import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { StockData } from '@/features/stocks';

interface StockCardProps {
  stock: StockData;
  onViewDetails: () => void;
  blurred?: boolean;
  disableViewAnalysis?: boolean;
  clickable?: boolean;
  tickerClassName?: string;
}

export const StockCard: React.FC<StockCardProps> = ({
  stock,
  onViewDetails,
  blurred = false,
  disableViewAnalysis = false,
  clickable = false,
  tickerClassName,
}) => {
  const isInteractive = clickable && !disableViewAnalysis && !blurred;

  return (
    <Card
      className={`border-2 border-white/15 bg-[var(--card-bg)]/95 transition-all duration-300 hover:border-[var(--accent)]/60 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] ${
        isInteractive
          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 focus-visible:ring-offset-0'
          : ''
      }`}
      onClick={isInteractive ? onViewDetails : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onViewDetails();
              }
            }
          : undefined
      }
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <CardContent className="p-4 sm:p-5">
        {/* TODO(subscription-flow): this wrapper controls lock-state visuals.
            Keep `blurred` + pointer lock for gated ticker previews. */}
        <div
          className={`flex items-center justify-between gap-3 sm:gap-4 ${blurred ? 'blur-[4px] pointer-events-none select-none' : ''}`}
        >
          <div className="min-w-0 flex-1">
            <p
              className={`text-xl sm:text-2xl font-bold tracking-tight text-[var(--accent)] ${
                tickerClassName ?? ''
              }`}
            >
              {stock.ticker}
            </p>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] whitespace-nowrap overflow-hidden text-ellipsis">
              {stock.name}
            </p>
          </div>

          <Button
            variant="outline"
            className="shrink-0 h-9 px-3.5 sm:h-10 sm:px-4 border-[var(--accent)]/50 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black disabled:opacity-55 disabled:cursor-not-allowed"
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails();
            }}
            disabled={disableViewAnalysis}
          >
            View Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
