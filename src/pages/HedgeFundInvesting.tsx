import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AccentPill, FeatureSurface } from '@/components/ui/feature-surface';

const INFO_ROWS = [
  {
    label: 'Subscription document',
    value: 'Coming soon — a formal subscription agreement will be posted here to review and sign.',
  },
  {
    label: 'Fees & charges',
    value: 'Published alongside the subscription document once finalized.',
  },
  {
    label: 'Lock period & withdrawals',
    value: 'Lock-up terms and withdrawal notice periods will be detailed in the subscription document.',
  },
  {
    label: 'What you get once subscribed',
    value: 'Full access to the app, the current stock list, and your watchlist.',
  },
];

export const HedgeFundInvesting: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Button
          asChild
          variant="outline"
          className="mb-6 rounded-full border-white/15 bg-black/25 px-4 text-[var(--foreground)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)] hover:text-black"
        >
          <Link to="/stock">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <FeatureSurface>
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <AccentPill className="mb-4">Managed</AccentPill>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Hedge Fund Investing
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
              Subscribe to invest directly in the Smooth Path hedge fund. Our quantitative
              strategy manages the portfolio on your behalf — no need to place trades yourself.
            </p>

            <div className="mt-8 space-y-4">
              {INFO_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
                    {row.label}
                  </p>
                  <p className="mt-1.5 text-sm text-[var(--foreground)]/90">{row.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs leading-relaxed text-[var(--muted-text)]/70">
              This page is a preview. Nothing here is an offer to sell securities — subscribing
              requires reviewing and signing the formal subscription document, which is being
              finalized.
            </p>
          </div>
        </FeatureSurface>
      </div>
    </div>
  );
};

export default HedgeFundInvesting;
