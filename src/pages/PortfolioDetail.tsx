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
import { PortfolioMetricCard, PortfolioStatCard } from '@/components/portfolio/PortfolioMetricCard';
import { useAuth } from '@/hooks/useAuth';
import { textContent } from '@/constants/textContent';
import { TrendingUp, Shield, Calendar, Package } from 'lucide-react';

export const PortfolioDetail: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const { isAuthenticated, login, signup, hasPurchasedPortfolio } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const portfolio = PORTFOLIOS.find(p => p.id === portfolioId);

  useEffect(() => {
    if (!portfolio) {
      navigate('/stocks');
    }
  }, [portfolio, navigate]);

  if (!portfolio) {
    return null;
  }

  const isPurchased = isAuthenticated && hasPurchasedPortfolio(portfolio.id);

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
      case 'Low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (!isPurchased) {
    return (
      <>
        <div className="min-h-screen bg-background text-foreground pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/stocks')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {textContent["portfolio-detail-back"]}
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
                    label={textContent["portfolio-detail-expected-return"]}
                    value={portfolio.expectedReturn}
                  />
                  <PortfolioMetricCard
                    icon={Shield}
                    label={textContent["portfolio-detail-risk-level"]}
                    value={
                      <Badge className={getRiskColor(portfolio.riskLevel)} variant="outline">
                        {portfolio.riskLevel}
                      </Badge>
                    }
                  />
                  <PortfolioMetricCard
                    icon={Package}
                    label={textContent["portfolio-detail-holdings"]}
                    value={portfolio.holdings}
                  />
                  <PortfolioMetricCard
                    icon={Calendar}
                    label={textContent["portfolio-detail-rebalance"]}
                    value={portfolio.rebalanceFrequency}
                    className="text-sm"
                  />
                </div>

                <div className="bg-accent/50 p-6 rounded-lg mb-8 max-w-md mx-auto">
                  <p className="text-3xl font-bold mb-2">${portfolio.price}</p>
                  <p className="text-sm text-muted-foreground">{textContent["portfolio-detail-one-time-fee"]}</p>
                </div>

                <Button 
                  onClick={handleAccessRequest}
                  size="lg"
                  className="text-lg px-8"
                >
                  {isAuthenticated ? textContent["portfolio-detail-purchase-access"] : textContent["portfolio-detail-login-purchase"]}
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

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/stocks')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {textContent["portfolio-detail-back"]}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{portfolio.name}</h1>
          <p className="text-xl text-muted-foreground">{portfolio.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <PortfolioStatCard
            label={textContent["portfolio-detail-expected-return"]}
            value={portfolio.expectedReturn}
          />
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{textContent["portfolio-detail-risk-level"]}</p>
              <Badge className={getRiskColor(portfolio.riskLevel)} variant="outline">
                {portfolio.riskLevel}
              </Badge>
            </CardContent>
          </Card>
          <PortfolioStatCard
            label={textContent["portfolio-detail-holdings"]}
            value={String(portfolio.holdings)}
          />
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{textContent["portfolio-detail-rebalance"]}</p>
              <p className="text-lg font-bold">{portfolio.rebalanceFrequency}</p>
            </CardContent>
          </Card>
        </div>

        {/* Stock Holdings Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">{textContent["portfolio-detail-current-holdings"]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
              <StockCard
                key={stock.ticker}
                stock={stock}
                onViewDetails={() => navigate(`/portfolio/${portfolio.id}/stock/${stock.ticker}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
