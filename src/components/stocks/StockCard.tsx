import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { StockData } from '@/features/stocks';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: StockData;
  onViewDetails: () => void;
  blurred?: boolean;
  disableViewAnalysis?: boolean;
  clickable?: boolean;
  tickerClassName?: string;
  compact?: boolean;
  cardClassName?: string;
}

export const StockCard: React.FC<StockCardProps> = ({
  stock,
  onViewDetails,
  blurred = false,
  disableViewAnalysis = false,
  clickable = false,
  tickerClassName,
  compact = false,
  cardClassName,
}) => {
  const isInteractive = clickable && !disableViewAnalysis && !blurred;

  return (
    <Card
      className={cn(
        'relative w-full min-h-[116px] overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-b from-[var(--card-bg)] to-black/35 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[var(--accent)]/60 hover:shadow-[0_18px_38px_rgba(0,0,0,0.24)]',
        isInteractive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 focus-visible:ring-offset-0',
        compact && 'min-h-[94px] lg:min-h-[98px]',
        cardClassName,
      )}
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />
      <CardContent className={cn('relative p-4 sm:p-5', compact && 'p-3.5 sm:p-4 lg:p-4')}>
        {/* TODO(subscription-flow): this wrapper controls lock-state visuals.
            Keep `blurred` + pointer lock for gated ticker previews. */}
        <div
          className={cn(
            'flex items-center justify-between gap-3 sm:gap-4',
            compact && 'gap-2.5 sm:gap-3 lg:gap-2.5',
            blurred && 'blur-[4px] pointer-events-none select-none',
          )}
        >
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'text-xl font-bold tracking-tight text-[var(--accent)] sm:text-2xl',
                compact && 'text-[1.15rem] sm:text-xl lg:text-[1.35rem]',
                tickerClassName,
              )}
            >
              {stock.ticker}
            </p>
            <p
              className={cn(
                'overflow-hidden whitespace-nowrap text-ellipsis text-xs text-[var(--muted-text)] sm:text-sm',
                compact && 'text-[11px] sm:text-[13px] lg:text-[13px]',
              )}
            >
              {stock.name}
            </p>
          </div>

          <Button
            variant="outline"
            className={cn(
              'h-9 shrink-0 rounded-full border-[var(--accent)]/45 bg-black/20 px-3.5 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black sm:h-10 sm:px-4 disabled:cursor-not-allowed disabled:opacity-55',
              compact && 'h-8 px-3 text-[11px] sm:h-9 sm:px-3.5 sm:text-xs lg:h-8 lg:px-3',
            )}
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
