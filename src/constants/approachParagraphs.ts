export interface ApproachParagraphPart {
  value: string;
  isReference?: boolean;
}

export interface ApproachParagraph {
  id: string;
  parts: ApproachParagraphPart[];
}

export const APPROACH_PARAGRAPHS: ApproachParagraph[] = [
  {
    id: 'overview',
    parts: [
      { value: 'At Smooth Path Investing, we simplify stock trading through 16 interconnected ' },
      { value: 'stories', isReference: true },
      { value: ', mapping stocks to ' },
      { value: 'human behaviors', isReference: true },
      { value: ' (followers for trends, rebels for mean-reversion, neutrals for linear paths) using data ' },
      { value: 'layers', isReference: true },
      { value: ' (company, economy, market).' },
    ],
  },
  {
    id: 'model',
    parts: [
      { value: 'Our proprietary SigGA model analyzes paths, ' },
      { value: 'speeds', isReference: true },
      { value: ', ' },
      { value: 'limits', isReference: true },
      { value: ', ' },
      { value: 'bumps', isReference: true },
      { value: ', and time ' },
      { value: 'slices', isReference: true },
      {
        value:
          ' to predict and allocate, with tail risks (heavy for memory, thick for persistence, fat for mutation) guiding adaptive decisions.',
      },
    ],
  },
  {
    id: 'rules',
    parts: [
      { value: 'Key rules: Buy/sell in stages at predefined ' },
      { value: 'thresholds', isReference: true },
      {
        value:
          ' (e.g., sell on 40-50% gains or 30-40% losses); position weights 2.5-20%; concise portfolios (5-40 stocks) by risk appetite; anchor (strategic index-like) + twin (tactical picks) structure.',
      },
    ],
  },
  {
    id: 'principles',
    parts: [
      { value: 'We emphasize ' },
      { value: 'symmetry', isReference: true },
      { value: ' (pair longs/shorts), ' },
      { value: 'iteration', isReference: true },
      { value: ' for correction, and the ' },
      { value: 'SCIŒC', isReference: true },
      {
        value:
          ' process: Segregate data, Condition models, Integrate ecosystems, Order by probability, Exclude neutrals, Concentrate views.',
      },
    ],
  },
  {
    id: 'summary',
    parts: [
      { value: 'This data-driven, disciplined method turns speculation into structure for consistent success.' },
    ],
  },
];
