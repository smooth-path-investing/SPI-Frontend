export interface StockData {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  description: string;
  keyMetrics: {
    marketCap: string;
    peRatio: string;
    dividend: string;
    beta: string;
  };
  factors: string[];
}

// Stock data for Long Contrarian Portfolio
export const LONG_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    price: 142.58,
    change: 2.34,
    changePercent: 1.67,
    description: 'A leading technology company specializing in internet-related services and products, including search, advertising, cloud computing, and artificial intelligence.',
    keyMetrics: {
      marketCap: '$1.8T',
      peRatio: '27.4',
      dividend: 'N/A',
      beta: '1.05'
    },
    factors: ['USACOR', 'IWO', 'USARSY', 'receivables', 'ebitdamargin']
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer Discretionary',
    price: 178.25,
    change: -1.45,
    changePercent: -0.81,
    description: 'Global e-commerce and cloud computing giant, operating in retail, digital streaming, and artificial intelligence sectors.',
    keyMetrics: {
      marketCap: '$1.9T',
      peRatio: '68.2',
      dividend: 'N/A',
      beta: '1.15'
    },
    factors: ['USAFDI', 'EWP', 'USAMKT', 'USACNCN', 'EWH']
  },
  {
    ticker: 'BAC',
    name: 'Bank of America',
    sector: 'Financial Services',
    price: 36.89,
    change: 0.78,
    changePercent: 2.16,
    description: 'Major American multinational investment bank and financial services company.',
    keyMetrics: {
      marketCap: '$285B',
      peRatio: '12.1',
      dividend: '2.8%',
      beta: '1.22'
    },
    factors: ['FXI', 'USATVS', 'USACARS', 'invcap', 'USAGYLD']
  },
  {
    ticker: 'DIS',
    name: 'The Walt Disney Company',
    sector: 'Communication Services',
    price: 112.45,
    change: 1.23,
    changePercent: 1.11,
    description: 'Diversified multinational entertainment and media conglomerate with theme parks, film studios, and streaming services.',
    keyMetrics: {
      marketCap: '$205B',
      peRatio: '45.3',
      dividend: 'N/A',
      beta: '0.98'
    },
    factors: ['pb', 'USAGD', 'USAMKT', 'de', 'USAEHS']
  },
  {
    ticker: 'WFC',
    name: 'Wells Fargo & Company',
    sector: 'Financial Services',
    price: 58.92,
    change: -0.34,
    changePercent: -0.57,
    description: 'Diversified financial services company providing banking, investment, and mortgage services.',
    keyMetrics: {
      marketCap: '$210B',
      peRatio: '11.8',
      dividend: '2.5%',
      beta: '1.18'
    },
    factors: ['accoci', 'EWZ', 'EWH', 'USAPSAV', 'USAEMPST']
  },
  {
    ticker: 'CVX',
    name: 'Chevron Corporation',
    sector: 'Energy',
    price: 156.78,
    change: 2.15,
    changePercent: 1.39,
    description: 'Integrated energy corporation engaged in petroleum, chemicals, mining, and power generation.',
    keyMetrics: {
      marketCap: '$295B',
      peRatio: '10.4',
      dividend: '3.6%',
      beta: '0.87'
    },
    factors: ['IYJ', 'IBB', 'USAFOET', 'USARSY', 'USAMKT']
  },
  {
    ticker: 'MRK',
    name: 'Merck & Co.',
    sector: 'Healthcare',
    price: 118.34,
    change: 0.89,
    changePercent: 0.76,
    description: 'Global healthcare company delivering innovative health solutions through prescription medicines and vaccines.',
    keyMetrics: {
      marketCap: '$299B',
      peRatio: '16.7',
      dividend: '2.8%',
      beta: '0.45'
    },
    factors: ['pb', 'EZA', 'IGM', 'USANAHB', 'USAGPAY']
  },
  {
    ticker: 'UPS',
    name: 'United Parcel Service',
    sector: 'Industrials',
    price: 145.67,
    change: -0.92,
    changePercent: -0.63,
    description: 'Package delivery and supply chain management company operating worldwide.',
    keyMetrics: {
      marketCap: '$125B',
      peRatio: '18.9',
      dividend: '3.9%',
      beta: '0.92'
    },
    factors: ['USARSY', 'USACCPI', 'USADPINC', 'EWU', 'USAPFED']
  },
  {
    ticker: 'ADBE',
    name: 'Adobe Inc.',
    sector: 'Technology',
    price: 568.92,
    change: 4.56,
    changePercent: 0.81,
    description: 'Software company known for creative, marketing, and document management solutions.',
    keyMetrics: {
      marketCap: '$258B',
      peRatio: '48.2',
      dividend: 'N/A',
      beta: '1.12'
    },
    factors: ['EWS', 'USANFIB', 'IYJ', 'sgna', 'EWA']
  },
  {
    ticker: 'TSCO',
    name: 'Tractor Supply Company',
    sector: 'Consumer Discretionary',
    price: 234.56,
    change: 1.78,
    changePercent: 0.76,
    description: 'Retail chain selling products for home improvement, agriculture, lawn and garden maintenance, and livestock care.',
    keyMetrics: {
      marketCap: '$25B',
      peRatio: '24.5',
      dividend: '1.8%',
      beta: '0.88'
    },
    factors: ['USACOSC', 'IOO', 'USAMKT', 'EWJ', 'EWP']
  }
];

// Placeholder stocks for other portfolios
export const SHORT_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive',
    price: 242.84,
    change: -3.45,
    changePercent: -1.40,
    description: 'Electric vehicle and clean energy company.',
    keyMetrics: {
      marketCap: '$770B',
      peRatio: '76.4',
      dividend: 'N/A',
      beta: '2.01'
    },
    factors: ['momentum', 'valuation', 'sentiment', 'volatility', 'growth']
  },
  // Add 9 more stocks...
];

export const LONG_TREND_STOCKS: StockData[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    price: 495.22,
    change: 8.92,
    changePercent: 1.83,
    description: 'Leading designer of graphics processing units for gaming and professional markets.',
    keyMetrics: {
      marketCap: '$1.2T',
      peRatio: '115.3',
      dividend: '0.03%',
      beta: '1.68'
    },
    factors: ['momentum', 'growth', 'technology', 'AI', 'semiconductors']
  },
  // Add 9 more stocks...
];

export const SHORT_TREND_STOCKS: StockData[] = [
  {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    sector: 'Communication Services',
    price: 445.73,
    change: -5.67,
    changePercent: -1.26,
    description: 'Entertainment services company specializing in streaming media.',
    keyMetrics: {
      marketCap: '$192B',
      peRatio: '44.8',
      dividend: 'N/A',
      beta: '1.23'
    },
    factors: ['trend', 'volatility', 'media', 'streaming', 'competition']
  },
  // Add 9 more stocks...
];

export const getStocksForPortfolio = (portfolioId: string): StockData[] => {
  switch (portfolioId) {
    case 'long-contrarian':
      return LONG_CONTRARIAN_STOCKS;
    case 'short-contrarian':
      return SHORT_CONTRARIAN_STOCKS;
    case 'long-trend':
      return LONG_TREND_STOCKS;
    case 'short-trend':
      return SHORT_TREND_STOCKS;
    default:
      return [];
  }
};
