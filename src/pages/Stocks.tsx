import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PORTFOLIOS } from '../constants/portfolios';
import { PortfolioCard } from '../components/stocks/PortfolioCard';
import { AuthModal } from '../components/ui/auth-modal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';

export const Stocks: React.FC = () => {
  const { isAuthenticated, login, signup, hasPurchasedPortfolio, togglePortfolioPurchase } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handlePortfolioClick = (portfolioId: string) => {
    navigate(`/portfolio/${portfolioId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Investment Portfolios
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our professionally managed portfolios, each designed with unique strategies 
              and risk profiles to match your investment goals
            </p>
          </div>

          {/* Dev Tools Panel - Testing Portfolio Purchases */}
          {isAuthenticated && (
            <Card className="mb-8 border-primary bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Testing Mode: Simulate Portfolio Purchases
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click to toggle purchase status for each portfolio (Demo mode only)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PORTFOLIOS.map(portfolio => {
                    const isPurchased = hasPurchasedPortfolio(portfolio.id);
                    return (
                      <Card 
                        key={portfolio.id}
                        className={isPurchased ? "border-primary bg-primary/10" : "border-muted"}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{portfolio.name}</h4>
                              <p className="text-xs text-muted-foreground">${portfolio.price}</p>
                            </div>
                            <Badge variant={isPurchased ? "default" : "outline"}>
                              {isPurchased ? '✓ Owned' : 'Locked'}
                            </Badge>
                          </div>
                          <Button
                            variant={isPurchased ? "outline" : "default"}
                            size="sm"
                            onClick={() => togglePortfolioPurchase(portfolio.id)}
                            className="w-full"
                          >
                            {isPurchased ? 'Remove Access' : 'Grant Access'}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIOS.map(portfolio => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                isPurchased={isAuthenticated && hasPurchasedPortfolio(portfolio.id)}
                onViewPortfolio={() => handlePortfolioClick(portfolio.id)}
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
    </>
  );
};