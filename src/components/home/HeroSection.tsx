import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-background to-background" />
      
      {/* Minimal floating shapes */}
      <div className="fixed -top-20 -left-20 w-96 h-96 bg-primary/8 blur-3xl rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="fixed -bottom-20 -right-20 w-96 h-96 bg-secondary/8 blur-3xl rounded-full animate-[pulse_10s_ease-in-out_infinite] [animation-delay:2s]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-3xl rounded-full animate-[pulse_12s_ease-in-out_infinite] [animation-delay:4s]" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            <div className="mb-2">Independent</div>
            <div>Stock Picks</div>
          </h1>
          {textContent["home-hero-subtitle"] && (
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed">
              {textContent["home-hero-subtitle"]}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};