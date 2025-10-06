import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cpu, Brain, TrendingUp } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const MethodologySection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{textContent["home-methodology-title"]}</h2>
          <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-4xl mx-auto px-2">
            {textContent["home-methodology-subtitle"]}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          <div className="bg-card p-6 sm:p-8 lg:p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">{textContent["home-methodology-factor-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{textContent["home-methodology-factor-description"]}</p>
          </div>
          <div className="bg-card p-6 sm:p-8 lg:p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">{textContent["home-methodology-ai-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{textContent["home-methodology-ai-description"]}</p>
          </div>
          <div className="bg-card p-6 sm:p-8 lg:p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4 sm:mb-6">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">{textContent["home-methodology-backtested-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{textContent["home-methodology-backtested-description"]}</p>
          </div>
        </div>
        
        <div className="text-center px-4">
          <Link to="/approach" className="w-full sm:w-auto inline-block">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
              {textContent["home-methodology-button"]}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};