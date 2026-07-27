import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AccentPill, FeatureSurface } from '@/components/ui/feature-surface';

interface OptionCardProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ eyebrow, title, description, ctaLabel, to }) => (
  <FeatureSurface className="flex h-full flex-col">
    <div className="flex h-full flex-col px-6 py-8 sm:px-8 sm:py-10">
      <AccentPill className="mb-4">{eyebrow}</AccentPill>
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
        {description}
      </p>
      <Button
        asChild
        className="mt-8 h-11 w-full border border-[var(--accent)] bg-[var(--accent)] font-semibold text-black hover:bg-[var(--accent-light)] sm:w-fit sm:px-6"
      >
        <Link to={to}>
          {ctaLabel}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </FeatureSurface>
);

export const StockInvestingLanding: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <AccentPill className="mx-auto mb-4">Choose Your Path</AccentPill>
          <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            How would you like to invest?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
            Pick individual stocks with our quarterly picks, or let the Smooth Path hedge fund
            invest on your behalf.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2">
          <OptionCard
            eyebrow="Self-Directed"
            title="Stock Investing"
            description="Access our quarterly stock picks, model confidence scores, and the reasoning behind every recommendation — then trade them yourself."
            ctaLabel="Explore Stock Investing"
            to="/stock-investing"
          />
          <OptionCard
            eyebrow="Managed"
            title="Hedge Fund Investing"
            description="Subscribe to invest directly in the Smooth Path hedge fund and let our quantitative strategy manage the portfolio for you."
            ctaLabel="Explore Hedge Fund Investing"
            to="/hedge-fund-investing"
          />
        </div>
      </div>
    </div>
  );
};

export default StockInvestingLanding;
