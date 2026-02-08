import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section
      className="relative flex items-center justify-center h-[60vh] sm:h-[80vh] md:h-screen px-4 sm:px-6 lg:px-8 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/images/turtleFox.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 sm:bg-black/70"></div>
      <div ref={headerRef} className="relative z-10 text-center">
        <h1 className="font-extrabold text-white leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Symmetry
          <br />
          &<br />
          Structure
          <br />
          For Investment
        </h1>
      </div>
    </section>
  );
};
