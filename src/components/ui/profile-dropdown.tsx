
import React, { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { PORTFOLIOS } from '@/constants/portfolios';

interface ProfileDropdownProps {
  user: {
    id: string;
    name: string;
    email: string;
    plan: 'free' | 'pro' | 'elite';
  };
  onLogout: () => void;
  hasPurchasedPortfolio: (portfolioId: string) => boolean;
  togglePortfolioPurchase: (portfolioId: string) => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogout,
  hasPurchasedPortfolio,
  togglePortfolioPurchase
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-4 h-4" />
        <span className="text-sm">{user.name}</span>
        <span className="text-xs bg-accent px-2 py-1 rounded capitalize">
          {user.plan}
        </span>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="space-y-4">
            <div className="border-b border-border pb-3">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <p className="text-xs capitalize bg-accent px-2 py-1 rounded inline-block mt-1">
                {user.plan} Plan
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-semibold">Testing Mode</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Simulate portfolio purchases (Demo mode only)
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {PORTFOLIOS.map(portfolio => {
                  const isPurchased = hasPurchasedPortfolio(portfolio.id);
                  return (
                    <div 
                      key={portfolio.id}
                      className="flex items-center justify-between p-2 border border-border rounded-md hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{portfolio.name}</p>
                        <p className="text-xs text-muted-foreground">${portfolio.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isPurchased ? "default" : "outline"} className="text-xs">
                          {isPurchased ? '✓' : '○'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePortfolioPurchase(portfolio.id)}
                          className="h-7 px-2 text-xs"
                        >
                          {isPurchased ? 'Remove' : 'Grant'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
