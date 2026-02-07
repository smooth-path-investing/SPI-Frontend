import { IStock, IPerformanceMetric, IApproachSection, INavItem, ITeamMember } from '../types';

export const NAVIGATION_ITEMS: INavItem[] = [
  { label: 'Smooth Path Investing', href: '/' },
  { label: 'Stock Subscription', href: '/stock' },
  { label: 'HF Subscription', href: '/hf' },
];

export const SAMPLE_STOCKS: IStock[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 185.25,
    change: 2.15,
    changePercent: 1.17,
    reason: ['Strong earnings growth', 'Dominant market position', 'Strong cash flow'],
    indicators: ['High RSI momentum', 'Beating EPS 3Q straight', 'AI factor score: 9.2/10'],
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 412.8,
    change: -1.25,
    changePercent: -0.3,
    reason: [
      'Cloud growth acceleration',
      'AI integration leadership',
      'Subscription model strength',
    ],
    indicators: ['Revenue growth trending up', 'Market leader in cloud', 'Strong balance sheet'],
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: 3.42,
    changePercent: 2.46,
    reason: ['Search dominance', 'YouTube revenue growth', 'AI capabilities'],
    indicators: [
      'Technical breakout pattern',
      'Undervalued vs peers',
      'Strong ad revenue recovery',
    ],
  },
];

export const PERFORMANCE_METRICS: IPerformanceMetric[] = [
  { label: 'Total Return', value: '+23.4%', change: '+2.1%', isPositive: true },
  { label: 'Sharpe Ratio', value: '1.42', change: '+0.08', isPositive: true },
  { label: 'Max Drawdown', value: '-8.2%', change: '+1.3%', isPositive: true },
  { label: 'Win Rate', value: '68%', change: '+4%', isPositive: true },
];

export const APPROACH_SECTIONS: IApproachSection[] = [
  {
    title: 'Factor Models',
    description:
      'Multi-factor quantitative models analyzing fundamentals, technicals, and sentiment',
    icon: '📊',
    details: [
      'Value, Growth, Quality, and Momentum factors',
      'Sector-specific factor adjustments',
      'Real-time factor score updates',
    ],
  },
  {
    title: 'AI Signals',
    description: 'Machine learning algorithms processing market data and alternative datasets',
    icon: '🤖',
    details: [
      'Neural networks for pattern recognition',
      'Sentiment analysis from news and social media',
      'Alternative data integration',
    ],
  },
  {
    title: 'Backtested Rules',
    description: 'Rigorously tested investment rules based on historical market performance',
    icon: '📈',
    details: [
      '10+ years of historical validation',
      'Out-of-sample testing protocols',
      'Risk-adjusted performance metrics',
    ],
  },
];
