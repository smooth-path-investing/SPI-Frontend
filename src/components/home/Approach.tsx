import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { APPROACH_CONTENT } from '@/constants/approachParagraphs';

const sectionClassName =
  'relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardClassName =
  'max-w-5xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] p-6 sm:p-8 lg:p-10 rounded-[var(--radius)] transition-colors duration-300 hover:border-[var(--accent)]/70';

const paragraphClassName =
  'mx-auto max-w-4xl text-center text-sm sm:text-base lg:text-lg leading-8 text-[var(--foreground)]';
const rulesWrapperClassName =
  'mx-auto max-w-4xl rounded-[var(--radius)] border border-[var(--card-border)] bg-[linear-gradient(180deg,rgba(250,204,21,0.05),rgba(0,0,0,0.16))] px-5 py-5 sm:px-6 sm:py-6';
const rulesGridClassName = 'grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4';
const ruleCardClassName =
  'rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 px-4 py-4 sm:px-5 sm:py-5 text-left transition-colors duration-300 hover:border-[var(--accent)]/45';

export const ApproachSection = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="approach-content">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader mainText="The Smooth Path Strategy" subText="Investment Approach" />
        <div className={`${cardClassName} approach-content`}>
          <div className="space-y-6">
            {APPROACH_CONTENT.map((block) =>
              block.type === 'paragraph' ? (
                <p key={block.id} className={paragraphClassName}>
                  {block.text}
                </p>
              ) : (
                <div key={block.id} className={rulesWrapperClassName}>
                  <div className="mb-5 flex justify-center">
                    <span className="rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      Key Rules
                    </span>
                  </div>
                  <div className={rulesGridClassName}>
                    {block.items.map((item, index) => (
                      <article key={item} className={ruleCardClassName}>
                        <div className="mb-3 flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
                            {index + 1}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-text)]">
                            Rule {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base leading-7 text-[var(--foreground)]">
                          {item}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
