import type { StockData, StockPricePoint } from './stockData';

export const STOCK_PREVIEW_SAMPLE: StockData = {
  ticker: 'SPIX',
  name: 'SPI Sample Holdings',
  sector: 'Technology',
  price: 124.38,
  change: 1.74,
  changePercent: 1.42,
  description:
    'This is a sample ticker page used to preview the SPI analysis experience before subscription. Live tickers on the stock list will come from the portfolio API.',
  recommendation: 'Buy',
  confidence: 88,
  keyMetrics: {
    marketCap: '$48.3B',
    peRatio: '22.6',
    dividend: '0.80%',
    beta: '1.12',
  },
  factors: [
    'Recurring revenue mix',
    'Margin expansion setup',
    'Free cash flow durability',
  ],
};

export const STOCK_PREVIEW_SAMPLE_CHART: StockPricePoint[] = [
  { date: 'Jan', close: 108.2 },
  { date: 'Feb', close: 110.7 },
  { date: 'Mar', close: 113.4 },
  { date: 'Apr', close: 116.1 },
  { date: 'May', close: 115.3 },
  { date: 'Jun', close: 117.8 },
  { date: 'Jul', close: 119.9 },
  { date: 'Aug', close: 121.2 },
  { date: 'Sep', close: 120.4 },
  { date: 'Oct', close: 122.9 },
  { date: 'Nov', close: 123.1 },
  { date: 'Dec', close: 124.38 },
];

export const isStockPreviewSampleTicker = (ticker?: string): boolean =>
  ticker === STOCK_PREVIEW_SAMPLE.ticker;
