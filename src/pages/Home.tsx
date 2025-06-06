
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../constants';
import { BarChart3, Brain, TrendingUp, Shield, Smartphone, Sparkles, Search } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Expanded */}
      <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-foreground leading-tight">
            Smarter Stock Picks
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            AI-powered investment strategies backed by rigorous backtesting. 
            Transparent methodology, superior performance, designed for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/stocks">
              <Button size="lg" className="text-xl px-12 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Explore Our Picks
              </Button>
            </Link>
            <Link to="/approach">
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
                See Our Method
              </Button>
            </Link>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">23.4%</div>
              <div className="text-muted-foreground">Annual Return</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">1.42</div>
              <div className="text-muted-foreground">Sharpe Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">68%</div>
              <div className="text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">-8.2%</div>
              <div className="text-muted-foreground">Max Drawdown</div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Snapshot - Expanded */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Proven Performance</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Our track record speaks for itself. Consistent outperformance 
              through systematic, data-driven investment strategies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <StockGraphPlaceholder height="h-96" className="shadow-2xl border border-border" />
              <p className="text-center text-muted-foreground mt-4">Real-time performance visualization coming soon</p>
            </div>
            
            <div className="space-y-8">
              {PERFORMANCE_METRICS.map((metric, index) => (
                <div key={index} className="bg-card rounded-lg p-8 border border-border hover:bg-accent/50 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-lg">{metric.label}</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                      <div className={`text-lg ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology Preview - Expanded */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Methodology</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Combining traditional financial analysis with cutting-edge AI to identify 
              the best investment opportunities in today's markets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="bg-card p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <BarChart3 className="w-12 h-12 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Factor Models</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Multi-factor quantitative analysis of fundamentals, technicals, and sentiment to identify undervalued opportunities</p>
            </div>
            <div className="bg-card p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <Brain className="w-12 h-12 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-center">AI Signals</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Machine learning algorithms processing vast market datasets to predict price movements and trends</p>
            </div>
            <div className="bg-card p-12 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <TrendingUp className="w-12 h-12 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Backtested Rules</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Rigorously tested investment rules with 10+ years of validation and proven risk-adjusted returns</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/approach">
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
                Learn More About Our Approach
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Built on Trust & Transparency</h2>
          <p className="text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto">
            No hidden fees, no aggressive upselling, no cluttered interfaces. 
            Just clear insights and honest performance tracking.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <Search className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Full Transparency</h3>
              <p className="text-muted-foreground">Complete methodology disclosure and performance tracking</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Upselling</h3>
              <p className="text-muted-foreground">Soft CTAs and genuine value, not pressure tactics</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <Smartphone className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile First</h3>
              <p className="text-muted-foreground">Fast, responsive design that works on any device</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Clean Design</h3>
              <p className="text-muted-foreground">No clutter, just the insights that matter</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
