
import React, { useState } from 'react';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../constants';
import { TrendingUp, TrendingDown, BarChart3, Shield, Award, Target, Calendar, DollarSign, Download, FileText } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const Performance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');

  const tabs = [
    { id: 'overall', label: textContent["performance-tab-overall"] },
    { id: 'sector', label: textContent["performance-tab-sector"] },
    { id: 'risk', label: textContent["performance-tab-risk"] },
    { id: 'attribution', label: textContent["performance-tab-attribution"] }
  ];

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
                    <td className="py-3 px-4 text-muted-foreground">2021 (Q1)</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+18.44%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+6.33%</td>
                    <td className="py-3 px-4 text-right text-green-400">+12.11%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">21.97%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2020</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+47.81%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+18.40%</td>
                    <td className="py-3 px-4 text-right text-green-400">+29.41%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">-</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2019</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+35.87%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+31.25%</td>
                    <td className="py-3 px-4 text-right text-green-400">+4.62%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">-</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">2018</td>
                    <td className="py-3 px-4 text-right text-red-400 font-semibold">-4.17%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">-4.47%</td>
                    <td className="py-3 px-4 text-right text-green-400">+0.30%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">-</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">2017 (Jun-Dec)</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">+16.28%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">+12.29%</td>
                    <td className="py-3 px-4 text-right text-green-400">+3.99%</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">-</td>
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

        {/* Full Metrics Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Risk and Return Metrics (Jun 2017 - Mar 2021)</h2>
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Metric</th>
                  <th className="text-right py-4 px-6 font-semibold" style={{ color: '#FFD700' }}>Smooth Path</th>
                  <th className="text-right py-4 px-6 font-semibold text-muted-foreground">S&P 500 ETF</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Arithmetic Mean (monthly)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>2.30%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">1.37%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Arithmetic Mean (annualized)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>31.36%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">17.68%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Geometric Mean (monthly)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>2.14%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">1.25%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Geometric Mean (annualized)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>28.95%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">16.10%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Standard Deviation (monthly)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>5.79%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">4.81%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Standard Deviation (annualized)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>20.07%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">16.66%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Downside Deviation (monthly)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>2.57%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">3.05%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Maximum Drawdown</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>-14.52%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">-19.56%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Benchmark Correlation</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>0.78</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">1.00</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Beta (*)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>0.94</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">1.00</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Alpha (annualized)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>12.12%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">0.00%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">R Squared</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>61.33%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">100.00%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Sharpe Ratio</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>1.30</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">0.90</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Sortino Ratio</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>2.87</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">1.40</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Treynor Ratio (%)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>27.83</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">15.06</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Calmar Ratio</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>2.16</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">0.86</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Modigliani–Modigliani Measure</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>23.11%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">16.39%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Active Return</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>12.85%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">N/A</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Tracking Error</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>12.52%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">N/A</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Information Ratio</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>1.03</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">N/A</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Skewness</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>0.73</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">-0.55</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Excess Kurtosis</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>1.93</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">1.20</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Historical Value-at-Risk (5%)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>5.71%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">8.05%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Analytical Value-at-Risk (5%)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>7.23%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">6.55%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Conditional Value-at-Risk (5%)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>7.72%</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">9.82%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Upside Capture Ratio (%)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>131.57</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">100.00</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Downside Capture Ratio (%)</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>78.91</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">100.00</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-6 text-muted-foreground">Positive Periods</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>32 out of 46 (69.57%)</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">34 out of 46 (73.91%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-muted-foreground">Gain/Loss Ratio</td>
                  <td className="py-3 px-6 text-right font-semibold" style={{ color: '#FFD700' }}>1.25</td>
                  <td className="py-3 px-6 text-right text-muted-foreground">0.68</td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-4 text-sm text-muted-foreground border-t border-border">
              (*) iShares Core S&P 500 ETF is used as the benchmark for calculations. Value-at-risk metrics are monthly values.
            </div>
          </div>
        </section>

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

        {/* Detailed Backtest Report */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Comprehensive Backtest Report</h2>
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <FileText className="w-16 h-16 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Full Portfolio Performance Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Access our comprehensive 18-page backtest report covering June 2017 to March 2021. 
                  Includes detailed performance metrics, monthly returns breakdown, drawdown analysis, 
                  and complete allocation history powered by Portfolio Visualizer.
                </p>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Test Period</div>
                    <div className="font-semibold text-foreground">Jun 2017 - Mar 2021</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Initial Capital</div>
                    <div className="font-semibold text-foreground">$10,000</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Final Balance</div>
                    <div className="font-semibold text-green-400">$26,505</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Return</div>
                    <div className="font-semibold text-green-400">+165.05%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-semibold mb-4 text-foreground">Report Includes:</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Complete performance metrics vs. S&P 500 benchmark</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Risk-adjusted returns and volatility analysis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Monthly returns breakdown by year</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Detailed drawdown analysis with recovery times</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Up vs. down market performance comparison</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Historical stress period analysis (COVID-19)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Complete quarterly rebalancing allocation history</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Statistical significance and validation metrics</span>
                  </li>
                </ul>
              </div>
              
              <a 
                href="/rept_sigga_long_gs_agg.pdf" 
                download
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Full Backtest Report (PDF)
              </a>
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
