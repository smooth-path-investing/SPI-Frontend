
import React, { useState } from 'react';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../constants';
import { TrendingUp, TrendingDown, BarChart3, Shield, Award, Target, Calendar, DollarSign } from 'lucide-react';

export const Performance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');

  const tabs = [
    { id: 'overall', label: 'Overall Performance' },
    { id: 'sector', label: 'Sector Performance' },
    { id: 'risk', label: 'Risk Metrics' },
    { id: 'attribution', label: 'Performance Attribution' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Historical Performance
          </h1>
          <p className="text-xl text-muted-foreground">
            Transparency through data - see how our strategies have performed over time with complete accountability
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
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Key Performance Indicators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Information Ratio</h3>
              <div className="text-2xl font-bold text-foreground">1.34</div>
              <p className="text-sm text-muted-foreground">vs Benchmark 0.82</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Shield className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Maximum Drawdown</h3>
              <div className="text-2xl font-bold text-foreground">-8.2%</div>
              <p className="text-sm text-muted-foreground">vs S&P 500 -19.6%</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Target className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Hit Rate</h3>
              <div className="text-2xl font-bold text-foreground">68.4%</div>
              <p className="text-sm text-muted-foreground">Winning positions</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Calendar className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Positive Months</h3>
              <div className="text-2xl font-bold text-foreground">78%</div>
              <p className="text-sm text-muted-foreground">Over 5 years</p>
            </div>
          </div>
        </section>

        {/* Performance Breakdown - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Annual Performance Breakdown</h2>
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Year</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Smooth Path</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">S&P 500</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Outperformance</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Volatility</th>
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
              {activeTab === 'overall' && 'Cumulative returns compared to major benchmarks including transaction costs'}
              {activeTab === 'sector' && 'Performance breakdown by industry sectors and market cap categories'}
              {activeTab === 'risk' && 'Risk-adjusted metrics, volatility analysis, and drawdown characteristics'}
              {activeTab === 'attribution' && 'Factor decomposition showing sources of outperformance'}
            </p>
          </div>
          <StockGraphPlaceholder height="h-96" />
        </div>

        {/* Risk Analysis Section - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Risk Analysis</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Downside Protection</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bear Market Performance (2022)</span>
                  <span className="text-green-400 font-semibold">-8.1% vs -18.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Downside Deviation</span>
                  <span className="text-foreground font-semibold">8.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sortino Ratio</span>
                  <span className="text-foreground font-semibold">2.14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Calmar Ratio</span>
                  <span className="text-foreground font-semibold">2.86</span>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Portfolio Characteristics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Beta vs S&P 500</span>
                  <span className="text-foreground font-semibold">0.87</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Correlation with Market</span>
                  <span className="text-foreground font-semibold">0.81</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tracking Error</span>
                  <span className="text-foreground font-semibold">7.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Position Size</span>
                  <span className="text-foreground font-semibold">3.2%</span>
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
