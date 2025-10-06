import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PORTFOLIOS } from '../constants/portfolios';
import { PortfolioCard } from '../components/stocks/PortfolioCard';
import { AuthModal } from '../components/ui/auth-modal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const Stocks: React.FC = () => {
  const { isAuthenticated, login, signup, hasPurchasedPortfolio, togglePortfolioPurchase } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);

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

          {/* Dev Tools Toggle (only visible when authenticated) */}
          {isAuthenticated && (
            <div className="mb-8 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDevTools(!showDevTools)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Developer Tools
              </Button>
            </div>
          )}

          {/* Dev Tools Panel */}
          {showDevTools && isAuthenticated && (
            <Card className="mb-8 border-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Portfolio Purchase Demo Controls</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Toggle portfolio purchases for testing (demo mode only)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PORTFOLIOS.map(portfolio => (
                    <Button
                      key={portfolio.id}
                      variant={hasPurchasedPortfolio(portfolio.id) ? "default" : "outline"}
                      onClick={() => togglePortfolioPurchase(portfolio.id)}
                      className="justify-between"
                    >
                      <span>{portfolio.name}</span>
                      <span className="text-xs">
                        {hasPurchasedPortfolio(portfolio.id) ? '✓ Purchased' : 'Not Purchased'}
                      </span>
                    </Button>
                  ))}
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