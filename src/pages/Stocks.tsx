import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getStocksForPortfolio } from '@/constants/stockData';
import { STOCK_PREVIEW_SAMPLE } from '@/constants/stockPreviewSample';
import { StockCard } from '@/components/stocks/StockCard';
import { AuthModal, type OfferType, useAuth } from '@/features/auth';
import { DEFAULT_PORTFOLIO_ID, StockOffersDialog } from '@/features/stocks';
import { AccentPill, FeatureSurface } from '@/components/ui/feature-surface';

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
      getStocksForPortfolio(DEFAULT_PORTFOLIO_ID).filter(
        (stock) => stock.ticker !== STOCK_PREVIEW_SAMPLE.ticker,
      ),
    [],
  );
  const isSubscribed = hasPurchasedPortfolio(DEFAULT_PORTFOLIO_ID) || canAccessPremiumStocks();

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
    purchaseOffer(offer, DEFAULT_PORTFOLIO_ID);
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
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />

      <div className="relative mx-auto max-w-[88rem] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <FeatureSurface className="mb-8">
          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <AccentPill className="mb-4">SPI Stock Access</AccentPill>
                <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Current Stock Picks
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
                  Build your portfolio with our 10 recommended stocks every quarter.
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:min-w-[340px]">
                <div className="flex min-h-[96px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                    Open Sample
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                    1 ticker
                  </p>
                </div>
                <div className="flex min-h-[96px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                    Locked Picks
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                    {stockPreview.length} tickers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FeatureSurface>

        <section className="grid w-full grid-cols-1 gap-6 sm:gap-7">
          <FeatureSurface>
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-4 sm:mb-5">
                <AccentPill className="mb-3">Open Sample</AccentPill>
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
          </FeatureSurface>

          <FeatureSurface>
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-4 sm:mb-5">
                <AccentPill className="mb-3">Locked Tickers</AccentPill>
                <p className="text-sm sm:text-base text-[var(--muted-text)]">
                  The remaining SPI picks stay locked until purchase.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-3">
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
          </FeatureSurface>

          <div className="mx-auto w-full max-w-sm">
            <Button
              onClick={handlePrimaryAction}
              className="h-11 w-full border border-[var(--accent)] bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-light)] sm:h-12"
            >
              {primaryButtonText}
            </Button>
          </div>
        </section>
      </div>

      <StockOffersDialog
        isOpen={isOffersModalOpen}
        selectedOffer={selectedOffer}
        onOpenChange={(open) => {
          setIsOffersModalOpen(open);
          if (!open) {
            setSelectedOffer(null);
          }
        }}
        onSelectOffer={handleOfferSelection}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />
    </div>
  );
};
