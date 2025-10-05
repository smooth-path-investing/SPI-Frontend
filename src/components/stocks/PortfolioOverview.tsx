import React from 'react';
import { textContent } from '@/constants/textContent';

export const PortfolioOverview: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="bg-card rounded-lg p-8 border border-border">
        <h2 className="text-2xl font-bold mb-6 text-foreground">{textContent["stocks-portfolio-title"]}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{textContent["stocks-portfolio-positions-value"]}</div>
            <div className="text-muted-foreground">{textContent["stocks-portfolio-positions"]}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{textContent["stocks-portfolio-performance-value"]}</div>
            <div className="text-muted-foreground">{textContent["stocks-portfolio-performance"]}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{textContent["stocks-portfolio-win-rate-value"]}</div>
            <div className="text-muted-foreground">{textContent["stocks-portfolio-win-rate"]}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{textContent["stocks-portfolio-sharpe-value"]}</div>
            <div className="text-muted-foreground">{textContent["stocks-portfolio-sharpe"]}</div>
          </div>
        </div>
      </div>
    </section>
  );
};