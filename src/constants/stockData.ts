import type { StockData, StockPricePoint, StockSeriesProfile } from '@/features/stocks/types';

export type { StockData, StockPricePoint } from '@/features/stocks/types';

export const LONG_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 214.38,
    change: 2.14,
    changePercent: 1.01,
    description: 'Consumer technology platform with durable ecosystem revenue, pricing power, and high-return capital allocation.',
    recommendation: 'Buy',
    confidence: 83,
    keyMetrics: {
      marketCap: '$3.3T',
      peRatio: '31.2',
      dividend: '0.44%',
      beta: '1.18',
    },
    factors: ['Services mix expansion', 'Installed base monetization', 'Margin resilience'],
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 428.65,
    change: 3.52,
    changePercent: 0.83,
    description: 'Enterprise software and cloud leader benefiting from recurring revenue, platform scale, and AI-driven demand.',
    recommendation: 'Buy',
    confidence: 86,
    keyMetrics: {
      marketCap: '$3.2T',
      peRatio: '36.8',
      dividend: '0.68%',
      beta: '0.94',
    },
    factors: ['Cloud operating leverage', 'AI monetization', 'Recurring enterprise spend'],
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'Consumer Discretionary',
    price: 182.14,
    change: 2.41,
    changePercent: 1.34,
    description: 'Global commerce and cloud platform with expanding margins across retail, logistics, and AWS.',
    recommendation: 'Buy',
    confidence: 81,
    keyMetrics: {
      marketCap: '$1.9T',
      peRatio: '41.7',
      dividend: '0.00%',
      beta: '1.22',
    },
    factors: ['AWS profitability', 'Retail efficiency gains', 'Ad business scale'],
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc. Class A',
    sector: 'Communication Services',
    price: 176.83,
    change: 1.76,
    changePercent: 1.01,
    description: 'Search, cloud, and digital advertising franchise with strong cash generation and multiple AI monetization paths.',
    recommendation: 'Buy',
    confidence: 82,
    keyMetrics: {
      marketCap: '$2.2T',
      peRatio: '27.5',
      dividend: '0.00%',
      beta: '1.06',
    },
    factors: ['Search monetization durability', 'Cloud margin expansion', 'AI product adoption'],
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    price: 912.57,
    change: 11.84,
    changePercent: 1.31,
    description: 'Accelerated computing leader with dominant AI infrastructure positioning and exceptional revenue momentum.',
    recommendation: 'Buy',
    confidence: 88,
    keyMetrics: {
      marketCap: '$2.3T',
      peRatio: '54.6',
      dividend: '0.02%',
      beta: '1.68',
    },
    factors: ['AI datacenter demand', 'Platform lock-in', 'Gross margin strength'],
  },
  {
    ticker: 'NFLX',
    name: 'Netflix, Inc.',
    sector: 'Communication Services',
    price: 617.92,
    change: 6.42,
    changePercent: 1.05,
    description: 'Global streaming platform with improving monetization through scale, pricing, and ad-supported growth.',
    recommendation: 'Buy',
    confidence: 77,
    keyMetrics: {
      marketCap: '$265B',
      peRatio: '39.4',
      dividend: '0.00%',
      beta: '1.20',
    },
    factors: ['Subscriber monetization', 'Advertising ramp', 'Content efficiency'],
  },
  {
    ticker: 'DIS',
    name: 'The Walt Disney Company',
    sector: 'Communication Services',
    price: 112.34,
    change: 1.18,
    changePercent: 1.06,
    description: 'Diversified media and experiences company with earnings leverage from streaming discipline and parks demand.',
    recommendation: 'Buy',
    confidence: 74,
    keyMetrics: {
      marketCap: '$205B',
      peRatio: '26.3',
      dividend: '0.82%',
      beta: '1.25',
    },
    factors: ['Streaming margin recovery', 'Parks cash generation', 'Brand asset depth'],
  },
  {
    ticker: 'UNH',
    name: 'UnitedHealth Group Incorporated',
    sector: 'Healthcare',
    price: 521.49,
    change: 4.22,
    changePercent: 0.82,
    description: 'Managed care and healthcare services leader with diversified earnings streams and scale advantages.',
    recommendation: 'Buy',
    confidence: 79,
    keyMetrics: {
      marketCap: '$480B',
      peRatio: '23.1',
      dividend: '1.39%',
      beta: '0.71',
    },
    factors: ['Care delivery scale', 'Membership retention', 'Cash flow consistency'],
  },
  {
    ticker: 'XOM',
    name: 'Exxon Mobil Corporation',
    sector: 'Energy',
    price: 118.77,
    change: 1.09,
    changePercent: 0.93,
    description: 'Integrated energy major with high-quality upstream assets, downstream resilience, and disciplined capital returns.',
    recommendation: 'Buy',
    confidence: 75,
    keyMetrics: {
      marketCap: '$515B',
      peRatio: '14.2',
      dividend: '3.25%',
      beta: '0.91',
    },
    factors: ['Capital discipline', 'Production efficiency', 'Shareholder returns'],
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financials',
    price: 198.56,
    change: 1.94,
    changePercent: 0.99,
    description: 'Large-cap diversified bank with best-in-class profitability, funding depth, and operating scale.',
    recommendation: 'Buy',
    confidence: 80,
    keyMetrics: {
      marketCap: '$575B',
      peRatio: '13.5',
      dividend: '2.17%',
      beta: '1.09',
    },
    factors: ['Net interest income durability', 'Capital strength', 'Fee business diversification'],
  },
];

