import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { StockData } from '@/constants/stockData';

interface StockCardProps {
  stock: StockData;
  onViewDetails: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onViewDetails }) => {
  const isPositive = stock.changePercent >= 0;

  return (
    <Card className="h-full flex flex-col border-2 border-white/15 bg-[var(--card-bg)]/95 transition-all duration-300 hover:border-[var(--accent)]/60 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
      <CardHeader className="pb-3 border-b border-white/10">
        <CardTitle className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{stock.ticker}</CardTitle>
        <p className="text-sm text-[var(--muted-text)] leading-snug truncate">{stock.name}</p>
      </CardHeader>

      <CardContent className="pt-4 flex flex-1 flex-col gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1">Current Value</p>
          <p className="text-3xl font-bold tabular-nums text-[var(--foreground)]">${stock.price.toFixed(2)}</p>
        </div>

        <div
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-semibold tabular-nums ${
            isPositive
              ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'border-red-300/40 bg-red-300/10 text-red-300'
          }`}
        >
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>
            {isPositive ? '+' : ''}
            {stock.change.toFixed(2)} ({isPositive ? '+' : ''}
            {stock.changePercent.toFixed(2)}%)
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full mt-auto border-[var(--accent)]/50 text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black"
          onClick={onViewDetails}
        >
          View Analysis
        </Button>
      </CardContent>
    </Card>
  );
};
