import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="
        relative pt-16 pb-12 px-4 sm:pt-24 sm:pb-16 sm:px-6 lg:px-8
        h-[60vh] sm:h-[80vh] md:h-screen 
        flex items-center justify-center bg-no-repeat bg-center bg-cover
      "
      style={{ backgroundImage: "url('/images/turtleFox.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 sm:bg-black/70"></div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="font-bold text-white leading-tight">
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl">Smooth Path</div>
            <div className="mt-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Investing</div>
          </h1>
        </div>
      </div>
    </section>
  );
};
