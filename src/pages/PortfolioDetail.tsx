import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PORTFOLIOS } from '@/constants/portfolios';
import { getStocksForPortfolio } from '@/constants/stockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, ArrowLeft } from 'lucide-react';
import { AuthModal } from '@/components/ui/auth-modal';
import { StockCard } from '@/components/stocks/StockCard';
import { PortfolioMetricCard } from '@/components/portfolio/PortfolioMetricCard';
import { useAuth } from '@/hooks/useAuth';
import { TrendingUp, Shield, Calendar, Package } from 'lucide-react';
import { SectionHeader } from '@/components/sectionHeaders/reusableHeaders/sectionHeader';

const PORTFOLIO_DETAIL_TEXT = {
  back: 'Back to Portfolios',
  expectedReturn: 'Expected Return',
  riskLevel: 'Risk Level',
  holdings: 'Total Holdings',
  rebalance: 'Rebalance',
  oneTimeFee: 'One-time access fee',
  purchaseAccess: 'Purchase Access',
  loginPurchase: 'Login to Purchase',
  currentHoldings: 'Current Holdings',
};

export const PortfolioDetail: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId?: string }>();
  const { isAuthenticated, login, signup, hasPurchasedPortfolio } = useAuth();
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

  const isPurchased = isAuthenticated && hasPurchasedPortfolio(portfolio.id);
  const isPreviewPortfolio = portfolio.id === 'long-contrarian';
  const canViewPortfolio = isPurchased || isPreviewPortfolio;

  const handleAccessRequest = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else if (!isPurchased) {
      // Show purchase flow (to be implemented later)
      alert(`Purchase flow for ${portfolio.name} - Price: $${portfolio.price}`);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'High':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!canViewPortfolio) {
    return (
      <>
        <div className="min-h-screen bg-background text-foreground pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Button variant="ghost" onClick={() => navigate('/stock')} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {PORTFOLIO_DETAIL_TEXT.back}
            </Button>

            <Card className="text-center">
              <CardContent className="p-12">
                <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">{portfolio.name}</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {portfolio.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                  <PortfolioMetricCard
                    icon={TrendingUp}
                    label={PORTFOLIO_DETAIL_TEXT.expectedReturn}
                    value={portfolio.expectedReturn}
                  />
                  <PortfolioMetricCard
                    icon={Shield}
                    label={PORTFOLIO_DETAIL_TEXT.riskLevel}
                    value={
                      <Badge className={getRiskColor(portfolio.riskLevel)} variant="outline">
                        {portfolio.riskLevel}
                      </Badge>
                    }
                  />
                  <PortfolioMetricCard
                    icon={Package}
                    label={PORTFOLIO_DETAIL_TEXT.holdings}
                    value={portfolio.holdings}
                  />
                  <PortfolioMetricCard
                    icon={Calendar}
                    label={PORTFOLIO_DETAIL_TEXT.rebalance}
                    value={portfolio.rebalanceFrequency}
                    className="text-sm"
                  />
                </div>

                <div className="bg-accent/50 p-6 rounded-lg mb-8 max-w-md mx-auto">
                  <p className="text-3xl font-bold mb-2">${portfolio.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {PORTFOLIO_DETAIL_TEXT.oneTimeFee}
                  </p>
                </div>

                <Button onClick={handleAccessRequest} size="lg" className="text-lg px-8">
                  {isAuthenticated
                    ? PORTFOLIO_DETAIL_TEXT.purchaseAccess
                    : PORTFOLIO_DETAIL_TEXT.loginPurchase}
                </Button>
              </CardContent>
            </Card>
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
  const stocksSectionTitle = 'Current Recommended Stocks';

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 sm:pt-24 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mb-8">
          <SectionHeader mainText={stocksSectionTitle} className="mb-6" />
          <div className="grid grid-cols-1 gap-3 max-w-5xl mx-auto">
            {stocks.map((stock) => (
              <StockCard
                key={stock.ticker}
                stock={stock}
                // TODO(subscription-flow): use `blurred={shouldLockTickers}` when lock returns.
                blurred={false}
                disableViewAnalysis={shouldLockTickers}
                tickerClassName="text-[var(--accent)]"
                onViewDetails={() =>
                  navigate(
                    portfolio.id === 'long-contrarian'
                      ? `/portfolio/stock/${stock.ticker}`
                      : `/portfolio/${portfolio.id}/stock/${stock.ticker}`,
                  )
                }
              />
            ))}
          </div>
        </div>
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
