
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
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Historical Performance
          </h1>
          <p className="text-xl text-gray-400">
            Transparency through data - see how our strategies have performed over time
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {PERFORMANCE_METRICS.map((metric, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-700 text-center">
              <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className={`text-sm ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change} vs last period
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-1 border border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700 mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className="text-gray-400">
              {activeTab === 'overall' && 'Cumulative returns compared to major benchmarks'}
              {activeTab === 'sector' && 'Performance breakdown by industry sectors'}
              {activeTab === 'risk' && 'Risk-adjusted metrics and drawdown analysis'}
            </p>
          </div>
          <StockGraphPlaceholder height="h-96" />
        </div>

        {/* Backtesting Information */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Rigorous Backtesting</h2>
            <p className="text-xl text-gray-400">
              Our strategies are validated against 10+ years of historical data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
              <div className="text-lg font-semibold mb-2">Years of Data</div>
              <p className="text-gray-400 text-sm">
                Comprehensive testing across multiple market cycles and conditions
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-lg font-semibold mb-2">Stocks Analyzed</div>
              <p className="text-gray-400 text-sm">
                Broad universe testing across different market capitalizations
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-lg font-semibold mb-2">Confidence Level</div>
              <p className="text-gray-400 text-sm">
                Statistical significance in out-of-sample testing protocols
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
