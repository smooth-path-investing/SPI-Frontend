import React from 'react';
import { Search, Shield, Smartphone, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Built on Trust & Transparency</h2>
        <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground mb-12 sm:mb-16 max-w-4xl mx-auto px-2">
          No hidden fees, no aggressive upselling, no cluttered interfaces. 
          Just clear insights and honest performance tracking.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Full Transparency</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Complete methodology disclosure and performance tracking</p>
          </div>
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">No Upselling</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Soft CTAs and genuine value, not pressure tactics</p>
          </div>
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Mobile First</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Fast, responsive design that works on any device</p>
          </div>
          <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Clean Design</h3>
            <p className="text-muted-foreground text-sm sm:text-base">No clutter, just the insights that matter</p>
          </div>
        </div>
      </div>
    </section>
  );
};