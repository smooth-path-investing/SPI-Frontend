import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-40 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-pulse [animation-duration:8s]" />
      
      {/* Organic Floating Shapes with enhanced animations */}
      <div className="fixed -top-32 -left-32 w-80 h-80 bg-blob-primary/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite,float_20s_ease-in-out_infinite] transform rotate-12" 
           style={{clipPath: 'ellipse(40% 35% at 30% 40%)'}} />
      
      <div className="fixed top-20 -right-24 w-64 h-96 bg-blob-secondary/15 blur-2xl animate-[pulse_8s_ease-in-out_infinite,float_25s_ease-in-out_infinite_reverse] [animation-delay:2s] transform -rotate-45" 
           style={{clipPath: 'ellipse(60% 30% at 70% 60%) circle(25% at 20% 80%)'}} />
      
      <div className="fixed bottom-0 left-1/5 w-72 h-72 bg-blob-accent/25 blur-xl animate-[pulse_7s_ease-in-out_infinite,float_18s_ease-in-out_infinite] [animation-delay:1s] transform rotate-90" 
           style={{clipPath: 'ellipse(45% 50% at 60% 30%)'}} />
      
      <div className="fixed top-1/3 left-0 w-56 h-80 bg-blob-primary/10 blur-2xl animate-[pulse_9s_ease-in-out_infinite,float_22s_ease-in-out_infinite_reverse] [animation-delay:3s] transform rotate-30" 
           style={{clipPath: 'ellipse(35% 60% at 80% 20%) ellipse(30% 40% at 20% 90%)'}} />
      
      <div className="fixed bottom-1/4 right-0 w-88 h-64 bg-blob-secondary/20 blur-xl animate-[pulse_11s_ease-in-out_infinite,float_28s_ease-in-out_infinite] [animation-delay:4s] transform -rotate-60" 
           style={{clipPath: 'ellipse(50% 40% at 30% 70%) ellipse(25% 35% at 90% 10%)'}} />
      
      <div className="fixed top-1/2 right-1/4 w-48 h-48 bg-blob-accent/15 blur-lg animate-[pulse_5s_ease-in-out_infinite,float_15s_ease-in-out_infinite_reverse] [animation-delay:1.5s] transform rotate-180" 
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
      </div>
    </section>
  );
};