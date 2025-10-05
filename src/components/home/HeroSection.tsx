import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-40 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-pulse [animation-duration:8s]" />
      
      {/* Multiple Organic Floating Shapes with dynamic movement */}
      <div className="fixed -top-32 -left-32 w-80 h-80 bg-blob-primary/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite,float_20s_ease-in-out_infinite] transform rotate-12" 
           style={{clipPath: 'ellipse(40% 35% at 30% 40%)'}} />
      
      <div className="fixed top-20 -right-24 w-64 h-96 bg-blob-secondary/15 blur-2xl animate-[pulse_8s_ease-in-out_infinite,float-reverse_25s_ease-in-out_infinite] [animation-delay:2s] transform -rotate-45" 
           style={{clipPath: 'ellipse(60% 30% at 70% 60%) circle(25% at 20% 80%)'}} />
      
      <div className="fixed bottom-0 left-1/5 w-72 h-72 bg-blob-accent/25 blur-xl animate-[pulse_7s_ease-in-out_infinite,float-diagonal_18s_ease-in-out_infinite] [animation-delay:1s] transform rotate-90" 
           style={{clipPath: 'ellipse(45% 50% at 60% 30%)'}} />
      
      <div className="fixed top-1/3 left-0 w-56 h-80 bg-blob-primary/10 blur-3xl animate-[pulse_9s_ease-in-out_infinite,float-wide_22s_ease-in-out_infinite] [animation-delay:3s] transform rotate-30" 
           style={{clipPath: 'ellipse(35% 60% at 80% 20%) ellipse(30% 40% at 20% 90%)'}} />
      
      <div className="fixed bottom-1/4 right-0 w-88 h-64 bg-blob-secondary/20 blur-2xl animate-[pulse_11s_ease-in-out_infinite,float-circular_28s_ease-in-out_infinite] [animation-delay:4s] transform -rotate-60" 
           style={{clipPath: 'ellipse(50% 40% at 30% 70%) ellipse(25% 35% at 90% 10%)'}} />
      
      <div className="fixed top-1/2 right-1/4 w-48 h-48 bg-blob-accent/15 blur-xl animate-[pulse_5s_ease-in-out_infinite,float-vertical_15s_ease-in-out_infinite] [animation-delay:1.5s] transform rotate-180" 
           style={{clipPath: 'ellipse(60% 40% at 50% 50%)'}} />

      {/* Additional floating shapes */}
      <div className="fixed top-10 left-1/3 w-32 h-64 bg-blob-primary/12 blur-2xl animate-[pulse_12s_ease-in-out_infinite,float-horizontal_30s_ease-in-out_infinite] [animation-delay:5s] transform rotate-75" 
           style={{clipPath: 'ellipse(25% 60% at 40% 80%)'}} />
      
      <div className="fixed bottom-20 right-1/3 w-96 h-48 bg-blob-secondary/18 blur-3xl animate-[pulse_14s_ease-in-out_infinite,float-wave_16s_ease-in-out_infinite] [animation-delay:6s] transform -rotate-20" 
           style={{clipPath: 'ellipse(70% 30% at 20% 50%) ellipse(40% 35% at 90% 70%)'}} />
      
      <div className="fixed top-2/3 left-10 w-40 h-40 bg-blob-accent/22 blur-lg animate-[pulse_8s_ease-in-out_infinite,float-orbit_35s_ease-in-out_infinite] [animation-delay:2.5s] transform rotate-45" 
           style={{clipPath: 'ellipse(55% 45% at 60% 40%)'}} />
      
      <div className="fixed bottom-1/2 left-2/3 w-24 h-88 bg-blob-primary/8 blur-xl animate-[pulse_16s_ease-in-out_infinite,float-zigzag_24s_ease-in-out_infinite] [animation-delay:7s] transform rotate-135" 
           style={{clipPath: 'ellipse(20% 65% at 30% 20%) ellipse(40% 30% at 80% 90%)'}} />

      <div className="fixed top-1/4 right-10 w-60 h-32 bg-blob-secondary/14 blur-2xl animate-[pulse_10s_ease-in-out_infinite,float-pendulum_20s_ease-in-out_infinite] [animation-delay:3.5s] transform rotate-90" 
           style={{clipPath: 'ellipse(50% 25% at 70% 50%)'}} />

      <div className="fixed bottom-10 left-1/2 w-36 h-72 bg-blob-accent/16 blur-lg animate-[pulse_13s_ease-in-out_infinite,float-spiral_26s_ease-in-out_infinite] [animation-delay:4.5s] transform -rotate-60" 
           style={{clipPath: 'ellipse(30% 55% at 50% 30%) ellipse(40% 25% at 70% 80%)'}} />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            {textContent["home-hero-title"]}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2 [line-height:1.4]">
            {textContent["home-hero-subtitle"]}
          </p>
        </div>
      </div>
    </section>
  );
};