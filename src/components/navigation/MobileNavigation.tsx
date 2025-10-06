import React from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
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
  onLogout
}) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-muted-foreground hover:text-foreground p-2 transition-colors relative z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={onToggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>


      {/* Mobile Navigation Menu (Portal) */}
      {isMobileMenuOpen &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={onCloseMobileMenu}
              aria-hidden="true"
            />

            {/* Sliding Drawer */}
            <div className="fixed inset-x-0 top-16 bottom-0 z-[100] bg-background/98 backdrop-blur-md md:hidden animate-slide-in-right">
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="flex-1 px-4 py-6 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onCloseMobileMenu}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'text-foreground bg-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Auth Section */}
                <div className="border-t border-border p-4">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 px-4 py-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-sm font-medium">
                            {user?.email?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user?.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {user?.isPremium ? 'Premium Member' : 'Free Member'}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => {
                          onLogout();
                          onCloseMobileMenu();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        onAuthClick();
                        onCloseMobileMenu();
                      }}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>,
          document.body
        )}

    </>
  );
};