import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MainTitleComponent } from '../sectionHeaders/LandingPageTitle/MainTitle';

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
          backgroundPosition: '25% center',
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/100"></div>

      <MainTitleComponent />
    </section>
  );
};
