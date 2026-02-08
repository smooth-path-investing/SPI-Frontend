import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MissionSection } from '../components/home/MissionSection';
import { StatsSection } from '../components/home/StatsSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { PerformanceSection } from '../components/home/PerformanceSection';
import { AnimatedSection } from '@/components/animations/animationSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection>
        <MissionSection />
      </AnimatedSection>

      <AnimatedSection>
        <MethodologySection />
      </AnimatedSection>

      <AnimatedSection>
        <PerformanceSection />
      </AnimatedSection>

      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>
    </div>
  );
};
