import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: 'power3.out',
        onComplete: () => {
          // subtle pulse animation
          gsap.to(ctaRef.current, {
            scale: 1.05,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          });
        },
      });
    }
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[100dvh] sm:min-h-[75vh] md:h-screen px-10 sm:px-8 lg:px-16 overflow-hidden">
      {/* Background Image with Focal Point */}
      <div
        className="absolute inset-0 bg-cover scale-105"
        style={{
          backgroundImage: "url('/images/turtleFox.png')",
          backgroundPosition: '25% center', // keep fox in view
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90"></div>

      {/* Centered Text + CTA */}
      <div
        ref={headerRef}
        className="relative z-10 flex flex-col items-center text-center max-w-[90%] sm:max-w-3xl"
      >
        <h1 className="text-white font-medium sm:font-semibold text-[2.75rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] sm:leading-[1.2] tracking-tight">
          Symmetry & Structure
          <span className="block mt-2">For Investment</span>
        </h1>

        <button
          ref={ctaRef}
          className="mt-8 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};
