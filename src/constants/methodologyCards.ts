export type MethodologyIconKey = 'cpu' | 'trending-up' | 'brain';

interface MethodologyCardItem {
  icon: MethodologyIconKey;
  title: string;
  description: string;
}

export const METHODOLOGY_CARDS: MethodologyCardItem[] = [
  {
    icon: 'cpu',
    title: 'Indicator',
    description: 'Five decisive predictors no stock escapes',
  },
  {
    icon: 'trending-up',
    title: 'Behavior',
    description: 'Crowd psychology distilled into trend investing, reverting, or indexing.',
  },
  {
    icon: 'brain',
    title: 'Allocator',
    description:
      'Mathematical sophistication applied to stock selection, that is, to what, when, and how much.',
  },
];
