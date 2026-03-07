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

  const linkBaseClasses =
    'block w-full rounded-xl border px-4 py-3 text-base font-semibold transition-colors';
  const linkActiveClasses =
    'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--foreground)]';
  const linkInactiveClasses =
    'border-white/15 bg-black/20 text-white/75 hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]';

  const renderLoginButton = () => (
    <Button
      variant="default"
      size="sm"
      className="w-full rounded-md px-4 py-3 bg-[var(--accent)] text-[var(--background)] font-semibold transition-colors"
      onClick={() => {
        onAuthClick();
        onCloseMobileMenu();
      }}
    >
      Login
    </Button>
  );

  const mobileMenu = isMobileMenuOpen
    ? createPortal(
        <div className="fixed inset-0 z-[100] md:hidden bg-[var(--background)] text-[var(--foreground)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />

          <div className="relative h-[100dvh] w-full flex flex-col px-5 sm:px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.2rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)]/80">
              <div className="flex items-center gap-3">
                <img src="/images/SPI.png" alt="SPI Logo" className="w-6 h-6 object-contain" />
                <p className="text-sm uppercase tracking-[0.14em] text-[var(--muted-text)]">Menu</p>
              </div>
              <button
                onClick={onCloseMobileMenu}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <X className="w-7 h-7 text-[var(--foreground)]" />
              </button>
            </div>

            <div className="pt-5">
              {!isAuthenticated && renderLoginButton()}

              {isAuthenticated && user && (
                <div className="rounded-xl border border-white/15 bg-black/20 px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[var(--accent)] rounded-md flex items-center justify-center shrink-0">
                      <span className="text-[var(--background)] text-sm font-medium">
                        {user.email?.[0].toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">{user.email}</p>
                      <p className="text-white/65 text-sm leading-tight">
                        {user.isPremium ? 'Premium Member' : 'Free Member'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 rounded-md px-4 py-3 border-[var(--card-border)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
                    onClick={() => {
                      onLogout();
                      onCloseMobileMenu();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted-text)] mb-3">
                Navigation
              </p>
              <div className="grid grid-cols-1 gap-3">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onCloseMobileMenu}
                      className={`${linkBaseClasses} ${isActive ? linkActiveClasses : linkInactiveClasses}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={menuButtonClasses}
        onClick={onToggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="w-7 h-7 text-[var(--foreground)]" />
        ) : (
          <Menu className="w-7 h-7 text-[var(--foreground)]" />
        )}
      </button>
      {mobileMenu}
    </>
  );
};
