import React, { useState, useRef } from 'react';
import { Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PORTFOLIOS } from '@/constants/portfolios';

export const DevModePanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
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

  return (
    <div
      className="fixed z-[99999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
    <div className="bg-red-600 text-white shadow-2xl rounded border border-red-700 min-w-[140px]">
        {/* Header */}
        <div className="drag-handle flex items-center justify-between px-1.5 py-1 bg-red-700 rounded-t-sm">
          <div className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            <span className="font-bold text-[11px]">DEV MODE</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-red-600 p-0.5 rounded transition-colors"
          >
            {isOpen ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
          </button>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="p-2 space-y-2 bg-red-600 rounded-b-sm max-h-[50vh] overflow-y-auto text-[10px]">
            {/* Auth Status */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide">Auth Status</div>
              {isAuthenticated ? (
                <div className="space-y-1.5">
                  <div>
                    <div className="font-medium text-xs">{user?.name}</div>
                    <div className="text-red-200 text-[10px]">{user?.email}</div>
                    <Badge className="mt-1 text-[10px] px-1.5 py-0 h-4 bg-red-800 hover:bg-red-800 text-white border-red-900">
                      {user?.plan}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={logout}
                    className="w-full h-6 text-[10px] bg-red-500 hover:bg-red-400 text-white border-red-700"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="text-[10px] text-red-200">Not logged in</div>
              )}
            </div>

            {/* Plan Switcher */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide">Switch Plan</div>
              <div className="grid grid-cols-3 gap-1.5">
                <Button
                  size="sm"
                  onClick={() => handlePlanSwitch('free')}
                  className="h-6 text-[10px] bg-red-500 hover:bg-red-400 text-white border border-red-700"
                  disabled={user?.plan === 'free'}
                >
                  Free
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePlanSwitch('pro')}
                  className="h-6 text-[10px] bg-red-500 hover:bg-red-400 text-white border border-red-700"
                  disabled={user?.plan === 'pro'}
                >
                  Pro
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePlanSwitch('elite')}
                  className="h-6 text-[10px] bg-red-500 hover:bg-red-400 text-white border border-red-700"
                  disabled={user?.plan === 'elite'}
                >
                  Elite
                </Button>
              </div>
            </div>

            {/* Portfolio Access */}
            {isAuthenticated && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold uppercase tracking-wide">Portfolio Access</div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {PORTFOLIOS.map(portfolio => {
                    const isPurchased = hasPurchasedPortfolio(portfolio.id);
                    return (
                      <div
                        key={portfolio.id}
                        className="flex items-center justify-between p-1.5 bg-red-700 rounded border border-red-800"
                      >
                        <div className="flex-1 min-w-0 mr-1.5">
                          <div className="text-[10px] font-medium truncate">{portfolio.name}</div>
                          <div className="text-[9px] text-red-200">${portfolio.price}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge 
                            variant={isPurchased ? "default" : "outline"}
                            className={`text-[10px] px-1 py-0 h-4 ${isPurchased 
                              ? "bg-green-600 hover:bg-green-600 text-white" 
                              : "bg-red-800 text-white border-red-900"
                            }`}
                          >
                            {isPurchased ? '✓' : '○'}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => togglePortfolioPurchase(portfolio.id)}
                            className="h-5 px-1.5 text-[9px] bg-red-500 hover:bg-red-400 text-white border border-red-700"
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
            <div className="text-[9px] text-red-200 pt-1.5 border-t border-red-700">
              <div className="font-semibold mb-0.5">Dev Mode Only</div>
              <div>Drag anywhere. Won't show in prod.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
