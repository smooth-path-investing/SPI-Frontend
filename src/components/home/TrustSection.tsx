import React from 'react';
import { Search, Shield, Smartphone, Sparkles } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const TrustSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{textContent["home-trust-title"]}</h2>
        <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground mb-12 sm:mb-16 max-w-4xl mx-auto px-2">
          {textContent["home-trust-subtitle"]}
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{textContent["home-trust-transparency-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{textContent["home-trust-transparency-description"]}</p>
          </div>
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{textContent["home-trust-upselling-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{textContent["home-trust-upselling-description"]}</p>
          </div>
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{textContent["home-trust-mobile-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{textContent["home-trust-mobile-description"]}</p>
          </div>
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{textContent["home-trust-design-title"]}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{textContent["home-trust-design-description"]}</p>
          </div>
        </div>
      </div>
    </section>
  );
};