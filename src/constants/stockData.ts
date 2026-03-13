import type { StockData, StockPricePoint, StockSeriesProfile } from '@/features/stocks/types';

export type { StockData, StockPricePoint } from '@/features/stocks/types';

export const LONG_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'GE',
    name: 'General Electric Aerospace',
    sector: 'Industrials',
    price: 188.42,
    change: 2.31,
    changePercent: 1.24,
    description: 'Aerospace and industrial technology company with improving margins and strong free cash flow.',
    recommendation: 'Buy',
    confidence: 82,
    keyMetrics: {
      marketCap: '$205B',
      peRatio: '34.1',
      dividend: '0.61%',
      beta: '1.20',
    },
    factors: ['Cash flow expansion', 'Order backlog strength', 'Margin improvement'],
  },
  {
    ticker: 'IBM',
    name: 'International Business Machines',
    sector: 'Technology',
    price: 212.67,
    change: 1.88,
    changePercent: 0.89,
    description: 'Enterprise technology platform focused on hybrid cloud, automation, and mission-critical services.',
    recommendation: 'Buy',
    confidence: 79,
    keyMetrics: {
      marketCap: '$198B',
      peRatio: '23.4',
      dividend: '3.08%',
      beta: '0.71',
    },
    factors: ['Recurring software revenue', 'AI enterprise demand', 'Operating leverage'],
  },
  {
    ticker: 'APA',
    name: 'APA Corporation',
    sector: 'Energy',
    price: 34.11,
    change: 0.66,
    changePercent: 1.97,
    description: 'Independent exploration and production company with diversified onshore and offshore assets.',
    recommendation: 'Buy',
    confidence: 74,
    keyMetrics: {
      marketCap: '$12.6B',
      peRatio: '8.9',
      dividend: '2.95%',
      beta: '2.52',
    },
    factors: ['Commodity sensitivity', 'Cost discipline', 'Reserve replacement'],
  },
  {
    ticker: 'NOV',
    name: 'NOV Inc.',
    sector: 'Energy',
    price: 21.74,
    change: 0.27,
    changePercent: 1.26,
    description: 'Oilfield equipment and services provider positioned for capex recovery in global energy markets.',
    recommendation: 'Buy',
    confidence: 73,
    keyMetrics: {
      marketCap: '$8.2B',
      peRatio: '15.7',
      dividend: '1.31%',
      beta: '1.69',
    },
    factors: ['Cycle recovery', 'Backlog growth', 'Margin normalization'],
  },
  {
    ticker: 'WY',
    name: 'Weyerhaeuser Company',
    sector: 'Real Estate',
    price: 34.58,
    change: 0.39,
    changePercent: 1.14,
    description: 'Timberland REIT with exposure to housing demand, lumber pricing, and long-duration real assets.',
    recommendation: 'Buy',
    confidence: 71,
    keyMetrics: {
      marketCap: '$24.9B',
      peRatio: '31.8',
      dividend: '2.35%',
      beta: '1.40',
    },
    factors: ['Housing cycle', 'Asset quality', 'Pricing optionality'],
  },
  {
    ticker: 'C',
    name: 'Citigroup Inc.',
    sector: 'Financials',
    price: 71.93,
    change: 0.84,
    changePercent: 1.18,
    description: 'Global bank undergoing restructuring with improving capital efficiency and expense discipline.',
    recommendation: 'Buy',
    confidence: 78,
    keyMetrics: {
      marketCap: '$134B',
      peRatio: '12.3',
      dividend: '3.19%',
      beta: '1.42',
    },
    factors: ['Capital return', 'Cost transformation', 'Credit normalization'],
  },
  {
    ticker: 'BLK',
    name: 'BlackRock, Inc.',
    sector: 'Financials',
    price: 931.47,
    change: 7.24,
    changePercent: 0.78,
    description: 'Global asset manager with scale advantages across ETFs, fixed income, and institutional mandates.',
    recommendation: 'Buy',
    confidence: 81,
    keyMetrics: {
      marketCap: '$140B',
      peRatio: '22.1',
      dividend: '2.54%',
      beta: '1.29',
    },
    factors: ['AUM growth', 'Fee resilience', 'Platform scale'],
  },
  {
    ticker: 'COG',
    name: 'Cabot Oil & Gas (legacy ticker)',
    sector: 'Energy',
    price: 28.64,
    change: 0.21,
    changePercent: 0.74,
    description: 'Natural gas-focused operator used here as a placeholder legacy ticker for interim data mapping.',
    recommendation: 'Buy',
    confidence: 69,
    keyMetrics: {
      marketCap: '$8.9B',
      peRatio: '10.8',
      dividend: '2.11%',
      beta: '1.08',
    },
    factors: ['Gas pricing', 'Production efficiency', 'Capital discipline'],
  },
  {
    ticker: 'VZ',
    name: 'Verizon Communications',
    sector: 'Communication Services',
    price: 41.22,
    change: 0.36,
    changePercent: 0.88,
    description: 'Telecom operator with stable cash generation, deleveraging path, and large subscriber base.',
    recommendation: 'Buy',
    confidence: 72,
    keyMetrics: {
      marketCap: '$173B',
      peRatio: '9.7',
      dividend: '6.43%',
      beta: '0.40',
    },
    factors: ['Cash flow stability', 'Debt reduction', 'Subscriber retention'],
  },
  {
    ticker: 'BMY',
    name: 'Bristol Myers Squibb',
    sector: 'Healthcare',
    price: 55.84,
    change: 0.59,
    changePercent: 1.07,
    description: 'Large-cap biopharma with diversified pipeline and resilient cash generation from core franchises.',
    recommendation: 'Buy',
    confidence: 76,
    keyMetrics: {
      marketCap: '$113B',
      peRatio: '13.6',
      dividend: '4.28%',
      beta: '0.45',
    },
    factors: ['Pipeline execution', 'Patent cycle management', 'Valuation support'],
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
    price: 17.46,
    change: -0.19,
    changePercent: -1.08,
    description: 'Legacy regional-bank mapping placeholder representing regional-credit and funding stress exposure.',
    recommendation: 'Sell',
    confidence: 66,
    keyMetrics: {
      marketCap: '$7.4B',
      peRatio: '11.2',
      dividend: '3.34%',
      beta: '0.92',
    },
    factors: ['Regional credit risk', 'Net interest margin compression', 'Funding pressure'],
  },
  {
    ticker: 'BLL',
    name: 'Ball Corporation',
    sector: 'Materials',
    price: 60.83,
    change: -0.74,
    changePercent: -1.20,
    description: 'Packaging manufacturer with input-cost sensitivity and demand variability across end markets.',
    recommendation: 'Sell',
    confidence: 68,
    keyMetrics: {
      marketCap: '$18.5B',
      peRatio: '22.9',
      dividend: '1.38%',
      beta: '0.97',
    },
    factors: ['Demand slowdown risk', 'Cost pass-through limits', 'Operating leverage'],
  },
  {
    ticker: 'INTC',
    name: 'Intel Corporation',
    sector: 'Technology',
    price: 44.18,
    change: -0.52,
    changePercent: -1.16,
    description: 'Semiconductor turnaround story with execution risk and heavy capex burden.',
    recommendation: 'Sell',
    confidence: 75,
    keyMetrics: {
      marketCap: '$188B',
      peRatio: '31.6',
      dividend: '1.13%',
      beta: '1.05',
    },
    factors: ['Execution uncertainty', 'Capex intensity', 'Competitive pressure'],
  },
  {
    ticker: 'ROL',
    name: 'Rollins, Inc.',
    sector: 'Industrials',
    price: 45.74,
    change: -0.39,
    changePercent: -0.85,
    description: 'Defensive services name where premium valuation may face de-rating in risk-off rotations.',
    recommendation: 'Sell',
    confidence: 65,
    keyMetrics: {
      marketCap: '$22.1B',
      peRatio: '48.1',
      dividend: '1.07%',
      beta: '0.73',
    },
    factors: ['Valuation stretch', 'Multiple compression', 'Growth deceleration'],
  },
  {
    ticker: 'AMAT',
    name: 'Applied Materials, Inc.',
    sector: 'Technology',
    price: 201.35,
    change: -2.63,
    changePercent: -1.29,
    description: 'Semicap supplier vulnerable to cyclicality in wafer-fab equipment spending.',
    recommendation: 'Sell',
    confidence: 73,
    keyMetrics: {
      marketCap: '$166B',
      peRatio: '23.2',
      dividend: '0.77%',
      beta: '1.56',
    },
    factors: ['Cycle peak risk', 'Capex pullback risk', 'Order volatility'],
  },
  {
    ticker: 'DE',
    name: 'Deere & Company',
    sector: 'Industrials',
    price: 401.92,
    change: -3.57,
    changePercent: -0.88,
    description: 'Capital equipment leader with cyclical demand risk tied to farm income and financing costs.',
    recommendation: 'Sell',
    confidence: 72,
    keyMetrics: {
      marketCap: '$110B',
      peRatio: '14.3',
      dividend: '1.33%',
      beta: '1.09',
    },
    factors: ['Cycle normalization', 'Order momentum slowdown', 'Inventory correction risk'],
  },
];

