import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProfileDropdown } from '../ui/profile-dropdown';
import { User } from '../../types';

interface DesktopNavigationProps {
  navigationItems: { href: string; label: string }[];
  isAuthenticated: boolean;
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  showPremiumStocks: boolean;
  onTogglePremiumStocks: (show: boolean) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navigationItems,
  isAuthenticated,
  user,
  onAuthClick,
  onLogout,
  showPremiumStocks,
  onTogglePremiumStocks
}) => {
  const location = useLocation();

  return (
    <>
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

      <div className="hidden md:block">
        {isAuthenticated ? (
          <ProfileDropdown
            user={user!}
            onLogout={onLogout}
            showPremiumStocks={showPremiumStocks}
            onTogglePremiumStocks={onTogglePremiumStocks}
          />
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onAuthClick}
          >
            Login
          </Button>
        )}
      </div>
    </>
  );
};