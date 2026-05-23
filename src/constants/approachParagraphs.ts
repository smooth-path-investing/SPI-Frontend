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
      'Smooth Path Investing classifies every stock by the market behavior it naturally exhibits — trend followers ride momentum, mean-reverters fade extremes, and neutrals track the broader market. Company data, economic signals, and market dynamics combine to assign each stock its behavior type and trade it accordingly.',
  },
  {
    id: 'model',
    type: 'paragraph',
    text:
      'Our DR-SigGA model uses signature methods — a technique from rough-path mathematics that captures a price path\'s full shape, speed, and memory — combined with genetic algorithms to surface the five strongest predictive signals for each stock. Tail-risk filters keep the model adaptive when market conditions shift.',
  },
  {
    id: 'rules',
    type: 'rules',
    items: [
      'Buy and sell in three staged entries and exits, each triggered at predefined portfolio thresholds.',
      'Keep position weights between 2.5% and 20%, with a focused portfolio of 10 to 12 stocks.',
      'Split exposure into two sub-portfolios — Anchor and Twin — with 5 to 6 stocks each for strategic and tactical views.',
    ],
  },
  {
    id: 'principles',
    type: 'paragraph',
    text:
      'Our SCIŒC process structures every decision: Segregate data sources, Condition models to current market regimes, Integrate company and macro signals, Order positions by probability, Exclude neutral stocks, and Concentrate into high-conviction views — with symmetry and iteration built in at each step.',
  },
];
