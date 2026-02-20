export interface StockData {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  description: string;
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  confidence: number; // 0-100
  keyMetrics: {
    marketCap: string;
    peRatio: string;
    dividend: string;
    beta: string;
  };
  factors: string[];
}

export interface StockPricePoint {
  date: string;
  close: number;
}

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

interface StockSeriesProfile {
  drift: number;
  amplitude: number;
  phase: number;
  cycle: number;
}

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

export const getStocksForPortfolio = (portfolioId: string): StockData[] => {
  if (portfolioId === 'long-contrarian') {
    return LONG_CONTRARIAN_STOCKS;
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

  return [];
};
