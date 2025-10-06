import React, { useState, useRef } from 'react';
import { Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PORTFOLIOS } from '@/constants/portfolios';

export const DevModePanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);
  const { user, hasPurchasedPortfolio, togglePortfolioPurchase, login, logout, isAuthenticated } = useAuth();

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button:not(.drag-handle)')) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragRef.current) return;
    setPosition({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = null;
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handlePlanSwitch = (plan: 'free' | 'pro' | 'elite') => {
    if (!isAuthenticated) {
      login(`${plan}@test.com`, 'password');
    } else {
      logout();
      setTimeout(() => login(`${plan}@test.com`, 'password'), 100);
    }
  };

  if (!import.meta.env.DEV) return null;

  return (
    <div
      className="fixed z-[9999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-red-600 text-white shadow-2xl rounded-lg border-4 border-red-700 min-w-[280px]">
        {/* Header */}
        <div className="drag-handle flex items-center justify-between p-3 bg-red-700 rounded-t-md">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <span className="font-bold text-sm">DEV MODE</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-red-600 p-1 rounded transition-colors"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="p-4 space-y-4 bg-red-600 rounded-b-md max-h-[70vh] overflow-y-auto">
            {/* Auth Status */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide">Auth Status</div>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-red-200 text-xs">{user?.email}</div>
                    <Badge className="mt-1 bg-red-800 hover:bg-red-800 text-white border-red-900">
                      {user?.plan}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-400 text-white border-red-700"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="text-sm text-red-200">Not logged in</div>
              )}
            </div>

            {/* Plan Switcher */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide">Switch Plan</div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  onClick={() => handlePlanSwitch('free')}
                  className="bg-red-500 hover:bg-red-400 text-white border border-red-700"
                  disabled={user?.plan === 'free'}
                >
                  Free
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePlanSwitch('pro')}
                  className="bg-red-500 hover:bg-red-400 text-white border border-red-700"
                  disabled={user?.plan === 'pro'}
                >
                  Pro
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePlanSwitch('elite')}
                  className="bg-red-500 hover:bg-red-400 text-white border border-red-700"
                  disabled={user?.plan === 'elite'}
                >
                  Elite
                </Button>
              </div>
            </div>

            {/* Portfolio Access */}
            {isAuthenticated && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide">Portfolio Access</div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {PORTFOLIOS.map(portfolio => {
                    const isPurchased = hasPurchasedPortfolio(portfolio.id);
                    return (
                      <div
                        key={portfolio.id}
                        className="flex items-center justify-between p-2 bg-red-700 rounded border border-red-800"
                      >
                        <div className="flex-1 min-w-0 mr-2">
                          <div className="text-sm font-medium truncate">{portfolio.name}</div>
                          <div className="text-xs text-red-200">${portfolio.price}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={isPurchased ? "default" : "outline"}
                            className={isPurchased 
                              ? "bg-green-600 hover:bg-green-600 text-white" 
                              : "bg-red-800 text-white border-red-900"
                            }
                          >
                            {isPurchased ? '✓' : '○'}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => togglePortfolioPurchase(portfolio.id)}
                            className="h-7 px-2 text-xs bg-red-500 hover:bg-red-400 text-white border border-red-700"
                          >
                            {isPurchased ? 'Revoke' : 'Grant'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="text-xs text-red-200 pt-2 border-t border-red-700">
              <div className="font-semibold mb-1">Dev Mode Only</div>
              <div>Drag this panel anywhere. This won't appear in production.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
