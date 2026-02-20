import { Fragment, type ReactNode } from 'react';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { APPROACH_PARAGRAPHS } from '@/constants/approachParagraphs';

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

export const ApproachSection = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="approach-content">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader mainText="Investment Approach" subText="The Smooth Path Edge" />
        <div className={cardClassName}>
          <div className="space-y-6">
            {APPROACH_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.id} className={paragraphClassName}>
                {paragraph.parts.map((part, index) =>
                  part.isReference ? (
                    <InlineStoryReference key={`${paragraph.id}-${index}`}>{part.value}</InlineStoryReference>
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
