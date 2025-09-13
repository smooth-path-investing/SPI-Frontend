import React from 'react';
import { Card } from '@/components/ui/card';

export const MissionSection: React.FC = () => {
  const missionPoints = [
    "Make institutional stock investment available to retail investors.",
    "Integrate common sense, math, risk budgets, market expertise and reflections.",
    <>Offer A-to-Z stock investing, from signals to portfolios in your pocket, A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P.</>,
    "Order, segregate, integrate, condition, exclude, and concentrate"
  ];

  return (
    <section className="relative min-h-screen flex items-center py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {missionPoints.map((point, index) => (
            <Card key={index} className="group relative p-8 border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-foreground font-bold text-lg">→</span>
                </div>
                <p className="text-lg sm:text-xl text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                  {point}
                </p>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};