const STOCK_SERIES_PROFILES: Record<string, StockSeriesProfile> = {
  GE: { drift: 0.34, amplitude: 0.05, phase: 1, cycle: 3.1 },
  IBM: { drift: 0.22, amplitude: 0.035, phase: 2, cycle: 3.6 },
  APA: { drift: 0.28, amplitude: 0.07, phase: 5, cycle: 2.7 },
  NOV: { drift: 0.26, amplitude: 0.065, phase: 3, cycle: 2.9 },
  WY: { drift: 0.19, amplitude: 0.04, phase: 4, cycle: 3.8 },
  C: { drift: 0.24, amplitude: 0.045, phase: 2, cycle: 3.4 },
  BLK: { drift: 0.31, amplitude: 0.055, phase: 1, cycle: 3.2 },
  COG: { drift: 0.21, amplitude: 0.06, phase: 6, cycle: 2.8 },
  VZ: { drift: 0.15, amplitude: 0.03, phase: 0, cycle: 4.1 },
  BMY: { drift: 0.18, amplitude: 0.038, phase: 3, cycle: 3.7 },
  CRM: { drift: -0.22, amplitude: 0.055, phase: 2, cycle: 3.3 },
  WFC: { drift: -0.18, amplitude: 0.045, phase: 5, cycle: 3.7 },
  TSCO: { drift: -0.15, amplitude: 0.04, phase: 1, cycle: 4.0 },
  LEN: { drift: -0.24, amplitude: 0.06, phase: 4, cycle: 3.0 },
  PBCT: { drift: -0.19, amplitude: 0.05, phase: 3, cycle: 3.4 },
  BLL: { drift: -0.17, amplitude: 0.045, phase: 0, cycle: 3.9 },
  INTC: { drift: -0.23, amplitude: 0.06, phase: 6, cycle: 2.8 },
  ROL: { drift: -0.14, amplitude: 0.035, phase: 2, cycle: 4.2 },
  AMAT: { drift: -0.25, amplitude: 0.065, phase: 1, cycle: 2.9 },
  DE: { drift: -0.2, amplitude: 0.052, phase: 5, cycle: 3.2 },
};

