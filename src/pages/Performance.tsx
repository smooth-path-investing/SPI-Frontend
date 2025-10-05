
import React, { useState } from 'react';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../constants';
import { TrendingUp, TrendingDown, BarChart3, Shield, Award, Target, Calendar, DollarSign } from 'lucide-react';
import { parseStrategyCSV } from '@/utils/csvParser';
import { generateMockPrices } from '@/utils/mockPrices';
import { runBacktest, BacktestResult } from '@/utils/backtestEngine';
import { SimulatorResults } from '@/components/backtest/SimulatorResults';
import { useToast } from '@/hooks/use-toast';
import { textContent } from '@/constants/textContent';

const EXAMPLE_CSV = `Start Date,Assets,Weights
1/1/2020,"AAPL, MSFT, GOOGL, AMZN, JPM, JNJ, V, PG","15%, 15%, 12%, 10%, 12%, 10%, 13%, 13%"
2/1/2020,"MSFT, GOOGL, AMZN, V, MA, UNH, HD, NVDA","14%, 13%, 11%, 12%, 10%, 13%, 12%, 15%"
3/1/2020,"MSFT, AMZN, GOOGL, JNJ, PG, WMT, KO, PFE","17%, 16%, 14%, 13%, 12%, 11%, 10%, 7%"
4/1/2020,"AAPL, MSFT, AMZN, JPM, BAC, JNJ, PFE, WMT","16%, 14%, 12%, 11%, 10%, 13%, 12%, 12%"
5/1/2020,"MSFT, AMZN, GOOGL, JPM, V, DIS, NFLX, NVDA","15%, 13%, 12%, 11%, 12%, 10%, 14%, 13%"
6/1/2020,"AAPL, MSFT, AMZN, NVDA, ADBE, CRM, TSLA, SQ","16%, 15%, 14%, 13%, 12%, 11%, 10%, 9%"
7/1/2020,"AAPL, MSFT, AMZN, V, MA, UNH, JNJ","18%, 16%, 14%, 13%, 12%, 14%, 13%"
8/1/2020,"MSFT, GOOGL, JPM, BAC, V, MA, PG, KO","15%, 13%, 12%, 11%, 13%, 12%, 12%, 12%"
9/1/2020,"AAPL, MSFT, AMZN, GOOGL, NVDA, TSLA, V, MA, ADBE","14%, 13%, 12%, 11%, 12%, 10%, 10%, 9%, 9%"
10/1/2020,"AAPL, MSFT, AMZN, GOOGL, V, JNJ, PFE, HD, WMT","14%, 13%, 11%, 10%, 12%, 11%, 10%, 10%, 9%"
11/1/2020,"MSFT, AMZN, GOOGL, JPM, V, MA, UNH, DIS","16%, 14%, 13%, 11%, 12%, 11%, 12%, 11%"
12/1/2020,"AAPL, MSFT, GOOGL, AMZN, TSLA, NVDA, CRM, SQ, SHOP","15%, 14%, 12%, 11%, 11%, 10%, 9%, 9%, 9%"
1/1/2021,"AAPL, MSFT, AMZN, V, MA, NVDA, CRM, ADBE","17%, 15%, 13%, 12%, 11%, 11%, 11%, 10%"
2/1/2021,"MSFT, AAPL, AMZN, GOOGL, JPM, V, UNH, JNJ, HD","13%, 14%, 12%, 11%, 10%, 11%, 11%, 10%, 8%"
3/1/2021,"MSFT, AAPL, GOOGL, AMZN, NVDA, TSLA, V, MA, CRM","15%, 14%, 13%, 12%, 11%, 10%, 9%, 8%, 8%"
4/1/2021,"AAPL, MSFT, AMZN, GOOGL, V, MA, NVDA, CRM, ADBE","15%, 14%, 12%, 11%, 11%, 10%, 10%, 9%, 8%"`;

