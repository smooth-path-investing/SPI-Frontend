export type StockRecommendation = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';

export interface StockKeyMetrics {
  marketCap: string;
  peRatio: string;
  dividend: string;
  beta: string;
}

export interface StockData {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  description: string;
  recommendation: StockRecommendation;
  confidence: number;
  keyMetrics: StockKeyMetrics;
  factors: string[];
}

export interface StockPricePoint {
  date: string;
  close: number;
}

export interface StockSeriesProfile {
  drift: number;
  amplitude: number;
  phase: number;
  cycle: number;
}
