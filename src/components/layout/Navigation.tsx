import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthModal } from '../ui/auth-modal';
import { Button } from '../ui/button';
import { ProfileDropdown } from '../ui/profile-dropdown';
import { useAuth } from '../../hooks/useAuth';
import { NAVIGATION_ITEMS } from '../../constants';
import { DesktopNavigation } from '../navigation/DesktopNavigation';
import { MobileNavigation } from '../navigation/MobileNavigation';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPremiumStocks, setShowPremiumStocks] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = NAVIGATION_ITEMS;

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
  useEffect(() => {
    const stored = localStorage.getItem('showPremiumStocks');
    if (stored !== null) {
      const value = stored === 'true';
      console.log('Navigation: Initialized showPremiumStocks from localStorage:', value);
      setShowPremiumStocks(value);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <img 
                src="/lovable-uploads/90c91ea3-0281-4a04-9490-78e894e448df.png" 
                alt="Smooth Path Investing Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-foreground font-bold text-xl">Smooth Path Investing</span>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8">
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

              <MobileNavigation
                navigationItems={navigationItems}
                isAuthenticated={isAuthenticated}
                user={user}
                isMobileMenuOpen={isMobileMenuOpen}
                onToggleMobileMenu={toggleMobileMenu}
                onCloseMobileMenu={closeMobileMenu}
                onAuthClick={() => setIsAuthModalOpen(true)}
                onLogout={logout}
                showPremiumStocks={showPremiumStocks}
                onTogglePremiumStocks={handleTogglePremiumStocks}
              />
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />
    </>
  );
};