import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { StockData } from '../types';

interface StockDetailSummaryProps {
  stock: StockData;
  backLabel: string;
  onBack: () => void;
}

export const StockDetailSummary: React.FC<StockDetailSummaryProps> = ({
  stock,
  backLabel,
  onBack,
}) => {
  return (
    <>
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-4 sm:mb-5 rounded-full border-white/15 bg-black/25 px-4 text-[var(--foreground)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)] hover:text-black"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {backLabel}
      </Button>

      <div className="relative mb-8 overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/40 px-5 py-6 sm:px-7 sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_42%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              {stock.name}
            </h1>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:min-w-[360px]">
            <div className="flex min-h-[96px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                Type
              </p>
              <p className="mt-2 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                {stock.sector}
              </p>
            </div>
            <div className="flex min-h-[96px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                Current Price
              </p>
              <p className="mt-2 text-xl font-semibold tabular-nums text-[var(--foreground)] sm:text-2xl">
                ${stock.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
