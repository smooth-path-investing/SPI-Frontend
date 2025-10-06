export interface Portfolio {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  expectedReturn: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  holdings: number;
  rebalanceFrequency: string;
}

export const PORTFOLIOS: Portfolio[] = [
  {
    id: 'long-contrarian',
    name: 'Long Contrarian',
    description: 'Identifies undervalued and out-of-favor stocks with strong fundamentals that the market has overlooked or mispriced.',
    shortDescription: 'Buy low on quality stocks the market has overlooked',
    price: 99,
    expectedReturn: '18-25%',
    riskLevel: 'Medium',
    holdings: 20,
    rebalanceFrequency: 'Monthly'
  },
  {
    id: 'short-contrarian',
    name: 'Short Contrarian',
    description: 'Targets overvalued and overhyped stocks trading above their intrinsic value, profiting from market corrections.',
    shortDescription: 'Profit from overvalued stocks returning to fair value',
    price: 129,
    expectedReturn: '20-30%',
    riskLevel: 'High',
    holdings: 15,
    rebalanceFrequency: 'Bi-weekly'
  },
  {
    id: 'long-trend',
    name: 'Long Trend',
    description: 'Follows momentum and upward price trends, capturing gains from stocks with strong positive momentum signals.',
    shortDescription: 'Ride the wave of winning stocks with strong momentum',
    price: 89,
    expectedReturn: '22-28%',
    riskLevel: 'Medium',
    holdings: 18,
    rebalanceFrequency: 'Weekly'
  },
  {
    id: 'short-trend',
    name: 'Short Trend',
    description: 'Identifies and shorts stocks in sustained downward trends, profiting from continued price declines and negative momentum.',
    shortDescription: 'Capitalize on declining stocks with negative momentum',
    price: 119,
    expectedReturn: '15-22%',
    riskLevel: 'High',
    holdings: 12,
    rebalanceFrequency: 'Weekly'
  }
];
