import React from 'react';
import { AnimatedKeywords } from '../components/ui/animated-keywords';
import { MissionSection } from '../components/home/MissionSection';
import { HeroSection } from '../components/home/HeroSection';
import { PerformanceSection } from '../components/home/PerformanceSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { TrustSection } from '../components/home/TrustSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { AboutUsSection } from '../components/home/AboutUsSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedKeywords />
      <MissionSection />
      <HeroSection />
      <PerformanceSection />
      <MethodologySection />
      <TrustSection />
      <WhyChooseUsSection />
      <AboutUsSection />
    </div>
  );
};