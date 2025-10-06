import React from 'react';
import { Search, Shield, Smartphone, Sparkles } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 text-sm text-muted-foreground animate-fade-in">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>{textContent["home-trust-transparency-title"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>{textContent["home-trust-upselling-title"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span>{textContent["home-trust-mobile-title"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{textContent["home-trust-design-title"]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};