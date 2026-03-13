import React from 'react';
import { Check } from 'lucide-react';
import type { OfferType } from '@/features/auth';

interface StockOfferCardProps {
  offer: OfferType;
  selectedOffer: OfferType | null;
  title: string;
  description: string;
  badgeLabel: string;
  pricingLabel: string;
  pricingContent: React.ReactNode;
  features: string[];
  onSelect: (offer: OfferType) => void;
}

export const StockOfferCard: React.FC<StockOfferCardProps> = ({
  offer,
  selectedOffer,
  title,
  description,
  badgeLabel,
  pricingLabel,
  pricingContent,
  features,
  onSelect,
}) => {
  const isSelected = selectedOffer === offer;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(offer)}
      className={`h-full text-left rounded-2xl border bg-black/25 p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-colors ${
        isSelected ? 'border-white' : 'border-[#3f4654] hover:border-white/55'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-1.5">
            {title}
          </h3>
          <p className="text-sm text-[var(--muted-text)] leading-relaxed">{description}</p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.11em] text-[var(--accent)]">
          {badgeLabel}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1.5">
          {pricingLabel}
        </p>
        {pricingContent}
      </div>

      <div className="mt-5 space-y-2.5">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm text-[var(--muted-text)]">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
            {feature}
          </div>
        ))}
      </div>
    </button>
  );
};
