import type { InvestType } from '@/features/stocks';

interface Portfolio {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  expectedReturn: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  holdings: number;
  rebalanceFrequency: string;
  /** Which `stock_factor_coefvec.invest_type` bucket this list is driven by. */
  investType: InvestType;
}

export const PORTFOLIOS: Portfolio[] = [
  {
    id: 'long-contrarian',
    name: 'Long Stocks List',
    description: 'Long-focused stock selection designed to outperform with disciplined, quarterly portfolio construction.',
    price: 99,
    expectedReturn: 'S&P 500 plus/minus 15%',
    riskLevel: 'Medium',
    holdings: 10,
    rebalanceFrequency: 'Quarterly',
    investType: 'long',
  },
  {
    id: 'watchlist',
    name: 'Watchlist Stocks List',
    description:
      'Watchlist candidates under active monitoring for a disciplined, quarterly entry when conditions align.',
    price: 99,
    expectedReturn: 'S&P 500 plus/minus 15%',
    riskLevel: 'Medium',
    holdings: 10,
    rebalanceFrequency: 'Quarterly',
    investType: 'watchlist',
  },
  {
    id: 'short-contrarian',
    name: 'Short Stocks List',
    description:
      'Short-focused stock selection built around disciplined, quarterly positioning against weaker market setups.',
    price: 129,
    expectedReturn: 'S&P 500 plus/minus 15%',
    riskLevel: 'High',
    holdings: 10,
    rebalanceFrequency: 'Quarterly',
    investType: 'short',
  },
];
