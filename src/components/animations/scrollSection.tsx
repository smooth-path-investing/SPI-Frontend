import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (triggerClass) {
        gsap.from(`.${triggerClass} > *`, {
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerClass]);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
};
