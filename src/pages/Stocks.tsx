import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/sectionHeaders/reusableHeaders/sectionHeader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getStocksForPortfolio } from '@/constants/stockData';
import { Check, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/ui/auth-modal';

interface StockList {
  id: string;
  title: string;
  accentLineClass: string;
  headerKickerClass: string;
  titleClass: string;
}

type OfferType = 'tickers' | 'hf';

const STOCK_LIST: StockList = {
  id: 'long-contrarian',
  title: 'Current stock picks',
  accentLineClass: 'from-white via-white/85 to-transparent',
  headerKickerClass: 'text-[var(--accent)]',
  titleClass: 'text-[var(--foreground)]',
};

export const Stocks: React.FC = () => {
  const { isAuthenticated, hasPurchasedPortfolio, canAccessPremiumStocks, login, signup } = useAuth();
  const navigate = useNavigate();
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | null>(null);
  const stockPreview = useMemo(() => getStocksForPortfolio('long-contrarian'), []);
  const isSubscribed = hasPurchasedPortfolio(STOCK_LIST.id) || canAccessPremiumStocks();

  const handlePrimaryAction = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isSubscribed) {
      navigate('/portfolio');
      return;
    }

    setIsOffersModalOpen(true);
  };

  const handleOfferSelection = (offer: OfferType) => {
    setSelectedOffer(offer);
    setIsOffersModalOpen(false);
    navigate('/portfolio');
  };

  const primaryButtonText = !isAuthenticated
    ? 'Login to Continue'
    : isSubscribed
    ? 'View Stock List'
    : 'View Offers';

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionHeader
          mainText="SPI Stock Selection"
          subText="build your portfolio with our 10 recommended stocks every quarter"
        />

        <section className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
          <div className="relative mx-auto w-full max-w-xl md:max-w-none">
            <header className="mb-3 sm:mb-4">
              <p className={`hidden sm:block text-xs uppercase tracking-[0.14em] mb-1 ${STOCK_LIST.headerKickerClass}`}>
                Stock Profile
              </p>
              <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${STOCK_LIST.titleClass}`}>
                {STOCK_LIST.title}
              </h2>
            </header>

            <article className="rounded-[var(--radius)] border-2 border-white/20 bg-gradient-to-b from-[var(--card-bg)] to-black/70 p-4 sm:p-7 shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition-all duration-300 hover:border-[var(--card-hover)]/70 hover:shadow-[0_18px_32px_rgba(0,0,0,0.26)]">
              <div className={`h-[2px] w-full mb-5 sm:mb-6 rounded-full bg-gradient-to-r ${STOCK_LIST.accentLineClass}`} />

              <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 p-1.5 sm:p-2 text-[var(--accent)]">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <div className="mb-5 rounded-xl border border-white/15 bg-black/30 p-3.5 sm:p-4">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.11em] text-[var(--muted-text)] mb-3">
                  Stock Preview
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 blur-[4px] select-none pointer-events-none">
                  {stockPreview.map((stock) => (
                    <div
                      key={stock.ticker}
                      className="rounded-md border border-white/20 bg-black/45 px-2.5 py-2 min-h-[54px]"
                    >
                      <p className="text-sm sm:text-base font-semibold text-[var(--foreground)] leading-tight">
                        {stock.ticker}
                      </p>
                      <p className="text-[11px] text-[var(--muted-text)] leading-snug line-clamp-2">
                        {stock.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handlePrimaryAction}
                className="w-full h-10 sm:h-11 bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)] font-semibold"
              >
                {primaryButtonText}
              </Button>
            </article>
          </div>
        </section>
      </div>

      <Dialog
        open={isOffersModalOpen}
        onOpenChange={(open) => {
          setIsOffersModalOpen(open);
          if (!open) setSelectedOffer(null);
        }}
      >
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
            <button
              type="button"
              aria-pressed={selectedOffer === 'tickers'}
              onClick={() => handleOfferSelection('tickers')}
              className={`h-full text-left rounded-2xl border bg-black/25 p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-colors ${
                selectedOffer === 'tickers'
                  ? 'border-white'
                  : 'border-[#3f4654] hover:border-white/55'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-1.5">
                    Stock Tickers Only
                  </h3>
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed">
                    Ideal if you only want quarterly SPI ticker picks.
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.11em] text-[var(--accent)]">
                  Offer 1
                </span>
              </div>

              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1.5">Price</p>
                <p className="text-3xl font-bold text-[var(--accent)]">
                  $10.99
                  <span className="text-sm font-medium text-[var(--muted-text)]"> / month</span>
                </p>
              </div>

              <div className="mt-5 space-y-2.5">
                <div className="flex items-start gap-2 text-sm text-[var(--muted-text)]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  Full quarterly ticker list access
                </div>
                <div className="flex items-start gap-2 text-sm text-[var(--muted-text)]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  View individual stock analysis pages
                </div>
              </div>
            </button>

            <button
              type="button"
              aria-pressed={selectedOffer === 'hf'}
              onClick={() => handleOfferSelection('hf')}
              className={`h-full text-left rounded-2xl border bg-black/25 p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-colors ${
                selectedOffer === 'hf'
                  ? 'border-white'
                  : 'border-[#3f4654] hover:border-white/55'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-1.5">
                    HF Subscription
                  </h3>
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed">
                    Hedge-fund style subscription model with performance-based fees.
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.11em] text-[var(--accent)]">
                  Offer 2
                </span>
              </div>

              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1.5">Fees</p>
                <p className="text-2xl font-bold text-[var(--accent)]">2% fee per annum</p>
                <p className="text-base font-semibold text-[var(--foreground)] mt-1">+ 20% management fee on profit</p>
              </div>

              <div className="mt-5 space-y-2.5">
                <div className="flex items-start gap-2 text-sm text-[var(--muted-text)]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  Structured for long-term managed exposure
                </div>
                <div className="flex items-start gap-2 text-sm text-[var(--muted-text)]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  Performance fee applies only on profits
                </div>
              </div>
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-[#3f4654] bg-black/20 px-4 py-3 text-xs sm:text-sm text-[var(--muted-text)]">
            Select any offer to continue. Payment integration and activation are coming soon.
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />
    </div>
  );
};
