export interface BacktestRow {
  startDate: Date;
  assets: string[];
  weights: number[];
}

export interface HistoricalPrice {
  date: string;
  ticker: string;
  close: number;
}

export interface Position {
  ticker: string;
  weight: number;
  investedAmount: number;
  shares: number;
  buyPrice: number;
  currentPrice: number;
  currentValue: number;
}

export interface PeriodSnapshot {
  date: Date;
  positions: Position[];
  totalValue: number;
  periodReturn: number;
  cumulativeReturn: number;
}

export interface BacktestResult {
  snapshots: PeriodSnapshot[];
  finalValue: number;
  totalReturn: number;
  cagr: number;
  maxDrawdown: number;
  periods: number;
}

export interface BacktestConfig {
  initialCapital: number;
  fractionalShares: boolean;
  startDateOverride?: Date;
  priceData: Map<string, Map<string, number>>; // ticker -> date -> price
}
