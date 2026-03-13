import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/sectionHeaders/reusableHeaders/sectionHeader';
import { getStocksForPortfolio } from '@/constants/stockData';
import { STOCK_PREVIEW_SAMPLE } from '@/constants/stockPreviewSample';
import { StockCard } from '@/components/stocks/StockCard';
import { AuthModal, type OfferType, useAuth } from '@/features/auth';
import { DEFAULT_PORTFOLIO_ID, StockOffersDialog } from '@/features/stocks';

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
