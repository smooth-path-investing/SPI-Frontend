import type { ReactNode } from 'react';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const sectionClassName =
  'relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardClassName =
  'max-w-5xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] p-6 sm:p-8 lg:p-12 rounded-[var(--radius)] transition-all duration-300 hover:border-[var(--card-hover)] hover:shadow-[0_0_24px_var(--card-hover)]';

const inlineLinkClassName =
  'font-medium text-[var(--accent)] underline decoration-[var(--accent)]/80 underline-offset-4 transition-colors duration-200 hover:text-[var(--foreground)] hover:decoration-[var(--foreground)] cursor-help';

const paragraphClassName =
  'text-center text-sm sm:text-base lg:text-lg leading-8 text-[var(--muted-text)]';

const InlineStoryReference = ({ children }: { children: ReactNode }) => (
  <Tooltip delayDuration={120}>
    <TooltipTrigger asChild>
      <span className={inlineLinkClassName}>{children}</span>
    </TooltipTrigger>
    <TooltipContent className="border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)]">
      Document reference coming soon
    </TooltipContent>
  </Tooltip>
);

const storyParagraphs: { id: string; content: ReactNode }[] = [
  {
    id: 'overview',
    content: (
      <>
        At Smooth Path Investing, we simplify stock trading through 16 interconnected{' '}
        <InlineStoryReference>stories</InlineStoryReference>, mapping stocks to{' '}
        <InlineStoryReference>human behaviors</InlineStoryReference> (followers for trends, rebels
        for mean-reversion, neutrals for linear paths) using data{' '}
        <InlineStoryReference>layers</InlineStoryReference> (company, economy, market).
      </>
    ),
  },
  {
    id: 'model',
    content: (
      <>
        Our proprietary SigGA model analyzes paths,{' '}
        <InlineStoryReference>speeds</InlineStoryReference>,{' '}
        <InlineStoryReference>limits</InlineStoryReference>,{' '}
        <InlineStoryReference>bumps</InlineStoryReference>, and time{' '}
        <InlineStoryReference>slices</InlineStoryReference> to predict and allocate, with tail risks
        (heavy for memory, thick for persistence, fat for mutation) guiding adaptive decisions.
      </>
    ),
  },
  {
    id: 'rules',
    content: (
      <>
        Key rules: Buy/sell in stages at predefined{' '}
        <InlineStoryReference>thresholds</InlineStoryReference> (e.g., sell on 40-50% gains or
        30-40% losses); position weights 2.5-20%; concise portfolios (5-40 stocks) by risk appetite;
        anchor (strategic index-like) + twin (tactical picks) structure.
      </>
    ),
  },
  {
    id: 'principles',
    content: (
      <>
        We emphasize <InlineStoryReference>symmetry</InlineStoryReference> (pair longs/shorts),{' '}
        <InlineStoryReference>iteration</InlineStoryReference> for correction, and the{' '}
        <InlineStoryReference>SCIŒC</InlineStoryReference> process: Segregate data, Condition
        models, Integrate ecosystems, Order by probability, Exclude neutrals, Concentrate views.
      </>
    ),
  },
  {
    id: 'summary',
    content: (
      <>
        This data-driven, disciplined method turns speculation into structure for consistent
        success.
      </>
    ),
  },
];

export const ApproachSection = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="approach-content">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader mainText="Investment Approach" subText="The Smooth Path Edge" />
        <div className={cardClassName}>
          <div className="space-y-6">
            {storyParagraphs.map((paragraph) => (
              <p key={paragraph.id} className={paragraphClassName}>
                {paragraph.content}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
