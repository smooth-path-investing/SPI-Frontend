import React from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '../../types';

interface MobileNavigationProps {
  navigationItems: { href: string; label: string }[];
  isAuthenticated: boolean;
  user: User | null;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navigationItems,
  isAuthenticated,
  user,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  onAuthClick,
  onLogout,
}) => {
  const location = useLocation();

  const menuButtonClasses =
    'md:hidden text-[var(--muted-text)] hover:text-[var(--foreground)] p-2 transition-colors z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center';

  const linkBaseClasses = 'relative text-[20px] font-medium tracking-wide transition-colors pl-8';
  const linkActiveClasses =
    'text-[var(--accent)] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-[1.2em] before:bg-[var(--accent)]';
  const linkInactiveClasses =
    'text-white/60 hover:text-[var(--accent)] font-medium tracking-[0.05em]';

  const renderLoginButton = () => (
    <Button
      variant="default"
      size="sm"
      className="w-full rounded-md px-4 py-3 mb-8 bg-[var(--accent)] text-[var(--background)] font-semibold transition-colors"
      onClick={() => {
        onAuthClick();
        onCloseMobileMenu();
      }}
    >
      Login
    </Button>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={menuButtonClasses}
        onClick={onToggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <Menu className="w-7 h-7 text-[var(--foreground)]" />
      </button>

      {isMobileMenuOpen &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-[95] bg-black md:hidden"
              onClick={onCloseMobileMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <div className="fixed inset-x-0 top-0 bottom-0 z-[100] bg-black md:hidden flex flex-col h-full animate-slide-in-right">
              {/* Top Right Close Button */}
              <div className="flex justify-end p-2">
                <button
                  onClick={onCloseMobileMenu}
                  aria-label="Close menu"
                  className="p-3 hover:text-[var(--forground)] transition-colors"
                >
                  <X className="w-8 h-8 text-[var(--foreground)]" /> 
                </button>
              </div>

              {/* Spacer for “expensive empty space” */}
              <div className="flex-1" />

              {/* Bottom 40%: Login + Navigation */}
              <div className="flex flex-col justify-end px-6 pb-12 space-y-9">
                {/* Login button */}
                {!isAuthenticated && renderLoginButton()}

                {/* Auth Section */}
                {isAuthenticated && user && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 px-2 py-2">
                      <div className="w-10 h-10 bg-[var(--accent)] rounded-md flex items-center justify-center">
                        <span className="text-[var(--background)] text-sm font-medium">
                          {user.email?.[0].toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.email}</p>
                        <p className="text-white/65 text-sm">
                          {user.isPremium ? 'Premium Member' : 'Free Member'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-md px-4 py-3 hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
                      onClick={() => {
                        onLogout();
                        onCloseMobileMenu();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="flex flex-col space-y-9">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onCloseMobileMenu}
                        className={`${linkBaseClasses} ${
                          isActive ? linkActiveClasses : linkInactiveClasses
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
};
