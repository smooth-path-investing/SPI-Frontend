import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PORTFOLIOS } from '@/constants/portfolios';
import { getStocksForPortfolio } from '@/constants/stockData';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft } from 'lucide-react';
import { StockCard } from '@/components/stocks/StockCard';
import { PortfolioMetricCard } from '@/components/portfolio/PortfolioMetricCard';
import { Calendar, Package } from 'lucide-react';
import { AuthModal, useAuth } from '@/features/auth';
import { buildPortfolioStockDetailPath } from '@/features/stocks';
import { AccentPill, FeatureSurface } from '@/components/ui/feature-surface';

const PORTFOLIO_DETAIL_TEXT = {
  back: 'Back to Portfolios',
  holdings: 'Total Holdings',
  rebalance: 'Rebalance',
  oneTimeFee: 'One-time access fee',
  purchaseAccess: 'Purchase Access',
  loginPurchase: 'Login to Purchase',
  currentHoldings: 'Current Holdings',
};

export const PortfolioDetail: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId?: string }>();
  const { isAuthenticated, login, signup, hasPurchasedPortfolio, canAccessPremiumStocks } =
    useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const resolvedPortfolioId = portfolioId ?? 'long-contrarian';

  const portfolio = PORTFOLIOS.find((p) => p.id === resolvedPortfolioId);

  useEffect(() => {
    if (!portfolio) {
      navigate('/stock');
    }
  }, [portfolio, navigate]);

  if (!portfolio) {
    return null;
  }

  const portfolioDisplayName =
    portfolio.id === 'long-contrarian' ? 'Current Stock Picks' : portfolio.name;
  const isPurchased = isAuthenticated && hasPurchasedPortfolio(portfolio.id);
  const canViewPortfolio = isAuthenticated && (isPurchased || canAccessPremiumStocks());

  const handleAccessRequest = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else if (!isPurchased) {
      // Show purchase flow (to be implemented later)
      alert(`Purchase flow for ${portfolioDisplayName} - Price: $${portfolio.price}`);
    }
  };

  if (!canViewPortfolio) {
    return (
      <>
        <div className="relative min-h-screen overflow-hidden bg-background pt-8 text-foreground sm:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
          />
          <div className="relative mx-auto max-w-[88rem] px-4 pb-20 pt-6 sm:px-6 sm:py-20 lg:px-8">
            <Button
              variant="outline"
              onClick={() => navigate('/stock')}
              className="mb-5 rounded-full border-white/15 bg-black/25 px-4 text-[var(--foreground)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)] hover:text-black"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {PORTFOLIO_DETAIL_TEXT.back}
            </Button>

            <FeatureSurface>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
                  <div>
                    <AccentPill className="mb-4">Portfolio Access</AccentPill>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                        <Lock className="h-5 w-5 text-[var(--accent)]" />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                        Access Required
                      </span>
                    </div>
                    <h1 className="text-3xl font-semibold leading-[0.96] tracking-tight text-white sm:text-5xl">
                      {portfolioDisplayName}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-text)] sm:text-lg">
                      {portfolio.description}
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
                      <PortfolioMetricCard
                        icon={Package}
                        label={PORTFOLIO_DETAIL_TEXT.holdings}
                        value={portfolio.holdings}
                      />
                      <PortfolioMetricCard
                        icon={Calendar}
                        label={PORTFOLIO_DETAIL_TEXT.rebalance}
                        value={portfolio.rebalanceFrequency}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-5 py-5 text-center shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-6">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                        {PORTFOLIO_DETAIL_TEXT.oneTimeFee}
                      </p>
                      <p className="mt-3 text-4xl font-bold text-[var(--accent)]">
                        ${portfolio.price}
                      </p>
                    </div>

                    <Button
                      onClick={handleAccessRequest}
                      size="lg"
                      className="h-12 border border-[var(--accent)] bg-[var(--accent)] text-base text-black hover:bg-[var(--accent-light)]"
                    >
                      {isAuthenticated
                        ? PORTFOLIO_DETAIL_TEXT.purchaseAccess
                        : PORTFOLIO_DETAIL_TEXT.loginPurchase}
                    </Button>
                  </div>
                </div>
              </div>
            </FeatureSurface>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={login}
          onSignup={signup}
        />
      </>
    );
  }

  // Purchased view - show actual portfolio content
  const stocks = getStocksForPortfolio(portfolio.id);
  // TODO(subscription-flow): set to `true` when you re-enable locked/blurred tickers.
  // Current requirement is to show all tickers unblurred after bundle selection.
  const shouldLockTickers = false;
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-8 text-foreground sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />

      <div className="relative z-10 mx-auto max-w-[88rem] px-4 pb-12 pt-4 sm:px-6 sm:py-20 lg:px-8">
        <FeatureSurface className="mb-8">
          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <AccentPill className="mb-4">SPI Portfolio</AccentPill>
                <h1 className="text-3xl font-semibold leading-[0.96] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {portfolioDisplayName}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted-text)] sm:text-base">
                  {portfolio.description}
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 xl:w-auto xl:min-w-[420px]">
                <PortfolioMetricCard
                  icon={Package}
                  label={PORTFOLIO_DETAIL_TEXT.holdings}
                  value={portfolio.holdings}
                />
                <PortfolioMetricCard
                  icon={Calendar}
                  label={PORTFOLIO_DETAIL_TEXT.rebalance}
                  value={portfolio.rebalanceFrequency}
                />
              </div>
            </div>
          </div>
        </FeatureSurface>

        <FeatureSurface>
          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3 lg:auto-rows-fr lg:gap-4">
              {stocks.map((stock, index) => {
                const shouldCenterLastCard = stocks.length % 3 === 1 && index === stocks.length - 1;

                return (
                  <div
                    key={stock.ticker}
                    className={shouldCenterLastCard ? 'lg:col-start-2' : undefined}
                  >
                    <StockCard
                      stock={stock}
                      // TODO(subscription-flow): use `blurred={shouldLockTickers}` when lock returns.
                      blurred={false}
                      disableViewAnalysis={shouldLockTickers}
                      cardClassName="border-white/35 hover:border-white/70"
                      tickerClassName="text-[var(--accent)]"
                      compact
                      onViewDetails={() =>
                        navigate(buildPortfolioStockDetailPath(portfolio.id, stock.ticker))
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </FeatureSurface>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onSignup={signup}
      />
    </div>
  );
};
