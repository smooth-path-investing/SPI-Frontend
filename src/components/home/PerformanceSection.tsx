import React from 'react';
import { StockGraphPlaceholder } from '../ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../../constants';

export const PerformanceSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Proven Performance</h2>
          <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2">
            Our track record speaks for itself. Consistent outperformance 
            through systematic, data-driven investment strategies.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <StockGraphPlaceholder height="h-64 sm:h-80 lg:h-96" className="shadow-2xl border border-border" />
            <p className="text-center text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">Real-time performance visualization coming soon</p>
          </div>
          
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            {PERFORMANCE_METRICS.map((metric, index) => (
              <div key={index} className="bg-card rounded-lg p-4 sm:p-6 lg:p-8 border border-border hover:bg-accent/50 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm sm:text-base lg:text-lg">{metric.label}</span>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{metric.value}</div>
                    <div className={`text-sm sm:text-base lg:text-lg ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};