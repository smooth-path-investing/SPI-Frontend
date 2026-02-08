// components/common/AnimatedSection.tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px', // triggers slightly before center
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.section>
  );
};
