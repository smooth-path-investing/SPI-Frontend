type ApproachContentBlock =
  | {
      id: string;
      type: 'paragraph';
      text: string;
    }
  | {
      id: string;
      type: 'rules';
      items: string[];
    };

export const APPROACH_CONTENT: ApproachContentBlock[] = [
  {
    id: 'overview',
    type: 'paragraph',
    text:
      'At Smooth Path Investing, we simplify stock trading through a "proprietary constrained LLM enriched for portfolio construction", that maps stocks to human behaviors. In particular, we model followers as trend investors, rebels as mean-reverting, and neutrals behavior as linear dynamical systems, using data layers (company, economy, market).',
  },
  {
    id: 'model',
    type: 'paragraph',
    text:
      'Our proprietary machine learning models are based on "signature (from the mathematical theory of rough path) and genetic algorithms (from the mathematical theory of evolutionary optimization)" to analyze paths, speeds, limits, bumps, and time slices, to predict and allocate, with tail risks guiding adaptive decisions adjusted memory persistence.',
  },
  {
    id: 'rules',
    type: 'rules',
    items: [
      'Buy and sell in three staged entries and exits, each triggered at predefined portfolio thresholds.',
      'Keep position weights between 2.5% and 20%, with a concise portfolio built from 10 to 12 stocks.',
      'Split exposure into two sub-portfolios, anchor and twin, with 5 to 6 stocks for strategic and tactical views.',
    ],
  },
  {
    id: 'principles',
    type: 'paragraph',
    text:
      'We emphasize symmetry (pair longs/shorts) for selection, iteration for correction, and our proprietary "SCIŒC" process for structure: Segregate data, Condition models, Integrate ecosystems, Order by probability, Exclude neutrals, Concentrate views.',
  },
];
