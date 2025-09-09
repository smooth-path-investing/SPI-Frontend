
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { AnimatedKeywords } from '../components/ui/animated-keywords';
import { PERFORMANCE_METRICS } from '../constants';
import { BarChart3, Brain, TrendingUp, Shield, Smartphone, Sparkles, Search, CheckCircle, Users, Clock, Award } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Animated Keywords Background */}
      <AnimatedKeywords />
      
      {/* Mission Section - Fixed at top */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-card/20 z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">Our Mission</h2>
          <div className="space-y-4">
            <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
              <div className="flex items-center mb-2">
                <span className="text-primary mr-2">→</span>
                <span className="text-foreground">Make institutional stock investment available to retail investors.</span>
              </div>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
              <div className="flex items-center mb-2">
                <span className="text-primary mr-2">→</span>
                <span className="text-foreground">Integrate common sense, math*, risk budgets*, market expertise* and reflections.</span>
              </div>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
              <div className="flex items-center mb-2">
                <span className="text-primary mr-2">→</span>
                <span className="text-foreground">Offer A-to-Z stock investing, from signals to portfolios in your pocket, A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P*.</span>
              </div>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
              <div className="flex items-center mb-2">
                <span className="text-primary mr-2">→</span>
                <span className="text-foreground">Order, segregate, integrate, condition, exclude, and concentrate</span>
              </div>
            </div>
          </div>
          
          {/* Expandable Details */}
          <div className="mt-8 space-y-4">
            <details className="bg-card p-4 rounded-lg border border-border">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">*math: SigGA Algorithm</summary>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>SigGA (Signature Genetic Algorithm) is a proprietary quantitative modeling framework developed entirely in-house by Ramy Sukarieh. It integrates advanced mathematical tools—including path signatures from rough path theory, genetic algorithms, biology-inspired evolutionary computation, for factor selection, and custom regression architectures—to identify predictive signals in financial time series.</p>
              </div>
            </details>
            
            <details className="bg-card p-4 rounded-lg border border-border">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">*risk budgets: Portfolio Guidelines</summary>
              <div className="mt-3 text-sm text-muted-foreground space-y-2">
                <p><strong>Aggressive:</strong> 10-13 stocks, 8-10% each</p>
                <p><strong>Moderate:</strong> 14-25 stocks, 4-5% each, 5-10% in S&P 500</p>
                <p><strong>Conservative:</strong> 27-40 stocks, 2-3% each, 10-25% in market index</p>
                <p>Our AI system RAs "the Sun God of Stocks" guides buy/sell decisions.</p>
              </div>
            </details>
            
            <details className="bg-card p-4 rounded-lg border border-border">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">*market expertise: Key Principles</summary>
              <div className="mt-3 text-sm text-muted-foreground space-y-1">
                <p>• Sell only if returned ≥30% or 10-15% above S&P 500</p>
                <p>• Never bet against the S&P 500 long-term</p>
                <p>• Always buy when market drops significantly</p>
                <p>• Best predictions ignore daily news</p>
              </div>
            </details>
            
            <details className="bg-card p-4 rounded-lg border border-border">
              <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">*A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P: Our Framework</summary>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>From A to Z, Squared: Complete investment pipeline from signal extraction to portfolio execution. Dynamic stock portfolios (S<sub>p</sub>) within an evolving space (P) of advanced investment strategies—all in your pocket.</p>
              </div>
            </details>
          </div>
        </div>
      </section>
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            Smarter Stock Picks
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
            AI-powered investment strategies backed by rigorous backtesting. 
            Transparent methodology, superior performance, designed for everyone.
          </p>
          <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <Link to="/stocks" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Explore Our Picks
              </Button>
            </Link>
            <Link to="/approach" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
                See Our Method
              </Button>
            </Link>
          </div>
          
          {/* Key Stats - Mobile Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">23.4%</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Annual Return</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">1.42</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Sharpe Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">68%</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">-8.2%</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Max Drawdown</div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Snapshot - Mobile Optimized */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Proven Performance</h2>
            <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2">
              Our track record speaks for itself. Consistent outperformance 
              through systematic, data-driven investment strategies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <StockGraphPlaceholder height="h-64 sm:h-80 lg:h-96" className="shadow-2xl border border-border" />
              <p className="text-center text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">Real-time performance visualization coming soon</p>
            </div>
            
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
              {PERFORMANCE_METRICS.map((metric, index) => (
                <div key={index} className="bg-card rounded-lg p-4 sm:p-6 lg:p-8 border border-border hover:bg-accent/50 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm sm:text-base lg:text-lg">{metric.label}</span>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{metric.value}</div>
                      <div className={`text-sm sm:text-base lg:text-lg ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
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

      {/* Our Methodology Preview - Mobile Optimized */}
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

      {/* Trust & Transparency Section - Mobile Optimized */}
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

      {/* Why Choose Us Section - Mobile Optimized */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Why Choose Smooth Path Investing?</h2>
            <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-4xl mx-auto px-2">
              We've addressed the pain points of traditional investment platforms to create something better.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Beginner-Friendly Interface</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">No complex jargon or cluttered dashboards. Simple, clear insights anyone can understand.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Institutional-Grade Research</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Advanced algorithms and models typically reserved for hedge funds, now accessible to everyone.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Real Performance Tracking</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Honest, auditable results with complete historical data and methodology transparency.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No Hidden Agendas</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">We don't profit from your trades. Our success is tied to providing valuable, unbiased research.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Continuous Innovation</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Regular updates to our models and new features based on the latest market research.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Expert Team</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Experienced quants, data scientists, and financial analysts working together.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section - Mobile Optimized */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Success Stories</h2>
            <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2">
              Real results from our stock picking methodology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
              <div className="flex items-center mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-foreground mr-2 sm:mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold">Tech Sector Outperformance</h3>
              </div>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Our AI identified undervalued tech stocks that outperformed NASDAQ by 15% in 2023.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-green-400">+32.7%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">vs NASDAQ +17.2%</div>
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
              <div className="flex items-center mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-foreground mr-2 sm:mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold">Risk Management</h3>
              </div>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                During market volatility, our defensive picks preserved capital while maintaining growth.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-green-400">-3.1%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">vs S&P 500 -12.4%</div>
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
              <div className="flex items-center mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-foreground mr-2 sm:mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold">Long-term Consistency</h3>
              </div>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                10-year backtested results show consistent alpha generation across market cycles.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-green-400">23.4%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Annual compound return</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Mobile Optimized */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to Upgrade Your Investment Strategy?</h2>
          <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground mb-8 sm:mb-12 px-2">
            Join thousands of investors who have discovered the power of data-driven stock selection.
          </p>
          <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center px-4">
            <Link to="/stocks" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                View Current Picks
              </Button>
            </Link>
            <Link to="/performance" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300">
                See Track Record
              </Button>
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8 px-2">
            No credit card required • Full transparency • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};
