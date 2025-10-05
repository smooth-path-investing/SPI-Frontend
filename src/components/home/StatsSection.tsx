import React from 'react';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
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