import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureSurface } from '@/components/ui/feature-surface';
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

      <FeatureSurface className="mb-8">
        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {stock.name}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
                {stock.description}
              </p>
            </div>

            <div className="w-full sm:max-w-xs lg:w-[240px]">
              <div className="flex min-h-[108px] flex-col justify-between rounded-[24px] border border-white/20 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                  Sector
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                  {stock.sector}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FeatureSurface>
    </>
  );
};
