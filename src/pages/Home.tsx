import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { PerformanceSection } from '../components/home/PerformanceSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { TrustSection } from '../components/home/TrustSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <StatsSection />
      <MethodologySection />
      <PerformanceSection />
      <WhyChooseUsSection />
      <TrustSection />
    </div>
  );
};