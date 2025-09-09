import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Brain, TrendingUp } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Our Methodology</h2>
          <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-4xl mx-auto px-2">
            Combining traditional financial analysis with cutting-edge AI to identify 
            the best investment opportunities in today's markets.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          <div className="bg-card p-6 sm:p-8 lg:p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4 sm:mb-6">
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">Factor Models</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">Multi-factor quantitative analysis of fundamentals, technicals, and sentiment to identify undervalued opportunities</p>
          </div>
          <div className="bg-card p-6 sm:p-8 lg:p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">AI Signals</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">Machine learning algorithms processing vast market datasets to predict price movements and trends</p>
          </div>
          <div className="bg-card p-6 sm:p-8 lg:p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4 sm:mb-6">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">Backtested Rules</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">Rigorously tested investment rules with 10+ years of validation and proven risk-adjusted returns</p>
          </div>
        </div>
        
        <div className="text-center px-4">
          <Link to="/approach" className="w-full sm:w-auto inline-block">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
              Learn More About Our Approach
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};