const DEFAULT_SERIES_PROFILE: StockSeriesProfile = {
  drift: 0.2,
  amplitude: 0.04,
  phase: 0,
  cycle: 3.5,
};

const createWeeklyDatePoints = (count: number): string[] => {
  const start = new Date(Date.UTC(2025, 0, 3));
  return Array.from({ length: count }, (_, index) => {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + index * 7);
    return current.toISOString().slice(0, 10);
  });
};

const CHART_DATES = createWeeklyDatePoints(36);

const generateDummySeries = (
  finalPrice: number,
  profile: StockSeriesProfile,
  dates: string[],
): StockPricePoint[] => {
  const raw = dates.map((date, index) => {
    const progress = index / Math.max(dates.length - 1, 1);
    const trend = 1 + profile.drift * progress;
    const wave =
      Math.sin((index + profile.phase) / profile.cycle) * profile.amplitude +
      Math.cos((index + profile.phase) * 0.7) * (profile.amplitude * 0.33);

    return {
      date,
      value: Math.max(trend + wave, 0.2),
    };
  });

  const finalRawValue = raw[raw.length - 1]?.value ?? 1;
  const scale = finalPrice / finalRawValue;

  return raw.map((point) => ({
    date: point.date,
    close: Number((point.value * scale).toFixed(2)),
  }));
};

export const LONG_CONTRARIAN_STOCK_CHARTS: Record<string, StockPricePoint[]> =
  LONG_CONTRARIAN_STOCKS.reduce(
    (acc, stock) => {
      const profile = STOCK_SERIES_PROFILES[stock.ticker] ?? DEFAULT_SERIES_PROFILE;
      acc[stock.ticker] = generateDummySeries(stock.price, profile, CHART_DATES);
      return acc;
    },
    {} as Record<string, StockPricePoint[]>,
  );

export const SHORT_CONTRARIAN_STOCK_CHARTS: Record<string, StockPricePoint[]> =
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
