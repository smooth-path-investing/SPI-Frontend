import React from 'react';

export const PortfolioOverview: React.FC = () => {
  return (
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
  );
};