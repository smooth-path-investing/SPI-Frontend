import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
          Smarter Stock Picks
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
          AI-powered investment strategies backed by rigorous backtesting. 
          Transparent methodology, superior performance, designed for everyone.
        </p>
        <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
          <Link to="/stocks" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Explore Our Picks
            </Button>
          </Link>
          <Link to="/approach" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
              See Our Method
            </Button>
          </Link>
        </div>
        
        {/* Key Stats - Mobile Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">23.4%</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Annual Return</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">1.42</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Sharpe Ratio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">68%</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">-8.2%</div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Max Drawdown</div>
          </div>
        </div>
      </div>
    </section>
  );
};