export const SHORT_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'CRM',
    name: 'Salesforce, Inc.',
    sector: 'Technology',
    price: 277.36,
    change: -3.24,
    changePercent: -1.15,
    description: 'Enterprise software provider facing margin and growth re-rating risk under tighter IT spending.',
    recommendation: 'Sell',
    confidence: 77,
    keyMetrics: {
      marketCap: '$264B',
      peRatio: '44.8',
      dividend: '0.00%',
      beta: '1.33',
    },
    factors: ['Valuation compression risk', 'Growth normalization', 'Multiple sensitivity'],
  },
  {
    ticker: 'WFC',
    name: 'Wells Fargo & Company',
    sector: 'Financials',
    price: 63.12,
    change: -0.58,
    changePercent: -0.91,
    description: 'Large retail bank with earnings sensitivity to credit-cycle and funding-cost dynamics.',
    recommendation: 'Sell',
    confidence: 71,
    keyMetrics: {
      marketCap: '$219B',
      peRatio: '12.8',
      dividend: '2.84%',
      beta: '1.18',
    },
    factors: ['Credit-cycle pressure', 'Rate sensitivity', 'Provisioning risk'],
  },
  {
    ticker: 'TSCO',
    name: 'Tractor Supply Company',
    sector: 'Consumer Discretionary',
    price: 249.78,
    change: -2.14,
    changePercent: -0.85,
    description: 'Rural retail operator with potential same-store-sales pressure and margin normalization risk.',
    recommendation: 'Sell',
    confidence: 69,
    keyMetrics: {
      marketCap: '$26.7B',
      peRatio: '24.5',
      dividend: '1.66%',
      beta: '0.83',
    },
    factors: ['Consumer demand softening', 'Margin pressure', 'Inventory risk'],
  },
  {
    ticker: 'LEN',
    name: 'Lennar Corporation',
    sector: 'Consumer Discretionary',
    price: 151.27,
    change: -1.89,
    changePercent: -1.23,
    description: 'Homebuilder exposed to mortgage-rate volatility and cyclical housing affordability headwinds.',
    recommendation: 'Sell',
    confidence: 74,
    keyMetrics: {
      marketCap: '$40.8B',
      peRatio: '10.7',
      dividend: '1.29%',
      beta: '1.52',
    },
    factors: ['Housing-cycle downside', 'Rate shock sensitivity', 'Margin mean reversion'],
  },
  {
    ticker: 'PBCT',
    name: "People's United Financial (legacy ticker)",
    sector: 'Financials',
    price: 18.46,
    change: -0.12,
    changePercent: -0.65,
    description: 'Regional-bank placeholder data point representing rate-sensitive financial exposure and integration risk.',
    recommendation: 'Sell',
    confidence: 63,
    keyMetrics: {
      marketCap: '$8.7B',
      peRatio: '13.9',
      dividend: '4.10%',
      beta: '0.96',
    },
    factors: ['Deposit pricing pressure', 'Legacy franchise risk', 'Rate sensitivity'],
  },
  {
    ticker: 'BLL',
    name: 'Ball Corporation',
    sector: 'Materials',
    price: 65.73,
    change: -0.54,
    changePercent: -0.81,
    description: 'Packaging manufacturer facing cyclical volume normalization and margin pressure from input costs.',
    recommendation: 'Sell',
    confidence: 68,
    keyMetrics: {
      marketCap: '$20.4B',
      peRatio: '21.6',
      dividend: '1.25%',
      beta: '0.87',
    },
    factors: ['Volume normalization', 'Input cost pressure', 'Industrial demand softness'],
  },
  {
    ticker: 'INTC',
    name: 'Intel Corporation',
    sector: 'Technology',
    price: 30.84,
    change: -0.42,
    changePercent: -1.34,
    description: 'Semiconductor manufacturer balancing turnaround execution, capital intensity, and competitive share pressure.',
    recommendation: 'Sell',
    confidence: 73,
    keyMetrics: {
      marketCap: '$131B',
      peRatio: 'N/M',
      dividend: '1.61%',
      beta: '1.11',
    },
    factors: ['Execution risk', 'Margin compression', 'Competitive intensity'],
  },
  {
    ticker: 'ROL',
    name: 'Rollins, Inc.',
    sector: 'Industrials',
    price: 47.62,
    change: -0.31,
    changePercent: -0.65,
    description: 'Defensive services name with premium valuation vulnerable to any deceleration in organic growth.',
    recommendation: 'Sell',
    confidence: 64,
    keyMetrics: {
      marketCap: '$23.1B',
      peRatio: '51.2',
      dividend: '1.26%',
      beta: '0.71',
    },
    factors: ['Premium multiple risk', 'Growth normalization', 'Operating leverage limits'],
  },
  {
    ticker: 'AMAT',
    name: 'Applied Materials, Inc.',
    sector: 'Technology',
    price: 208.35,
    change: -1.77,
    changePercent: -0.84,
    description: 'Semiconductor equipment leader with cyclical exposure to fab spending and memory-capex volatility.',
    recommendation: 'Sell',
    confidence: 67,
    keyMetrics: {
      marketCap: '$172B',
      peRatio: '25.8',
      dividend: '0.78%',
      beta: '1.58',
    },
    factors: ['Capex cyclicality', 'Memory spending swings', 'Order volatility'],
  },
  {
    ticker: 'DE',
    name: 'Deere & Company',
    sector: 'Industrials',
    price: 376.91,
    change: -3.68,
    changePercent: -0.97,
    description: 'Agriculture and construction equipment manufacturer exposed to farm-income normalization and dealer inventory pressure.',
    recommendation: 'Sell',
    confidence: 70,
    keyMetrics: {
      marketCap: '$103B',
      peRatio: '13.9',
      dividend: '1.42%',
      beta: '1.08',
    },
    factors: ['Farm cycle downside', 'Dealer destocking', 'Margin normalization'],
  },
];

