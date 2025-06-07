import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '../ui/auth-modal';
import { ProfileDropdown } from '../ui/profile-dropdown';
import { useAuth } from '../../hooks/useAuth';
import { NAVIGATION_ITEMS } from '../../constants';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPremiumStocks, setShowPremiumStocks] = useState(true);

  const navigationItems = [
    ...NAVIGATION_ITEMS,
    { href: '/pricing', label: 'Pricing' }
  ];

  // Store the premium stocks visibility in localStorage for persistence
  const handleTogglePremiumStocks = (show: boolean) => {
    setShowPremiumStocks(show);
    localStorage.setItem('showPremiumStocks', show.toString());
    // Dispatch custom event to notify the Stocks page
    window.dispatchEvent(new Event('premiumStocksToggled'));
  };

  // Initialize from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('showPremiumStocks');
    if (stored !== null) {
      setShowPremiumStocks(stored === 'true');
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-foreground font-bold text-xl">StockPicks</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <ProfileDropdown
                user={user!}
                onLogout={logout}
                showPremiumStocks={showPremiumStocks}
                onTogglePremiumStocks={handleTogglePremiumStocks}
              />
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Login
              </Button>
            )}

            <button className="md:hidden text-muted-foreground hover:text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />
    </nav>
  );
};
