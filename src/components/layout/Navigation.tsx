
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    ...NAVIGATION_ITEMS,
    { href: '/pricing', label: 'Pricing' }
  ];

  // Store the premium stocks visibility in localStorage for persistence
  const handleTogglePremiumStocks = (show: boolean) => {
    console.log('Navigation: Toggling premium stocks to:', show);
    setShowPremiumStocks(show);
    localStorage.setItem('showPremiumStocks', show.toString());
    
    // Dispatch custom event to notify the Stocks page
    const event = new CustomEvent('premiumStocksToggled', { detail: { show } });
    window.dispatchEvent(event);
    console.log('Navigation: Dispatched premiumStocksToggled event');
  };

  // Initialize from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('showPremiumStocks');
    if (stored !== null) {
      const value = stored === 'true';
      console.log('Navigation: Initialized showPremiumStocks from localStorage:', value);
      setShowPremiumStocks(value);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-foreground font-bold text-xl">StockPicks</span>
          </Link>
          
          {/* Desktop Navigation */}
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
            {/* Desktop Auth */}
            <div className="hidden md:block">
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
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-muted-foreground hover:text-foreground p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-foreground bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border mt-4">
                {isAuthenticated ? (
                  <div className="px-3 py-2">
                    <ProfileDropdown
                      user={user!}
                      onLogout={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      showPremiumStocks={showPremiumStocks}
                      onTogglePremiumStocks={handleTogglePremiumStocks}
                    />
                  </div>
                ) : (
                  <div className="px-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        closeMobileMenu();
                      }}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
