import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  triggerClass?: string; // optional class for staggered children
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className,
  triggerClass,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionClassName = useMemo(
    () => (className ? `${className} overflow-hidden` : 'overflow-hidden'),
    [className],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !triggerClass) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = gsap.utils.toArray<HTMLElement>(`.${triggerClass} > *`);

      if (!targets.length) return;

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 24,
          scale: 0.995,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: {
            amount: 0.35,
            ease: 'power2.inOut',
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerClass]);

  return (
    <section ref={sectionRef} className={sectionClassName}>
      {children}
    </section>
  );
};
