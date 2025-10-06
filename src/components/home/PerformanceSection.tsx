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

        {/* Key Metrics Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Return */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-sm text-muted-foreground mb-4">{textContent["home-performance-metric-total-return"]}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#FFD700' }}>{textContent["home-performance-label-smooth-path"]}</span>
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>28.95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">{textContent["home-performance-label-sp500"]}</span>
                <span className="text-2xl font-bold text-muted-foreground">16.10%</span>
              </div>
            </div>
          </div>

          {/* Max Drawdown */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-sm text-muted-foreground mb-4">{textContent["home-performance-metric-max-drawdown"]}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#FFD700' }}>{textContent["home-performance-label-smooth-path"]}</span>
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>-14.52%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">{textContent["home-performance-label-sp500"]}</span>
                <span className="text-2xl font-bold text-muted-foreground">-19.56%</span>
              </div>
            </div>
          </div>

          {/* Sharpe Ratio */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-sm text-muted-foreground mb-4">{textContent["home-performance-metric-sharpe-ratio"]}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#FFD700' }}>{textContent["home-performance-label-smooth-path"]}</span>
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>1.30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">{textContent["home-performance-label-sp500"]}</span>
                <span className="text-2xl font-bold text-muted-foreground">0.90</span>
              </div>
            </div>
          </div>

          {/* Gain/Loss Ratio */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-sm text-muted-foreground mb-4">{textContent["home-performance-metric-gain-loss"]}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#FFD700' }}>{textContent["home-performance-label-smooth-path"]}</span>
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>1.25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">{textContent["home-performance-label-sp500"]}</span>
                <span className="text-2xl font-bold text-muted-foreground">0.68</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};