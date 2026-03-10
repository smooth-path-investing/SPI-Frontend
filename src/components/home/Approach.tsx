import { Fragment, type ReactNode } from 'react';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { APPROACH_PARAGRAPHS } from '@/constants/approachParagraphs';

const sectionClassName =
  'relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardClassName =
  'max-w-5xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] p-6 sm:p-8 lg:p-10 rounded-[var(--radius)] transition-colors duration-300 hover:border-[var(--accent)]/70';

const inlineLinkClassName =
  'inline p-0 m-0 border-0 bg-transparent align-baseline font-inherit leading-inherit font-medium text-[var(--accent)] underline decoration-[var(--accent)]/80 underline-offset-4 transition-colors duration-200 hover:text-[var(--foreground)] hover:decoration-[var(--foreground)] cursor-help appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm';

const paragraphClassName =
  'mx-auto max-w-4xl text-center text-sm sm:text-base lg:text-lg leading-8 text-[var(--foreground)]';

const InlineStoryReference = ({ children }: { children: ReactNode }) => (
  <Tooltip delayDuration={120}>
    <TooltipTrigger asChild>
      <button type="button" className={inlineLinkClassName}>
        {children}
      </button>
    </TooltipTrigger>
    <TooltipContent className="border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)]">
      Document reference coming soon
    </TooltipContent>
  </Tooltip>
);

export const ApproachSection = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="approach-content">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader mainText="The Smooth Path Strategy" subText="Investment Approach" />
        <div className={cardClassName}>
          <div className="space-y-6">
            {APPROACH_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.id} className={paragraphClassName}>
                {paragraph.parts.map((part, index) =>
                  part.isReference ? (
                    <InlineStoryReference key={`${paragraph.id}-${index}`}>
                      {part.value}
                    </InlineStoryReference>
                  ) : (
                    <Fragment key={`${paragraph.id}-${index}`}>{part.value}</Fragment>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
