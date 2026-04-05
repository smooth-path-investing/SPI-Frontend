import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { OfferType } from '@/features/auth';
import { StockOfferCard } from './StockOfferCard';

interface StockOffersDialogProps {
  isOpen: boolean;
  selectedOffer: OfferType | null;
  onOpenChange: (open: boolean) => void;
  onSelectOffer: (offer: OfferType) => void;
}

export const StockOffersDialog: React.FC<StockOffersDialogProps> = ({
  isOpen,
  selectedOffer,
  onOpenChange,
  onSelectOffer,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl rounded-3xl border-2 border-[#3f4654] bg-[var(--card-bg)] px-5 sm:px-8 py-6 sm:py-8 [&>button]:right-4 sm:[&>button]:right-5 [&>button]:top-4 sm:[&>button]:top-5 [&>button]:h-auto [&>button]:w-auto [&>button]:rounded-none [&>button]:border-0 [&>button]:bg-transparent [&>button]:text-[var(--muted-text)] [&>button]:opacity-100 [&>button]:shadow-none [&>button:hover]:bg-transparent [&>button:hover]:text-[var(--foreground)] [&>button:focus-visible]:ring-2 [&>button:focus-visible]:ring-[var(--accent)]/55 [&>button:focus-visible]:ring-offset-0 [&>button[data-state=open]]:bg-transparent [&>button[data-state=open]]:text-[var(--muted-text)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--accent)]/12 to-transparent"
        />

        <DialogHeader className="space-y-2 sm:space-y-3 text-left">
          <p className="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.11em] text-[var(--accent)]">
            Subscription Bundles
          </p>
          <DialogTitle className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] leading-tight">
            Choose Your Bundle
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-sm sm:text-base text-[var(--muted-text)] leading-relaxed">
            Select the plan you want to unlock for SPI stock access.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <StockOfferCard
            offer="tickers"
            selectedOffer={selectedOffer}
            onSelect={onSelectOffer}
            title="Stock Tickers Only"
            description="Ideal if you only want quarterly SPI ticker picks."
            badgeLabel="Offer 1"
            pricingLabel="Price"
            pricingContent={
              <p className="text-3xl font-bold text-[var(--accent)]">
                $10.99
                <span className="text-sm font-medium text-[var(--muted-text)]"> / month</span>
              </p>
            }
            features={[
              'Full quarterly ticker list access',
              'View individual stock analysis pages',
            ]}
          />

          <StockOfferCard
            offer="hf"
            selectedOffer={selectedOffer}
            onSelect={onSelectOffer}
            title="HF Subscription"
            description="Hedge-fund style subscription model with performance-based fees."
            badgeLabel="Offer 2"
            pricingLabel="Fees"
            pricingContent={
              <>
                <p className="text-2xl font-bold text-[var(--accent)]">2% fee per annum</p>
                <p className="text-base font-semibold text-[var(--foreground)] mt-1">
                  + 20% management fee on profit
                </p>
              </>
            }
            features={[
              'Structured for long-term managed exposure',
              'Performance fee applies only on profits',
            ]}
          />
        </div>

        <div className="mt-5 rounded-xl border border-[#3f4654] bg-black/20 px-4 py-3 text-xs sm:text-sm text-[var(--muted-text)]">
          Select any offer to continue. Payment integration and activation are coming soon.
        </div>
      </DialogContent>
    </Dialog>
  );
};
