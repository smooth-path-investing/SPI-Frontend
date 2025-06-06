
import React, { useState } from 'react';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../constants';

export const Performance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');

  const tabs = [
    { id: 'overall', label: 'Overall Performance' },
    { id: 'sector', label: 'Sector Performance' },
    { id: 'risk', label: 'Risk Metrics' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Historical Performance
          </h1>
          <p className="text-xl text-muted-foreground">
            Transparency through data - see how our strategies have performed over time
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {PERFORMANCE_METRICS.map((metric, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border text-center">
              <h3 className="text-muted-foreground text-sm mb-2">{metric.label}</h3>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className={`text-sm ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change} vs last period
              </div>
            </div>
          ))}
        </div>

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

        {/* Chart Area */}
        <div className="bg-card rounded-lg p-8 border border-border mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === 'overall' && 'Cumulative returns compared to major benchmarks'}
              {activeTab === 'sector' && 'Performance breakdown by industry sectors'}
              {activeTab === 'risk' && 'Risk-adjusted metrics and drawdown analysis'}
            </p>
          </div>
          <StockGraphPlaceholder height="h-96" />
        </div>

        {/* Backtesting Information */}
        <div className="bg-muted rounded-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Rigorous Backtesting</h2>
            <p className="text-xl text-muted-foreground">
              Our strategies are validated against 10+ years of historical data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">10+</div>
              <div className="text-lg font-semibold mb-2">Years of Data</div>
              <p className="text-muted-foreground text-sm">
                Comprehensive testing across multiple market cycles and conditions
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-lg font-semibold mb-2">Stocks Analyzed</div>
              <p className="text-muted-foreground text-sm">
                Broad universe testing across different market capitalizations
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">95%</div>
              <div className="text-lg font-semibold mb-2">Confidence Level</div>
              <p className="text-muted-foreground text-sm">
                Statistical significance in out-of-sample testing protocols
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
