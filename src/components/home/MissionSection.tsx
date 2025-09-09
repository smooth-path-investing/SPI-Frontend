import React from 'react';

export const MissionSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-transparent z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Democratizing institutional-grade investment strategies through advanced AI and transparent methodology
          </p>
        </div>
        
        {/* Core Mission Points */}
        <div className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground">Make institutional stock investment available to retail investors</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground">Integrate advanced mathematics with market wisdom</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground">Deliver A-to-Z investing: A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground">Provide intelligent portfolio construction and risk management</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technical Details - Collapsible */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <details className="group bg-card/30 p-5 rounded-lg border border-border/50 hover:bg-card/50 transition-all duration-200">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between">
                SigGA Algorithm
                <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Proprietary quantitative framework integrating path signatures, genetic algorithms, and custom regression architectures for predictive financial modeling.
              </div>
            </details>
            
            <details className="group bg-card/30 p-5 rounded-lg border border-border/50 hover:bg-card/50 transition-all duration-200">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between">
                Risk Management
                <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-sm text-muted-foreground space-y-2">
                <div><strong className="text-foreground">Aggressive:</strong> 10-13 stocks (8-10% each)</div>
                <div><strong className="text-foreground">Moderate:</strong> 14-25 stocks (4-5% each + index)</div>
                <div><strong className="text-foreground">Conservative:</strong> 27-40 stocks (2-3% each + index)</div>
              </div>
            </details>
          </div>
          
          <div className="space-y-4">
            <details className="group bg-card/30 p-5 rounded-lg border border-border/50 hover:bg-card/50 transition-all duration-200">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between">
                Market Principles
                <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-sm text-muted-foreground space-y-1">
                <div>• Long-term S&P 500 bullish stance</div>
                <div>• Buy significant market drops</div>
                <div>• Ignore daily market noise</div>
                <div>• Systematic profit-taking rules</div>
              </div>
            </details>
            
            <details className="group bg-card/30 p-5 rounded-lg border border-border/50 hover:bg-card/50 transition-all duration-200">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between">
                A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P Framework
                <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Complete investment pipeline: from signal extraction to dynamic portfolio construction within an evolving space of advanced strategies—all accessible on mobile.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};