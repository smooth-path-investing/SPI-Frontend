import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { StoriesCard } from '../Cards/StoriesCard/StoriesCard';
import { ScrollSection } from '../animations/scrollSection';

const storyCards: { title: string; subtitle: string }[] = [
  {
    title: 'Stock Stories Signature Investment Framework',
    subtitle:
      'A structured collection of investment philosophies that translates market narratives into disciplined, probability-based portfolio decisions.',
  },
  {
    title: 'Dimension Reduction Signature Genetic Algorithm',
    subtitle:
      'We deploy signatures (ML, rough path theory) with genetic algorithm (AI, optimization) to find Five Best Indicator Predictors.',
  },
  {
    title: 'Adaptive Learning Signature Genetic Algorithm',
    subtitle:
      "Stocks to indicators adaptive linkage of people's behavior onto stock's path geometric properties (linear, nonlinear, complex).",
  },
  {
    title: 'Informational Inefficiencies Signature Genetic Algorithm',
    subtitle:
      "Stock's path calibration into new behavior (ML), indicators, and higher frequencies.",
  },
];

export const SuccessStories = () => {
  return (
    <ScrollSection
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--background)] text-[var(--foreground)]"
      triggerClass="stories-content"
    >
      <div className="max-w-6xl mx-auto stories-content">
        <SectionHeader mainText="Academic & Empirical Research" subText="Proprietary" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {storyCards.map((story) => (
            <StoriesCard key={story.title} title={story.title} description={story.subtitle} />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
};
