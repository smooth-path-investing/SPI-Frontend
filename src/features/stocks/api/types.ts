import type { IndicatorNormalizedPoint, TickerIndicatorMeta } from '../analytics/types';
import type { StockPricePoint } from '../types';

export interface StockAssetChartSeries {
  ticker: string;
  benchmarkTicker: 'IVV';
  interval: 'quarterly';
  asOf: string;
  tickerPoints: StockPricePoint[];
  ivvPoints: StockPricePoint[];
}

export interface StockFactorBarValue {
  factorName: string;
  normalizedValue: number;
}

export interface StockFundamentalChartSeries {
  data: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
}

export interface StockFundamentalSeriesPoint {
  date: string;
  value: number;
}

export interface StockFundamentalSeries {
  label: string;
  points: StockFundamentalSeriesPoint[];
}

export type {
  IndicatorNormalizedPoint,
  TickerIndicatorMeta,
} from '../analytics/types';
