import React from 'react';

export const MissionSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-foreground">Our Mission</h2>
        </div>
        
        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <span className="text-2xl text-primary font-bold mt-1">→</span>
            <p className="text-lg sm:text-xl text-foreground">Make institutional stock investment available to retail investors.</p>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl text-primary font-bold mt-1">→</span>
            <p className="text-lg sm:text-xl text-foreground">Integrate common sense, math, risk budgets, market expertise and reflections.</p>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl text-primary font-bold mt-1">→</span>
            <p className="text-lg sm:text-xl text-foreground">
              Offer A-to-Z stock investing, from signals to portfolios in your pocket, A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl text-primary font-bold mt-1">→</span>
            <p className="text-lg sm:text-xl text-foreground">Order, segregate, integrate, condition, exclude, and concentrate</p>
          </div>
        </div>
      </div>
    </section>
  );
};