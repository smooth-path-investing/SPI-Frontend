import React from 'react';

export const TrustSection: React.FC = () => {
  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-background z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 text-sm text-muted-foreground">
          <p>Backtested since 2015</p>
          <p>10,000+ simulated portfolios</p>
          <p className="text-xs italic">*Past performance does not guarantee future results</p>
        </div>
      </div>
    </section>
  );
};