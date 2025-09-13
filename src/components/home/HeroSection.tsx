import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced 3D Blob Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Floating Abstract Shapes */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-blob-primary/25 blur-3xl animate-pulse [animation-duration:8s] transform rotate-45" 
           style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}} />
      
      <div className="fixed top-1/4 -right-32 w-80 h-80 bg-blob-secondary/20 blur-2xl animate-pulse [animation-duration:12s] [animation-delay:3s] transform -rotate-12" 
           style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'}} />
      
      <div className="fixed bottom-10 left-1/4 w-64 h-64 bg-blob-accent/30 blur-xl animate-pulse [animation-duration:10s] [animation-delay:2s] transform rotate-12" 
           style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}} />
      
      <div className="fixed top-1/2 left-10 w-48 h-48 bg-blob-primary/15 blur-2xl animate-pulse [animation-duration:14s] [animation-delay:1s] transform rotate-45" 
           style={{clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)'}} />
      
      <div className="fixed bottom-1/3 right-10 w-56 h-56 bg-blob-accent/25 blur-xl animate-pulse [animation-duration:16s] [animation-delay:4s] transform -rotate-30" 
           style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'}} />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            Smarter Stock Picks
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2 [line-height:1.4]">
            Make institutional stock investment available to retail investors
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