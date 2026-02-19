import React from 'react';
import { MainTitleComponent } from '../sectionHeaders/LandingPageTitle/MainTitle';
import { ScrollSection } from '../animations/scrollSection';

export const HeroSection: React.FC = () => {
  return (
    <ScrollSection
      className="relative flex flex-col justify-center items-center min-h-[100dvh] sm:min-h-[75vh] md:h-screen px-10 sm:px-8 lg:px-16 overflow-hidden"
      triggerClass="hero-content"
      start="top 95%"
      duration={0.9}
      yOffset={22}
    >
      {/* Background Image with Focal Point */}
      <div
        className="absolute inset-0 bg-cover scale-105"
        style={{
          backgroundImage: "url('/images/turtleFox.png')",
          backgroundPosition: '25% center',
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/100"></div>

      <div className="hero-content">
        <MainTitleComponent />
      </div>
    </ScrollSection>
  );
};
