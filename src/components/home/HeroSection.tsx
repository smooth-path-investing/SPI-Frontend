import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced 3D Blob Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Organic Floating Shapes */}
      <div className="fixed -top-32 -left-32 w-80 h-80 bg-blob-primary/20 blur-3xl animate-pulse [animation-duration:6s] transform rotate-12" 
           style={{clipPath: 'ellipse(40% 35% at 30% 40%)'}} />
      
      <div className="fixed top-20 -right-24 w-64 h-96 bg-blob-secondary/15 blur-2xl animate-pulse [animation-duration:8s] [animation-delay:2s] transform -rotate-45" 
           style={{clipPath: 'ellipse(60% 30% at 70% 60%) circle(25% at 20% 80%)'}} />
      
      <div className="fixed bottom-0 left-1/5 w-72 h-72 bg-blob-accent/25 blur-xl animate-pulse [animation-duration:7s] [animation-delay:1s] transform rotate-90" 
           style={{clipPath: 'ellipse(45% 50% at 60% 30%)'}} />
      
      <div className="fixed top-1/3 left-0 w-56 h-80 bg-blob-primary/10 blur-2xl animate-pulse [animation-duration:9s] [animation-delay:3s] transform rotate-30" 
           style={{clipPath: 'ellipse(35% 60% at 80% 20%) ellipse(30% 40% at 20% 90%)'}} />
      
      <div className="fixed bottom-1/4 right-0 w-88 h-64 bg-blob-secondary/20 blur-xl animate-pulse [animation-duration:11s] [animation-delay:4s] transform -rotate-60" 
           style={{clipPath: 'ellipse(50% 40% at 30% 70%) ellipse(25% 35% at 90% 10%)'}} />
      
      <div className="fixed top-1/2 right-1/4 w-48 h-48 bg-blob-accent/15 blur-lg animate-pulse [animation-duration:5s] [animation-delay:1.5s] transform rotate-180" 
           style={{clipPath: 'ellipse(60% 40% at 50% 50%)'}} />
      
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
      </div>
    </section>
  );
};