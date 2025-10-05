import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(42,88%,65%)]/12 via-background via-30% to-[hsl(38,85%,58%)]/8" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(48,82%,70%)]/6 via-transparent to-[hsl(42,88%,65%)]/10" />
      
      {/* Large radial gold glow - center focal point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full opacity-70 blur-3xl" 
           style={{
             background: 'radial-gradient(circle, hsl(42 88% 65% / 0.15) 0%, hsl(38 85% 58% / 0.08) 40%, hsl(48 82% 70% / 0.04) 70%, transparent 100%)'
           }} />
      
      {/* Secondary radial layers */}
      <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full opacity-50 blur-2xl"
           style={{
             background: 'radial-gradient(circle, hsl(42 88% 65% / 0.12) 0%, transparent 70%)'
           }} />
      <div className="absolute bottom-1/3 right-1/3 w-[900px] h-[900px] rounded-full opacity-50 blur-2xl"
           style={{
             background: 'radial-gradient(circle, hsl(38 85% 58% / 0.1) 0%, transparent 70%)'
           }} />
      
      {/* Animated gold accent orbs */}
      <div className="fixed -top-32 -left-32 w-[480px] h-[480px] bg-gradient-to-br from-[hsl(42,88%,65%)]/20 via-[hsl(48,82%,70%)]/12 to-transparent blur-3xl rounded-full animate-[pulse_8s_ease-in-out_infinite,float_20s_ease-in-out_infinite]" />
      <div className="fixed -bottom-32 -right-32 w-[550px] h-[550px] bg-gradient-to-tl from-[hsl(38,85%,58%)]/18 via-[hsl(42,88%,65%)]/10 to-transparent blur-3xl rounded-full animate-[pulse_10s_ease-in-out_infinite,float-reverse_25s_ease-in-out_infinite] [animation-delay:2s]" />
      <div className="fixed top-1/4 -right-20 w-[400px] h-[400px] bg-gradient-to-bl from-[hsl(48,82%,70%)]/15 to-transparent blur-3xl rounded-full animate-[pulse_9s_ease-in-out_infinite,float-diagonal_18s_ease-in-out_infinite] [animation-delay:1s]" />
      <div className="fixed bottom-1/4 -left-20 w-[420px] h-[420px] bg-gradient-to-tr from-[hsl(42,88%,65%)]/16 to-transparent blur-3xl rounded-full animate-[pulse_11s_ease-in-out_infinite,float-circular_22s_ease-in-out_infinite] [animation-delay:3s]" />
      
      {/* White/silver accent highlights for premium feel */}
      <div className="fixed top-20 right-1/4 w-80 h-80 bg-gradient-radial from-white/5 to-transparent blur-2xl rounded-full animate-[pulse_12s_ease-in-out_infinite] [animation-delay:1s]" />
      <div className="fixed bottom-20 left-1/4 w-96 h-96 bg-gradient-radial from-white/4 to-transparent blur-3xl rounded-full animate-[pulse_14s_ease-in-out_infinite] [animation-delay:3s]" />
      <div className="fixed top-1/2 left-10 w-64 h-64 bg-white/3 blur-2xl rounded-full animate-[pulse_13s_ease-in-out_infinite,float-vertical_15s_ease-in-out_infinite] [animation-delay:2s]" />
      <div className="fixed top-1/3 right-10 w-72 h-72 bg-white/3 blur-2xl rounded-full animate-[pulse_15s_ease-in-out_infinite,float-horizontal_20s_ease-in-out_infinite] [animation-delay:4s]" />
      
      {/* Refined geometric overlay patterns */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{
             backgroundImage: `radial-gradient(circle at center, hsl(42 88% 65%) 1.5px, transparent 1.5px)`,
             backgroundSize: '60px 60px'
           }} />
      <div className="absolute inset-0 opacity-[0.015]"
           style={{
             backgroundImage: `radial-gradient(circle at 25% 25%, hsl(48 82% 70%) 1px, transparent 1px)`,
             backgroundSize: '80px 80px'
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