
import React, { useState } from 'react';
import { User, LogOut, Eye, EyeOff } from 'lucide-react';
import { Button } from './button';

interface ProfileDropdownProps {
  user: {
    id: string;
    name: string;
    email: string;
    plan: 'free' | 'pro' | 'elite';
  };
  onLogout: () => void;
  showPremiumStocks: boolean;
  onTogglePremiumStocks: (show: boolean) => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogout,
  showPremiumStocks,
  onTogglePremiumStocks
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {showPremiumStocks ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span className="text-sm">Show Premium Stocks</span>
                </div>
                <button
                  onClick={() => onTogglePremiumStocks(!showPremiumStocks)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showPremiumStocks ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      showPremiumStocks ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Toggle visibility of premium stock features for testing
              </p>
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
