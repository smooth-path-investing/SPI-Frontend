import type { FC } from 'react';
import { Brain, ChevronDown, Cpu, TrendingUp, type LucideIcon } from 'lucide-react';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { MethodologyCard } from '../Cards/MethodologyCard/MethodologyCard';
import { METHODOLOGY_CARDS, type MethodologyIconKey } from '@/constants/methodologyCards';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const sectionClassName =
  'relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardsGridClassName = 'grid md:grid-cols-3 gap-5 sm:gap-7 lg:gap-10';

const methodologyIconMap: Record<MethodologyIconKey, LucideIcon> = {
  cpu: Cpu,
  'trending-up': TrendingUp,
  brain: Brain,
};

const SCIOEC_STEPS = [
  { letter: 'S', label: 'Segregate', detail: 'data sources' },
  { letter: 'C', label: 'Condition', detail: 'models to the market' },
  { letter: 'I', label: 'Integrate', detail: 'company + macro signals' },
  { letter: 'O', label: 'Order', detail: 'positions by probability' },
  { letter: 'E', label: 'Exclude', detail: 'neutral stocks' },
  { letter: 'C', label: 'Concentrate', detail: 'on high-conviction views' },
] as const;

export const MethodologySection: FC = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="methodology-content">
      <div className="max-w-7xl mx-auto methodology-content">
        <SectionHeader mainText="The Smooth Path Edge" />

        {/* Hover to reveal the 6-step process */}
        <div className="-mt-6 mb-12 flex justify-center sm:-mt-8 sm:mb-16">
          <TooltipProvider delayDuration={120} skipDelayDuration={80}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="group inline-flex cursor-help items-center gap-2 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)]/70 hover:bg-[var(--accent)]/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Hover to see our 6-step process
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-xs border-2 border-[var(--accent)]/70 bg-[var(--card-bg)] p-3 text-[var(--foreground)] shadow-[0_0_0_1px_rgba(234,179,8,0.25)] sm:max-w-sm sm:p-4"
              >
                <p className="mb-2.5 text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  Our SCIŒC process
                </p>
                <ol className="space-y-1.5">
                  {SCIOEC_STEPS.map((step, index) => (
                    <li key={index} className="flex items-baseline gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[10px] font-semibold text-[var(--accent)]">
                        {step.letter}
                      </span>
                      <span className="text-[13px] leading-snug">
                        <span className="font-semibold">{step.label}</span>{' '}
                        <span className="text-[var(--muted-text)]">{step.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

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
