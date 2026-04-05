import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { APPROACH_CONTENT } from '@/constants/approachParagraphs';

const sectionClassName =
  'relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]';

const cardClassName =
  'group relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/35 p-6 shadow-[0_18px_36px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/75 hover:shadow-[0_24px_48px_rgba(0,0,0,0.24)] sm:p-8 lg:p-10';

const paragraphClassName =
  'mx-auto max-w-5xl text-center text-sm leading-8 text-[var(--foreground)] sm:text-base lg:text-lg';
const rulesWrapperClassName =
  'mx-auto max-w-5xl rounded-[24px] border border-white/25 bg-[linear-gradient(180deg,rgba(250,204,21,0.08),rgba(0,0,0,0.2))] px-5 py-5 shadow-[0_14px_32px_rgba(0,0,0,0.16)] transition-all duration-300 hover:border-[var(--accent)]/55 hover:shadow-[0_18px_40px_rgba(0,0,0,0.2)] sm:px-6 sm:py-6';
const rulesGridClassName = 'grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4';
const ruleCardClassName =
  'group/rule rounded-[22px] border border-white/25 bg-[var(--card-bg)]/90 px-4 py-4 text-left shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/55 hover:bg-[var(--card-bg)] sm:px-5 sm:py-5';

export const ApproachSection = () => {
  return (
    <ScrollSection className={sectionClassName} triggerClass="approach-content">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader mainText="The Smooth Path Strategy" subText="Investment Approach" />
        <div className={`${cardClassName} approach-content`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative z-10 space-y-6">
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
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)] transition-transform duration-300 group-hover/rule:scale-105">
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
