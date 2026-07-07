export type StoryCardIconKey = 'layers' | 'binary' | 'brain-circuit' | 'activity';

interface StoryCardItem {
  icon: StoryCardIconKey;
  label: string;
  title: string;
  subtitle: string;
}

export const STORY_CARDS: StoryCardItem[] = [
  {
    icon: 'layers',
    label: 'Framework',
    title: 'Stock Stories Investment Framework',
    subtitle:
      'Stocks are assigned a narrative — trend rider, mean reverter, or market tracker — so every trade follows a repeatable, probability-based philosophy.',
  },
  {
    icon: 'binary',
    label: 'DR-SigGA',
    title: 'Dimension Reduction',
    subtitle:
      'Signature methods from rough-path theory, paired with genetic algorithms, surface the five strongest predictive signals for each stock.',
  },
  {
    icon: 'brain-circuit',
    label: 'Adaptive',
    title: 'Adaptive Learning Model',
    subtitle:
      "Maps each stock's path geometry — linear, nonlinear, or complex — to the right behavior model, and updates as market conditions shift.",
  },
  {
    icon: 'activity',
    label: 'Inefficiencies',
    title: 'Informational Edge Detection',
    subtitle:
      'Converts price-path geometry into real-time buy/sell signals and identifies shorter windows of exploitable market inefficiency.',
  },
];
