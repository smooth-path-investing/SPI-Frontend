import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4 animate-fade-in">
          <Link to="/stocks" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary/25">
              {textContent["home-stats-button-explore"]}
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground hidden sm:block">{textContent["home-stats-or"]}</p>
          <Link to="/approach" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300 hover:shadow-lg">
              {textContent["home-stats-button-method"]}
            </Button>
          </Link>
        </div>
        {/* Enhanced Stats Grid with Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 mb-12 animate-fade-in">
          {/* Featured Stat - Annual Return */}
           <div className="lg:col-span-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20 hover:border-primary/30 transition-all duration-300 hover-scale">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{textContent["home-stats-annual-return"]}</div>
            <div className="text-sm text-muted-foreground font-medium">{textContent["home-stats-annual-return-label"]}</div>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-3">
              <div className="w-4/5 h-1 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Regular Stats */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:bg-accent/30 transition-all duration-300 hover-scale">
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{textContent["home-stats-sharpe-ratio"]}</div>
            <div className="text-sm text-muted-foreground">{textContent["home-stats-sharpe-ratio-label"]}</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:bg-accent/30 transition-all duration-300 hover-scale">
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">{textContent["home-stats-win-rate"]}</div>
            <div className="text-sm text-muted-foreground">{textContent["home-stats-win-rate-label"]}</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:bg-accent/30 transition-all duration-300 hover-scale">
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{textContent["home-stats-max-drawdown"]}</div>
            <div className="text-sm text-muted-foreground">{textContent["home-stats-max-drawdown-label"]}</div>
          </div>
        </div>
        
        {/* Trust Elements */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground animate-fade-in">
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