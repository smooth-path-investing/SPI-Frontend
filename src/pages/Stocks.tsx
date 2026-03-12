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
import { STOCK_PREVIEW_SAMPLE } from '@/constants/stockPreviewSample';
import { StockCard } from '@/components/stocks/StockCard';
import { Check } from 'lucide-react';
import { useAuth, type OfferType } from '@/hooks/useAuth';
import { AuthModal } from '@/components/ui/auth-modal';

interface StockList {
  id: string;
  title: string;
  accentLineClass: string;
  headerKickerClass: string;
  titleClass: string;
}

const STOCK_LIST: StockList = {
  id: 'long-contrarian',
  title: 'Current stock picks',
  accentLineClass: 'from-white via-white/85 to-transparent',
  headerKickerClass: 'text-[var(--accent)]',
  titleClass: 'text-[var(--foreground)]',
};

export const Stocks: React.FC = () => {
  const {
    isAuthenticated,
    hasPurchasedPortfolio,
    canAccessPremiumStocks,
    login,
    signup,
    purchaseOffer,
  } = useAuth();
  const navigate = useNavigate();
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | null>(null);
  const stockPreview = useMemo(
    () =>
      getStocksForPortfolio('long-contrarian').filter(
        (stock) => stock.ticker !== STOCK_PREVIEW_SAMPLE.ticker,
      ),
    [],
  );
  const isSubscribed = hasPurchasedPortfolio(STOCK_LIST.id) || canAccessPremiumStocks();

  const handlePrimaryAction = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isSubscribed) {
      // TODO(subscription-flow): keep this direct navigation while payment is pending.
      // Later, replace with your real entitlement check (backend) before routing.
      navigate('/portfolio');
      return;
    }

    setIsOffersModalOpen(true);
  };

  const handleOfferSelection = (offer: OfferType) => {
    setSelectedOffer(offer);
    purchaseOffer(offer, STOCK_LIST.id);
    setIsOffersModalOpen(false);
    // TODO(subscription-flow): temporary behavior requested by product.
    // Selecting ANY bundle unlocks immediate access to the unblurred ticker page.
    // Replace this with payment + plan activation once backend is ready.
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
          mainText="Current Stock Picks"
          subText="build your portfolio with our 10 recommended stocks every quarter"
        />

        <section className="grid grid-cols-1 gap-6 sm:gap-7 max-w-4xl mx-auto">
          <div>
            <div className="mb-3 sm:mb-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.11em] text-[var(--accent)] mb-1.5">
                Open Sample
              </p>
              <p className="text-sm sm:text-base text-[var(--muted-text)]">
                Open one sample analysis now.
              </p>
            </div>

            <StockCard
              stock={STOCK_PREVIEW_SAMPLE}
              onViewDetails={() => navigate(`/stock/${STOCK_PREVIEW_SAMPLE.ticker}`)}
              clickable
            />
          </div>

          <div>
            <div className="mb-3 sm:mb-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.11em] text-[var(--accent)] mb-1.5">
                Locked Tickers
              </p>
              <p className="text-sm sm:text-base text-[var(--muted-text)]">
                The remaining SPI picks stay locked until purchase.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 max-w-5xl mx-auto">
              {stockPreview.map((stock) => (
                <StockCard
                  key={stock.ticker}
                  stock={stock}
                  onViewDetails={() => {}}
                  blurred
                  disableViewAnalysis
                />
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <Button
              onClick={handlePrimaryAction}
              className="w-full h-10 sm:h-11 bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)] font-semibold"
            >
              {primaryButtonText}
            </Button>
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
                <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1.5">
                  Price
                </p>
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
                selectedOffer === 'hf' ? 'border-white' : 'border-[#3f4654] hover:border-white/55'
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
                <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1.5">
                  Fees
                </p>
                <p className="text-2xl font-bold text-[var(--accent)]">2% fee per annum</p>
                <p className="text-base font-semibold text-[var(--foreground)] mt-1">
                  + 20% management fee on profit
                </p>
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
