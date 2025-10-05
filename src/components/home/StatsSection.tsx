import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in">
          <Link to="/stocks" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-xl px-16 py-7 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary/25 font-semibold rounded-lg">
              {textContent["home-stats-button-explore"]}
            </Button>
          </Link>
          <span className="text-base text-muted-foreground font-medium hidden sm:block">{textContent["home-stats-or"]}</span>
          <Link to="/approach" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-xl px-16 py-7 border-2 border-border text-foreground hover:bg-accent transition-all duration-300 hover:shadow-lg font-semibold rounded-lg">
              {textContent["home-stats-button-method"]}
            </Button>
          </Link>
        </div>
        
        {/* Trust Elements */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>{textContent["home-stats-trust-backtested"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{textContent["home-stats-trust-portfolios"]}</span>
          </div>
          <div className="text-center">
            <span className="text-xs opacity-80">{textContent["home-stats-trust-disclaimer"]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};