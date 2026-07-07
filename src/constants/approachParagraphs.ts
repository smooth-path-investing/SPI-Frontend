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
      'We built a model that reads a stock\'s price history the way an expert reads a heartbeat — the shape of the move, how fast, and how far it has come all matter. It automatically finds the five signals that best predict each stock\'s next move, then recalibrates whenever the market changes character.',
  },
  {
    id: 'rules',
    type: 'rules',
    items: [
      'Buy and sell in three staged entries and exits, each triggered at predefined portfolio thresholds.',
      'Keep position weights between 2.5% and 20%, with a focused portfolio of 10 to 12 stocks.',
      'Split exposure into two sleeves — Anchor and Twin — each holding 5 to 6 high-conviction stocks.',
    ],
  },
  {
    id: 'principles',
    type: 'paragraph',
    text:
      'Every decision runs through the same six-step checklist: pull apart the right data, adjust for current market conditions, combine company and economic signals, rank ideas by probability, cut anything sitting on the fence, and concentrate capital into the strongest views.',
  },
];
