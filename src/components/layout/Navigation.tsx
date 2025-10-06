import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthModal } from '../ui/auth-modal';
import { Button } from '../ui/button';
import { ProfileDropdown } from '../ui/profile-dropdown';
import { useAuth } from '../../hooks/useAuth';
import { NAVIGATION_ITEMS } from '../../constants';
import { DesktopNavigation } from '../navigation/DesktopNavigation';
import { MobileNavigation } from '../navigation/MobileNavigation';
import { textContent } from '@/constants/textContent';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = NAVIGATION_ITEMS;

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
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0" onClick={closeMobileMenu}>
              <img 
                src="/lovable-uploads/90c91ea3-0281-4a04-9490-78e894e448df.png" 
                alt={textContent["navigation-logo-alt"]} 
                className="w-8 h-8 object-contain"
              />
              <span className="text-foreground font-bold text-xl">{textContent["navigation-brand-name"]}</span>
            </Link>
            
            <div className="hidden md:flex space-x-6 flex-1 justify-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === item.href
                      ? 'text-foreground bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <ProfileDropdown
                    user={user!}
                    onLogout={logout}
                  />
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    {textContent["navigation-login"]}
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