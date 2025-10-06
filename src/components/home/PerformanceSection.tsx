import React from 'react';
import { PerformanceChart } from '../charts/PerformanceChart';
import { PERFORMANCE_METRICS } from '../../constants';
import { textContent } from '@/constants/textContent';

export const PerformanceSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{textContent["home-performance-title"]}</h2>
          <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2">
            {textContent["home-performance-subtitle"]}
          </p>
        </div>

        <div className="mb-12">
          <PerformanceChart height="h-64 sm:h-80 lg:h-[500px]" className="shadow-2xl" />
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-semibold">Metric</th>
                  <th className="text-right p-4 font-semibold" style={{ color: '#FFD700' }}>Smooth Path</th>
                  <th className="text-right p-4 text-muted-foreground font-semibold">iShares Core S&P 500 ETF</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Arithmetic Mean (monthly)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>2.30%</td>
                  <td className="p-4 text-right text-muted-foreground">1.37%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Arithmetic Mean (annualized)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>31.36%</td>
                  <td className="p-4 text-right text-muted-foreground">17.68%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Geometric Mean (monthly)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>2.14%</td>
                  <td className="p-4 text-right text-muted-foreground">1.25%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Geometric Mean (annualized)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>28.95%</td>
                  <td className="p-4 text-right text-muted-foreground">16.10%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Standard Deviation (monthly)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>5.79%</td>
                  <td className="p-4 text-right text-muted-foreground">4.81%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Standard Deviation (annualized)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>20.07%</td>
                  <td className="p-4 text-right text-muted-foreground">16.66%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Downside Deviation (monthly)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>2.57%</td>
                  <td className="p-4 text-right text-muted-foreground">3.05%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Maximum Drawdown</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>-14.52%</td>
                  <td className="p-4 text-right text-muted-foreground">-19.56%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Benchmark Correlation</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>0.78</td>
                  <td className="p-4 text-right text-muted-foreground">1.00</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Beta (*)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>0.94</td>
                  <td className="p-4 text-right text-muted-foreground">1.00</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Alpha (annualized)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>12.12%</td>
                  <td className="p-4 text-right text-muted-foreground">0.00%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">R Squared</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>61.33%</td>
                  <td className="p-4 text-right text-muted-foreground">100.00%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Sharpe Ratio</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>1.30</td>
                  <td className="p-4 text-right text-muted-foreground">0.90</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Sortino Ratio</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>2.87</td>
                  <td className="p-4 text-right text-muted-foreground">1.40</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Treynor Ratio (%)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>27.83</td>
                  <td className="p-4 text-right text-muted-foreground">15.06</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Calmar Ratio</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>2.16</td>
                  <td className="p-4 text-right text-muted-foreground">0.86</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Modigliani–Modigliani Measure</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>23.11%</td>
                  <td className="p-4 text-right text-muted-foreground">16.39%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Active Return</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>12.85%</td>
                  <td className="p-4 text-right text-muted-foreground">N/A</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Tracking Error</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>12.52%</td>
                  <td className="p-4 text-right text-muted-foreground">N/A</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Information Ratio</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>1.03</td>
                  <td className="p-4 text-right text-muted-foreground">N/A</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Skewness</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>0.73</td>
                  <td className="p-4 text-right text-muted-foreground">-0.55</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Excess Kurtosis</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>1.93</td>
                  <td className="p-4 text-right text-muted-foreground">1.20</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Historical Value-at-Risk (5%)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>5.71%</td>
                  <td className="p-4 text-right text-muted-foreground">8.05%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Analytical Value-at-Risk (5%)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>7.23%</td>
                  <td className="p-4 text-right text-muted-foreground">6.55%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Conditional Value-at-Risk (5%)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>7.72%</td>
                  <td className="p-4 text-right text-muted-foreground">9.82%</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Upside Capture Ratio (%)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>131.57</td>
                  <td className="p-4 text-right text-muted-foreground">100.00</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Downside Capture Ratio (%)</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>78.91</td>
                  <td className="p-4 text-right text-muted-foreground">100.00</td>
                </tr>
                <tr className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Positive Periods</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>32 out of 46 (69.57%)</td>
                  <td className="p-4 text-right text-muted-foreground">34 out of 46 (73.91%)</td>
                </tr>
                <tr className="hover:bg-accent/30 transition-colors">
                  <td className="p-4 text-muted-foreground">Gain/Loss Ratio</td>
                  <td className="p-4 text-right font-medium" style={{ color: '#FFD700' }}>1.25</td>
                  <td className="p-4 text-right text-muted-foreground">0.68</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-muted/30 text-xs text-muted-foreground border-t border-border">
            <p className="mb-1"><strong>Risk and Return Metrics (Jun 2017 - Mar 2021)</strong></p>
            <p>(*) iShares Core S&P 500 ETF is used as the benchmark for calculations. Value-at-risk metrics are monthly values.</p>
          </div>
        </div>
      </div>
    </section>
  );
};