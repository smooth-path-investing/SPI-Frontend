
import React, { useState } from 'react';
import { User, LogOut, Eye, EyeOff } from 'lucide-react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Switch } from './switch';

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="text-sm">{user.name}</span>
          <span className="text-xs bg-accent px-2 py-1 rounded capitalize">
            {user.plan}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="end">
        <div className="space-y-4">
          <div className="border-b pb-3">
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
              <Switch
                checked={showPremiumStocks}
                onCheckedChange={onTogglePremiumStocks}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Toggle visibility of premium stock features for testing
            </p>
          </div>

          <div className="border-t pt-3">
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
      </PopoverContent>
    </Popover>
  );
};