const CHART_DATES = [
  '2023-07-31',
  '2023-08-31',
  '2023-09-30',
  '2023-10-31',
  '2023-11-30',
  '2023-12-31',
  '2024-01-31',
  '2024-02-29',
  '2024-03-31',
  '2024-04-30',
  '2024-05-31',
  '2024-06-30',
];

const STOCK_SERIES_PROFILES: Record<string, StockSeriesProfile> = {
  GE: { drift: 0.011, amplitude: 0.031, phase: 0.2, cycle: 1.3 },
  IBM: { drift: 0.009, amplitude: 0.024, phase: 0.8, cycle: 1.5 },
  APA: { drift: 0.013, amplitude: 0.036, phase: 1.4, cycle: 1.1 },
  NOV: { drift: 0.012, amplitude: 0.028, phase: 0.5, cycle: 1.4 },
  WY: { drift: 0.008, amplitude: 0.022, phase: 1.8, cycle: 1.6 },
  C: { drift: 0.01, amplitude: 0.027, phase: 0.9, cycle: 1.5 },
  BLK: { drift: 0.012, amplitude: 0.021, phase: 0.3, cycle: 1.7 },
  COG: { drift: 0.009, amplitude: 0.032, phase: 1.2, cycle: 1.2 },
  VZ: { drift: 0.006, amplitude: 0.017, phase: 0.7, cycle: 1.8 },
  BMY: { drift: 0.007, amplitude: 0.019, phase: 1.1, cycle: 1.6 },
  CRM: { drift: -0.008, amplitude: 0.026, phase: 0.4, cycle: 1.4 },
  WFC: { drift: -0.007, amplitude: 0.024, phase: 0.9, cycle: 1.6 },
  TSCO: { drift: -0.006, amplitude: 0.022, phase: 1.3, cycle: 1.5 },
  LEN: { drift: -0.009, amplitude: 0.03, phase: 0.6, cycle: 1.3 },
  PBCT: { drift: -0.005, amplitude: 0.02, phase: 1.5, cycle: 1.7 },
  BLL: { drift: -0.006, amplitude: 0.021, phase: 0.8, cycle: 1.6 },
  INTC: { drift: -0.007, amplitude: 0.028, phase: 1.1, cycle: 1.4 },
  ROL: { drift: -0.004, amplitude: 0.016, phase: 1.7, cycle: 1.8 },
  AMAT: { drift: -0.008, amplitude: 0.029, phase: 0.2, cycle: 1.3 },
  DE: { drift: -0.007, amplitude: 0.023, phase: 1.4, cycle: 1.5 },
};