export const Performance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [initialCapital, setInitialCapital] = useState(10000);
  const [csvText, setCsvText] = useState('');
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const loadExampleCSV = () => {
    setCsvText(EXAMPLE_CSV);
    toast({
      title: textContent["performance-simulator-load-toast-title"],
      description: textContent["performance-simulator-load-toast-description"],
    });
  };

  const tabs = [
    { id: 'overall', label: textContent["performance-tab-overall"] },
    { id: 'sector', label: textContent["performance-tab-sector"] },
    { id: 'risk', label: textContent["performance-tab-risk"] },
    { id: 'attribution', label: textContent["performance-tab-attribution"] }
  ];

  const handleRunBacktest = () => {
    if (!csvText.trim()) {
      toast({
        title: textContent["performance-simulator-error-empty-title"],
        description: textContent["performance-simulator-error-empty-description"],
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    
    try {
      // Parse CSV
      const strategy = parseStrategyCSV(csvText);
      
      if (strategy.length === 0) {
        toast({
          title: textContent["performance-simulator-error-empty-title"],
          description: textContent["performance-simulator-error-no-rows-description"],
          variant: "destructive"
        });
        setIsRunning(false);
        return;
      }

      // Collect all unique tickers
      const allTickers = new Set<string>();
      strategy.forEach(row => row.assets.forEach(ticker => allTickers.add(ticker)));

      // Generate mock prices
      const startDate = strategy[0].date;
      const endDate = strategy[strategy.length - 1].date;
      const prices = generateMockPrices(Array.from(allTickers), startDate, endDate);

      // Run backtest
      const result = runBacktest(strategy, prices, initialCapital);
      setBacktestResult(result);

      toast({
        title: textContent["performance-simulator-complete-title"],
        description: `Simulated ${strategy.length} rebalancing periods`,
      });
    } catch (error) {
      console.error('Backtest error:', error);
      toast({
        title: textContent["performance-simulator-error-empty-title"],
        description: "Failed to run backtest. Please check your CSV format.",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            {textContent["performance-page-title"]}
          </h1>
          <p className="text-xl text-muted-foreground">
            {textContent["performance-page-subtitle"]}
          </p>
        </div>

        {/* Performance Metrics - Enhanced */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {PERFORMANCE_METRICS.map((metric, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border text-center hover:bg-accent/50 transition-all duration-300">
              <h3 className="text-muted-foreground text-sm mb-2">{metric.label}</h3>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className={`text-sm ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change} vs last period
              </div>
            </div>
          ))}
        </div>

        {/* Additional Key Metrics - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{textContent["performance-kpi-title"]}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{textContent["performance-information-ratio-title"]}</h3>
              <div className="text-2xl font-bold text-foreground">{textContent["performance-information-ratio-value"]}</div>
              <p className="text-sm text-muted-foreground">{textContent["performance-information-ratio-vs"]}</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Shield className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{textContent["performance-max-drawdown-title"]}</h3>
              <div className="text-2xl font-bold text-foreground">{textContent["performance-max-drawdown-value"]}</div>
              <p className="text-sm text-muted-foreground">{textContent["performance-max-drawdown-vs"]}</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Target className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{textContent["performance-hit-rate-title"]}</h3>
              <div className="text-2xl font-bold text-foreground">{textContent["performance-hit-rate-value"]}</div>
              <p className="text-sm text-muted-foreground">{textContent["performance-hit-rate-description"]}</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Calendar className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{textContent["performance-positive-months-title"]}</h3>
              <div className="text-2xl font-bold text-foreground">{textContent["performance-positive-months-value"]}</div>
              <p className="text-sm text-muted-foreground">{textContent["performance-positive-months-description"]}</p>
            </div>
          </div>
        </section>

        {/* Performance Breakdown - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{textContent["performance-annual-breakdown-title"]}</h2>
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">{textContent["performance-table-year"]}</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">{textContent["performance-table-smooth-path"]}</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">{textContent["performance-table-sp500"]}</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">{textContent["performance-table-outperformance"]}</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">{textContent["performance-table-volatility"]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2023</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+28.7%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+24.2%</td>
                    <td className="py-3 px-4 text-right text-green-400">+4.5%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">14.2%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2022</td>
                    <td className="py-3 px-4 text-right text-red-400 font-semibold">-8.1%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">-18.1%</td>
                    <td className="py-3 px-4 text-right text-green-400">+10.0%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">16.8%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2021</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+31.2%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+26.9%</td>
                    <td className="py-3 px-4 text-right text-green-400">+4.3%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">18.5%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2020</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+22.8%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+16.3%</td>
                    <td className="py-3 px-4 text-right text-green-400">+6.5%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">21.2%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">2019</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+35.4%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+28.9%</td>
                    <td className="py-3 px-4 text-right text-green-400">+6.5%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">15.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-1 border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area - Enhanced */}
        <div className="bg-card rounded-lg p-8 border border-border mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === 'overall' && textContent["performance-tab-overall-desc"]}
              {activeTab === 'sector' && textContent["performance-tab-sector-desc"]}
              {activeTab === 'risk' && textContent["performance-tab-risk-desc"]}
              {activeTab === 'attribution' && textContent["performance-tab-attribution-desc"]}
            </p>
          </div>
          <StockGraphPlaceholder height="h-96" />
        </div>

        {/* Risk Analysis Section - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{textContent["performance-risk-analysis-title"]}</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">{textContent["performance-downside-title"]}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-downside-bear-market"]}</span>
                  <span className="text-green-400 font-semibold">{textContent["performance-downside-bear-value"]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-downside-deviation"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-downside-deviation-value"]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-downside-sortino"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-downside-sortino-value"]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-downside-calmar"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-downside-calmar-value"]}</span>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">{textContent["performance-portfolio-characteristics-title"]}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-portfolio-beta"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-portfolio-beta-value"]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-portfolio-correlation"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-portfolio-correlation-value"]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-portfolio-tracking-error"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-portfolio-tracking-error-value"]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{textContent["performance-portfolio-position-size"]}</span>
                  <span className="text-foreground font-semibold">{textContent["performance-portfolio-position-size-value"]}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Backtesting Information - Expanded */}
        <div className="bg-muted rounded-lg p-8 border border-border mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Rigorous Backtesting Methodology</h2>
            <p className="text-xl text-muted-foreground">
              Our strategies are validated against 10+ years of historical data using institutional-grade testing protocols
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">10+</div>
              <div className="text-lg font-semibold mb-2">Years of Data</div>
              <p className="text-muted-foreground text-sm">
                Comprehensive testing across multiple market cycles including bull markets, bear markets, and sideways trends
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-lg font-semibold mb-2">Stocks Analyzed</div>
              <p className="text-muted-foreground text-sm">
                Broad universe testing across different market capitalizations, sectors, and geographic regions
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">95%</div>
              <div className="text-lg font-semibold mb-2">Confidence Level</div>
              <p className="text-muted-foreground text-sm">
                Statistical significance in out-of-sample testing protocols with proper train/validation/test splits
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Testing Framework</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Walk-forward analysis with rolling windows</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Monte Carlo simulations for robustness testing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Transaction cost modeling and slippage assumptions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Survivorship bias elimination and point-in-time data</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Validation Process</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Independent verification by third-party auditors</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Stress testing under extreme market conditions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Cross-validation across different time periods</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Regular model performance monitoring and updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Awards and Recognition - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Performance Recognition</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Award className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Best Risk-Adjusted Returns</h3>
              <p className="text-muted-foreground mb-2">Quantitative Finance Review 2023</p>
              <p className="text-sm text-muted-foreground">Recognized for superior Sharpe ratio among peer strategies</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <TrendingUp className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Consistent Alpha Generation</h3>
              <p className="text-muted-foreground mb-2">Alternative Investment Research 2023</p>
              <p className="text-sm text-muted-foreground">Top decile performance across market cycles</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <DollarSign className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Institutional Grade Analytics</h3>
              <p className="text-muted-foreground mb-2">Financial Technology Awards 2023</p>
              <p className="text-sm text-muted-foreground">Excellence in quantitative research methodology</p>
            </div>
          </div>
        </section>

        {/* Portfolio Simulator - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{textContent["performance-simulator-title"]}</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            {textContent["performance-simulator-description"]}
          </p>
          
          <div className="bg-card rounded-lg p-8 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Configuration</h3>
            
            <div className="grid gap-6 mb-6">
              <div>
                <label htmlFor="capital" className="block text-sm font-medium mb-2 text-foreground">
                  {textContent["performance-simulator-capital-label"]}
                </label>
                <input
                  id="capital"
                  type="number"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  min="100"
                  step="100"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="csv" className="block text-sm font-medium text-foreground">
                    {textContent["performance-simulator-strategy-label"]}
                  </label>
                  <button
                    onClick={loadExampleCSV}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {textContent["performance-simulator-example-button"]}
                  </button>
                </div>
                <textarea
                  id="csv"
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Start Date,Assets,Weights&#10;12/31/2019,&quot;AMGN, KR, BAC&quot;,&quot;33.33%, 33.33%, 33.34%&quot;"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {textContent["performance-simulator-strategy-helper"]}
                </p>
              </div>
            </div>

            <button 
              onClick={handleRunBacktest}
              disabled={isRunning}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? 'Running Simulation...' : textContent["performance-simulator-run-button"]}
            </button>
          </div>

          {backtestResult && (
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Results</h3>
              <SimulatorResults results={backtestResult} initialCapital={initialCapital} />
            </div>
          )}

          {!backtestResult && (
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Results</h3>
              <div className="text-center py-12 text-muted-foreground">
                Configure your strategy and run the simulation to see results here
              </div>
            </div>
          )}
        </section>

        {/* Disclaimer - New */}
        <div className="bg-card rounded-lg p-8 border border-border text-center">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Important Disclaimers</h3>
          <div className="text-sm text-muted-foreground space-y-2 max-w-4xl mx-auto">
            <p>
              Past performance is not indicative of future results. All investments carry risk of loss. 
              The performance shown is based on backtested results and includes transaction costs and fees.
            </p>
            <p>
              Results are presented gross of advisory fees. Actual returns may vary due to market conditions, 
              implementation differences, and individual account characteristics.
            </p>
            <p>
              This information is for educational purposes only and should not be construed as investment advice. 
              Please consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
