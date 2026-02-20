import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { StoriesCard } from '../Cards/StoriesCard/StoriesCard';
import { ScrollSection } from '../animations/scrollSection';
import { STORY_CARDS } from '@/constants/storyCards';

export const SuccessStories = () => {
  return (
    <ScrollSection
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--background)] text-[var(--foreground)]"
      triggerClass="stories-content"
    >
      <div className="max-w-6xl mx-auto stories-content">
        <SectionHeader mainText="Academic & Empirical Research" subText="Proprietary" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {STORY_CARDS.map((story) => (
            <StoriesCard key={story.title} title={story.title} description={story.subtitle} />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
};
