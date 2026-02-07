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

export const getStocksForPortfolio = (portfolioId: string): StockData[] => {
  return [];
};
