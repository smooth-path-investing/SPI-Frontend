import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthModal } from '../ui/auth-modal';
import { Button } from '../ui/button';
import { ProfileDropdown } from '../ui/profile-dropdown';
import { useAuth } from '../../hooks/useAuth';
import { NAVIGATION_ITEMS } from '../../constants';
import { MobileNavigation } from '../navigation/MobileNavigation';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/85 text-[var(--foreground)] border-b border-[var(--card-border)] shadow-[0_6px_20px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div className="w-8 h-8 flex items-center justify-center bg-[var(--background)]">
              <img src="images/SPI.png" alt="SPI Logo" className="w-6 h-6 object-contain" />
            </div>

            {/* Centered Links */}
            <div className="hidden md:flex flex-1 justify-center gap-8">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors tracking-wide text-[var(--muted-text)] hover:text-[var(--foreground)]"
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-3/4 h-[2px] bg-[var(--accent)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth / Mobile */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Desktop Auth */}
              <div className="hidden md:block">
                {isAuthenticated && user ? (
                  <ProfileDropdown user={user} onLogout={logout} />
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="border-[var(--accent)] text-[var(--foreground)] px-5 py-2 rounded-md hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
                  >
                    Login
                  </Button>
                )}
              </div>

              {/* Mobile Menu */}
              <MobileNavigation
                navigationItems={NAVIGATION_ITEMS}
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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />
    </>
  );
};
