import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Elegant gold and white gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(42,88%,65%)]/8 via-background via-40% to-[hsl(38,85%,58%)]/5" />
      
      {/* Radial gold glow - inspired by circular logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full opacity-60 blur-2xl" 
           style={{
             background: 'radial-gradient(circle, hsl(42 88% 65% / 0.1) 0%, hsl(38 85% 58% / 0.05) 50%, transparent 100%)'
           }} />
      
      {/* Subtle gold accent orbs */}
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[hsl(42,88%,65%)]/15 to-[hsl(48,82%,70%)]/10 blur-3xl rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="fixed -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-[hsl(38,85%,58%)]/12 to-[hsl(42,88%,65%)]/8 blur-3xl rounded-full animate-[pulse_10s_ease-in-out_infinite] [animation-delay:2s]" />
      
      {/* White accent highlights for depth */}
      <div className="fixed top-20 right-1/4 w-72 h-72 bg-white/3 blur-2xl rounded-full animate-[pulse_12s_ease-in-out_infinite] [animation-delay:1s]" />
      <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-white/2 blur-3xl rounded-full animate-[pulse_14s_ease-in-out_infinite] [animation-delay:3s]" />
      
      {/* Elegant geometric overlay pattern */}
      <div className="absolute inset-0 opacity-[0.015]" 
           style={{
             backgroundImage: `radial-gradient(circle at center, hsl(42 88% 65%) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} />
      
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