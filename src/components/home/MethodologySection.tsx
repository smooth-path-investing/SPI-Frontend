import type { FC } from 'react';
import { Brain, Cpu, TrendingUp, type LucideIcon } from 'lucide-react';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { MethodologyCard } from '../Cards/MethodologyCard/MethodologyCard';
import { METHODOLOGY_CARDS, type MethodologyIconKey } from '@/constants/methodologyCards';

const sectionClassName =
  'relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardsGridClassName = 'grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16';

const methodologyIconMap: Record<MethodologyIconKey, LucideIcon> = {
  cpu: Cpu,
  'trending-up': TrendingUp,
  brain: Brain,
};

export const MethodologySection: FC = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="methodology-content">
      <div className="max-w-7xl mx-auto methodology-content">
        <SectionHeader
          mainText="The Smooth Path Edge"
          subText="We Segregate, Condition, Integrate, Order, Exclude and Concentrate"
        />

        <div className={cardsGridClassName}>
          {METHODOLOGY_CARDS.map((card) => (
            <MethodologyCard
              key={card.title}
              icon={methodologyIconMap[card.icon]}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
};
