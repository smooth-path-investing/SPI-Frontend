import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced 3D Blob Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Animated 3D Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-[40%_60%_70%_30%] blur-xl animate-[spin_20s_linear_infinite] opacity-80" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/15 via-accent/10 to-transparent rounded-[60%_40%_30%_70%] blur-2xl animate-[spin_25s_linear_infinite_reverse] opacity-70" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-tr from-primary/15 via-primary/8 to-transparent rounded-[30%_70%_40%_60%] blur-xl animate-[spin_30s_linear_infinite] opacity-60" />
      
      {/* Floating Wave Lines */}
      <div className="absolute top-1/4 left-0 w-full h-32 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform rotate-12 animate-pulse [animation-duration:3s]" 
             style={{clipPath: 'polygon(0% 50%, 25% 40%, 50% 60%, 75% 30%, 100% 50%, 100% 100%, 0% 100%)'}} />
      </div>
      <div className="absolute bottom-1/4 right-0 w-full h-24 opacity-15">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-secondary/25 to-transparent transform -rotate-6 animate-pulse [animation-duration:4s] [animation-delay:1s]" 
             style={{clipPath: 'polygon(0% 40%, 30% 60%, 60% 35%, 90% 55%, 100% 45%, 100% 100%, 0% 100%)'}} />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                 linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px'
             }} />
      </div>
      
      {/* Floating Orbs with Lines */}
      <div className="absolute top-20 right-10 opacity-10">
        <div className="relative">
          <TrendingUp className="w-32 h-32 text-primary animate-pulse" />
          <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping [animation-duration:4s]" />
        </div>
      </div>
      
      {/* Morphing Background Shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-10">
        <div className="w-full h-full bg-gradient-conic from-primary/20 via-secondary/10 to-accent/15 rounded-[40%_60%_30%_70%] blur-3xl animate-[spin_40s_linear_infinite]" />
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            Smarter Stock Picks
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2 [line-height:1.4]">
            AI-powered investment strategies backed by rigorous backtesting. 
            Transparent methodology, superior performance, designed for everyone.
          </p>
        </div>
        
        {/* Enhanced CTAs - Side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20 px-4 animate-fade-in [animation-delay:0.2s]">
          <Link to="/stocks" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary/25">
              Explore Our Picks
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground hidden sm:block">or</p>
          <Link to="/approach" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-border text-foreground hover:bg-accent transition-all duration-300 hover:shadow-lg">
              See Our Method
            </Button>
          </Link>
        </div>
        
        {/* Enhanced Stats Grid with Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 mb-8 animate-fade-in [animation-delay:0.4s]">
          {/* Featured Stat - Annual Return */}
          <div className="lg:col-span-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20 hover:border-primary/30 transition-all duration-300 hover-scale">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">23.4%</div>
            <div className="text-sm text-muted-foreground font-medium">Annual Return</div>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-3">
              <div className="w-4/5 h-1 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Regular Stats */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:bg-accent/30 transition-all duration-300 hover-scale">
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">1.42</div>
            <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:bg-accent/30 transition-all duration-300 hover-scale">
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">68%</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:bg-accent/30 transition-all duration-300 hover-scale">
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">-8.2%</div>
            <div className="text-sm text-muted-foreground">Max Drawdown</div>
          </div>
        </div>
        
        {/* Trust Elements */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground animate-fade-in [animation-delay:0.6s]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Backtested since 2015</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>10,000+ simulated portfolios</span>
          </div>
          <div className="text-center">
            <span className="text-xs opacity-80">*Past performance does not guarantee future results</span>
          </div>
        </div>
      </div>
    </section>
  );
};