const DEFAULT_SERIES_PROFILE: StockSeriesProfile = {
  drift: 0.008,
  amplitude: 0.022,
  phase: 0,
  cycle: 1.5,
};

const generateDummySeries = (
  startPrice: number,
  profile: StockSeriesProfile,
  dates: string[],
): StockPricePoint[] => {
  let currentPrice = startPrice;

  return dates.map((date, index) => {
    const seasonalSwing =
      Math.sin((index + profile.phase) * profile.cycle) * profile.amplitude * startPrice;
    const driftComponent = currentPrice * profile.drift;
    const shock = Math.cos((index + 1) * 0.9 + profile.phase) * startPrice * 0.004;

    if (index > 0) {
      currentPrice = Math.max(currentPrice + driftComponent + seasonalSwing * 0.18 + shock, 5);
    }

    return {
      date,
      close: Number(currentPrice.toFixed(2)),
    };
  });
};

const LONG_CONTRARIAN_STOCK_CHARTS: Record<string, StockPricePoint[]> =
  LONG_CONTRARIAN_STOCKS.reduce(
    (acc, stock) => {
      const profile = STOCK_SERIES_PROFILES[stock.ticker] ?? DEFAULT_SERIES_PROFILE;
      acc[stock.ticker] = generateDummySeries(stock.price, profile, CHART_DATES);
      return acc;
    },
    {} as Record<string, StockPricePoint[]>,
  );

const SHORT_CONTRARIAN_STOCK_CHARTS: Record<string, StockPricePoint[]> =
  SHORT_CONTRARIAN_STOCKS.reduce(
    (acc, stock) => {
      const profile = STOCK_SERIES_PROFILES[stock.ticker] ?? DEFAULT_SERIES_PROFILE;
      acc[stock.ticker] = generateDummySeries(stock.price, profile, CHART_DATES);
      return acc;
    },
    {} as Record<string, StockPricePoint[]>,
  );

export const getStocksForPortfolio = (portfolioId: string): StockData[] => {
  if (portfolioId === 'long-contrarian') {
    return LONG_CONTRARIAN_STOCKS;
  }

  if (portfolioId === 'short-contrarian') {
    return SHORT_CONTRARIAN_STOCKS;
  }

  return [];
};

export const getStockChartForPortfolioTicker = (
  portfolioId: string,
  ticker: string,
): StockPricePoint[] => {
  if (portfolioId === 'long-contrarian') {
    return LONG_CONTRARIAN_STOCK_CHARTS[ticker] ?? [];
  }

  if (portfolioId === 'short-contrarian') {
    return SHORT_CONTRARIAN_STOCK_CHARTS[ticker] ?? [];
  }

  return [];
};
