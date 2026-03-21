import React from 'react';
import { MainTitleComponent } from '../sectionHeaders/LandingPageTitle/MainTitle';
import { ScrollSection } from '../animations/scrollSection';

export const HeroSection: React.FC = () => {
  return (
    <ScrollSection
      className="relative isolate flex items-center justify-center min-h-[92svh] sm:min-h-[82svh] md:min-h-screen px-4 sm:px-8 lg:px-12 pt-16"
      triggerClass="hero-content"
    >
      {/* Background Image with Focal Point */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[6px] sm:blur-[8px] scale-[1.08]"
        style={{
          backgroundImage: "url('/images/turtleFox.png')",
          backgroundPosition: '25% center',
        }}
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.05),transparent_50%)]" />

      <div className="hero-content mx-auto max-w-6xl px-2 sm:px-4 lg:px-6">
        <MainTitleComponent />
      </div>
    </ScrollSection>
  );
};
