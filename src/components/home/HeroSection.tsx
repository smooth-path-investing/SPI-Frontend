import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="
    relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen 
    flex items-center bg-cover bg-center bg-no-repeat
  "
      style={{ backgroundImage: "url('/images/turtleFox.png')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-9xl font-bold text-foreground leading-none">
            <div>Smooth Path</div>
            <div className="-mt-2">Investing</div>
          </h1>
        </div>
      </div>
    </section>
  );
};
