import React, { useState, useEffect } from 'react';
import { StockModal } from '../components/ui/stock-modal';
import { SAMPLE_STOCKS } from '../constants';
import { IStock } from '../types';
import { useAuth } from '../hooks/useAuth';
import { PortfolioOverview } from '../components/stocks/PortfolioOverview';
import { FilteringSorting } from '../components/stocks/FilteringSorting';
import { FeaturedPicks } from '../components/stocks/FeaturedPicks';
import { StockRecommendations } from '../components/stocks/StockRecommendations';
import { AccessDenied } from '../components/stocks/AccessDenied';
import { PremiumStocksHidden } from '../components/stocks/PremiumStocksHidden';

export const Stocks: React.FC = () => {
  const { user, isAuthenticated, canAccessPremiumStocks } = useAuth();
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('conviction');
  const [showPremiumStocks, setShowPremiumStocks] = useState(true);

  // Read premium stocks visibility from localStorage and set up listener
  useEffect(() => {
    const stored = localStorage.getItem('showPremiumStocks');
    if (stored !== null) {
      const value = stored === 'true';
      console.log('Stocks: Initialized showPremiumStocks from localStorage:', value);
      setShowPremiumStocks(value);
    }

    // Custom event listener for changes from the profile dropdown
    const handleToggleChange = (event?: any) => {
      console.log('Stocks: Received toggle event:', event);
      const updated = localStorage.getItem('showPremiumStocks');
      if (updated !== null) {
        const value = updated === 'true';
        console.log('Stocks: Updating showPremiumStocks to:', value);
        setShowPremiumStocks(value);
      }
    };

    // Listen for custom events (from profile dropdown)
    window.addEventListener('premiumStocksToggled', handleToggleChange);

    // Also listen for storage events (for other tabs)
    window.addEventListener('storage', handleToggleChange);

    return () => {
      window.removeEventListener('premiumStocksToggled', handleToggleChange);
      window.removeEventListener('storage', handleToggleChange);
    };
  }, []);

  // Add debug logging for showPremiumStocks changes
  useEffect(() => {
    console.log('Stocks: showPremiumStocks state changed to:', showPremiumStocks);
  }, [showPremiumStocks]);

  const isPremiumUser = user?.plan === 'pro' || user?.plan === 'elite';
  // Fixed logic: Allow access if user is authenticated AND (is premium OR debug toggle is enabled)
  const canAccessStocks = isAuthenticated && (isPremiumUser || showPremiumStocks);

  console.log('Stocks: Current state - isAuthenticated:', isAuthenticated, 'isPremiumUser:', isPremiumUser, 'showPremiumStocks:', showPremiumStocks, 'canAccessStocks:', canAccessStocks);

  const handleStockClick = (stock: IStock) => {
    if (!canAccessStocks) {
      return;
    }
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const handleShowPremiumStocks = () => {
    console.log('Stocks: Manual toggle button clicked');
    localStorage.setItem('showPremiumStocks', 'true');
    setShowPremiumStocks(true);
    // Dispatch custom event to notify other components
    const event = new CustomEvent('premiumStocksToggled', { detail: { show: true } });
    window.dispatchEvent(event);
  };

  // Show override message if premium stocks are hidden but user has access
  if (isAuthenticated && isPremiumUser && !showPremiumStocks) {
    return <PremiumStocksHidden onShowPremiumStocks={handleShowPremiumStocks} />;
  }

  if (!canAccessStocks) {
    return <AccessDenied isAuthenticated={isAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Recommended Stocks
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered analysis has identified these high-potential opportunities based on 
            rigorous quantitative research and backtested strategies
          </p>
        </div>

        <PortfolioOverview />
        
        <FilteringSorting
          filterBy={filterBy}
          sortBy={sortBy}
          onFilterChange={setFilterBy}
          onSortChange={setSortBy}
        />

        <FeaturedPicks 
          stocks={SAMPLE_STOCKS}
          onStockClick={handleStockClick}
        />

        <StockRecommendations 
          stocks={SAMPLE_STOCKS}
          onStockClick={handleStockClick}
        />

        <StockModal
          stock={selectedStock}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};