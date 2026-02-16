import type { ReactNode } from 'react';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';

type StoryAnchor =
  | 'pdf'
  | 'stock-human'
  | 'stock-data'
  | 'stock-speed'
  | 'stock-limit'
  | 'stock-bump'
  | 'stock-slice'
  | 'stock-tracker'
  | 'stock-success'
  | 'stock-iteration'
  | 'stock-psych';

const sectionClassName =
  'relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardClassName =
  'max-w-5xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] p-6 sm:p-8 lg:p-12 rounded-[var(--radius)] transition-all duration-300 transform hover:scale-105 hover:border-[var(--card-hover)] hover:shadow-[0_0_30px_var(--card-hover)]';

const inlineLinkClassName =
  'font-medium text-[var(--accent)] underline decoration-[var(--accent)]/80 underline-offset-4 transition-colors duration-200 hover:text-[var(--foreground)] hover:decoration-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]';

const paragraphClassName =
  'text-center text-sm sm:text-base lg:text-lg leading-8 text-[var(--muted-text)]';

const InlineStoryLink = ({ anchor, children }: { anchor: StoryAnchor; children: ReactNode }) => (
  <a className={inlineLinkClassName} href={`#${anchor}`}>
    {children}
  </a>
);

const storyParagraphs: { id: string; content: ReactNode }[] = [
  {
    id: 'overview',
    content: (
      <>
        At Smooth Path Investing, we simplify stock trading through 16 interconnected{' '}
        <InlineStoryLink anchor="pdf">stories</InlineStoryLink>, mapping stocks to{' '}
        <InlineStoryLink anchor="stock-human">human behaviors</InlineStoryLink> (followers for
        trends, rebels for mean-reversion, neutrals for linear paths) using data{' '}
        <InlineStoryLink anchor="stock-data">layers</InlineStoryLink> (company, economy, market).
      </>
    ),
  },
  {
    id: 'model',
    content: (
      <>
        Our proprietary SigGA model analyzes paths,{' '}
        <InlineStoryLink anchor="stock-speed">speeds</InlineStoryLink>,{' '}
        <InlineStoryLink anchor="stock-limit">limits</InlineStoryLink>,{' '}
        <InlineStoryLink anchor="stock-bump">bumps</InlineStoryLink>, and time{' '}
        <InlineStoryLink anchor="stock-slice">slices</InlineStoryLink> to predict and allocate,
        with tail risks (heavy for memory, thick for persistence, fat for mutation) guiding
        adaptive decisions.
      </>
    ),
  },
  {
    id: 'rules',
    content: (
      <>
        Key rules: Buy/sell in stages at predefined{' '}
        <InlineStoryLink anchor="stock-tracker">thresholds</InlineStoryLink> (e.g., sell on
        40-50% gains or 30-40% losses); position weights 2.5-20%; concise portfolios (5-40 stocks)
        by risk appetite; anchor (strategic index-like) + twin (tactical picks) structure.
      </>
    ),
  },
  {
    id: 'principles',
    content: (
      <>
        We emphasize <InlineStoryLink anchor="stock-success">symmetry</InlineStoryLink> (pair
        longs/shorts), <InlineStoryLink anchor="stock-iteration">iteration</InlineStoryLink> for
        correction, and the <InlineStoryLink anchor="stock-psych">SCIŒC</InlineStoryLink> process:
        Segregate data, Condition models, Integrate ecosystems, Order by probability, Exclude
        neutrals, Concentrate views.
      </>
    ),
  },
  {
    id: 'summary',
    content: (
      <>This data-driven, disciplined method turns speculation into structure for consistent success.</>
    ),
  },
];

export const ApproachSection = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="Approach-content">
      <div className="max-w-6xl mx-auto Approach-content space-y-10">
        <SectionHeader mainText="Investment Approach" subText="The Smooth Path Edge" />

        <article aria-labelledby="spi-stock-stories-title" className={cardClassName}>
          <h3
            id="spi-stock-stories-title"
            className="text-center text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide text-[var(--foreground)]"
          >
            SPI&apos;s Stock Stories
          </h3>

          <div className="mt-4 space-y-4">
            {storyParagraphs.map((paragraph) => (
              <p className={paragraphClassName} key={paragraph.id}>
                {paragraph.content}
              </p>
            ))}
          </div>
        </article>
      </div>
    </ScrollSection>
  );
};
