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
    title: 'USPTO Provisional Utility Patent Application # 64/058,533 Patent Center # 75907375',
    subtitle:
      'REGIME ADAPTIVE SYSTEM (RAS) FOR EQUITY MARKETS INTERPRETATION AND TRADING ANALYTICS USING SIGNATURE-GENETIC ALGORITHM MAPPING, BEHAVIORAL-FINANCE LEARNING, AND CONSTRAINED LLM ROUTING. Patent Filed on 05/06/2026',
  },
  {
    icon: 'binary',
    label: 'DR-SigGA',
    title: 'Dimension Reduction',
    subtitle:
      'Rough path theory (signatures) paired with evolutionary optimisation (genetic algorithms) point to five strongest pulses per stock.',
  },
  {
    icon: 'brain-circuit',
    label: 'Adaptive',
    title: 'Adaptive Learning',
    subtitle:
      'Machine learning (neural networks, nonlinear/linear) models translate pulses into inclusions and exclusions of stocks down to ~< 60.',
  },
  {
    icon: 'activity',
    label: 'Inefficiencies',
    title: 'Information Detection',
    subtitle:
      'Cross-validating the included and excluded stocks against an ecosystem of machine learning models brings to final stocks list to ~< 20.',
  },
];
