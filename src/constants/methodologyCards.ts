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
    description:
      "Five predictive signals, each calibrated to the individual stock's own behavior pattern and price rhythm.",
  },
  {
    icon: 'trending-up',
    title: 'Behavior',
    description: 'Each stock is classified as a trend rider, mean reverter, or market tracker — then traded on its own terms.',
  },
  {
    icon: 'brain',
    title: 'Allocator',
    description: 'Precise sizing rules determine what to buy, when to enter, and exactly how much capital to deploy.',
  },
];
