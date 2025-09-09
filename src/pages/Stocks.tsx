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

        {/* Portfolio Overview - New */}
        <section className="mb-16">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Current Portfolio Overview</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">12</div>
                <div className="text-muted-foreground">Active Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">+23.4%</div>
                <div className="text-muted-foreground">YTD Performance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">68%</div>
                <div className="text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">1.42</div>
                <div className="text-muted-foreground">Sharpe Ratio</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtering and Sorting - New */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="bg-card border border-border rounded-md px-3 py-2 text-foreground"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <SortAsc className="w-5 h-5 text-muted-foreground" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card border border-border rounded-md px-3 py-2 text-foreground"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search stocks..." 
                className="bg-card border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>
        </section>

        {/* Featured Picks - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Featured Picks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {SAMPLE_STOCKS.slice(0, 2).map((stock, index) => (
              <Card 
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleStockClick(stock)}
              >
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-3xl font-bold text-foreground">{stock.ticker}</h3>
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-lg">{stock.name}</p>
                    </div>
                    {stock.price && (
                      <div className="text-right">
                        <div className="text-2xl font-bold">${stock.price}</div>
                        <div className={`text-lg ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.changePercent && (
                            `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%`
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Investment Thesis</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {stock.reason[0]} Our analysis shows strong fundamentals combined with attractive valuation metrics.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Catalysts</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {stock.indicators.slice(0, 4).map((indicator, indicatorIndex) => (
                          <Badge 
                            key={indicatorIndex} 
                            variant="secondary" 
                            className="text-xs bg-secondary text-secondary-foreground justify-center"
                          >
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent">
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Recommendations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-foreground">All Current Recommendations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_STOCKS.map((stock, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleStockClick(stock)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{stock.ticker}</h3>
                      <p className="text-muted-foreground text-sm">{stock.name}</p>
                    </div>
                    {stock.price && (
                      <div className="text-right">
                        <div className="text-lg font-bold">${stock.price}</div>
                        <div className={`text-sm ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.changePercent && (
                            `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%`
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Reasons</h4>
                      <ul className="space-y-1">
                        {stock.reason.slice(0, 2).map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Top Indicators</h4>
                      <div className="flex flex-wrap gap-1">
                        {stock.indicators.slice(0, 2).map((indicator, indicatorIndex) => (
                          <Badge 
                            key={indicatorIndex} 
                            variant="secondary" 
                            className="text-xs bg-secondary text-secondary-foreground"
                          >
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      Click for detailed analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Coming Soon Cards */}
            {Array.from({ length: 9 }).map((_, index) => (
              <Card key={`coming-soon-${index}`} className="bg-card border-border border-dashed">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    More curated picks being analyzed
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Process - New */}
        <section className="mb-16">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Our Stock Selection Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <BarChart3 className="w-8 h-8 text-foreground mx-auto" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">1. Quantitative Screening</h3>
                <p className="text-sm text-muted-foreground">
                  Filter 3,000+ stocks using 50+ fundamental, technical, and sentiment factors
                </p>
              </div>
              <div className="text-center">
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <Target className="w-8 h-8 text-foreground mx-auto" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">2. AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models analyze patterns and predict future performance potential
                </p>
              </div>
              <div className="text-center">
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <Star className="w-8 h-8 text-foreground mx-auto" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">3. Expert Review</h3>
                <p className="text-sm text-muted-foreground">
                  Final validation by our research team ensures quality and conviction in each pick
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Information Banner */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Fresh Research</h2>
          <p className="text-muted-foreground mb-6">
            New stock recommendations are added weekly based on our latest analysis. 
            Each pick undergoes rigorous backtesting and risk assessment before inclusion.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              Analysis refreshed daily
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              New picks weekly
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              AI-powered selection
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              Risk-adjusted focus
            </Badge>
          </div>
          <div className="flex justify-center space-x-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Stock Alerts
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              View Research Methodology
            </Button>
          </div>
        </div>
      </div>

      <StockModal 
        stock={selectedStock} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};
