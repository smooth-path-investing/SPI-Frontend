export interface CumulativeReturnComparisonPoint {
  date: string;
  stockCum: number;
  ivvCum: number;
}

export interface IndicatorWeightPoint {
  key: string;
  indicator: string;
  weight: number;
}

export type IndicatorNormalizedPoint = {
  date: string;
} & Record<string, string | number>;

export interface TickerIndicatorMeta {
  key: string;
  label: string;
  weight: number;
  seriesType?: 'stock' | 'indicator';
}

export interface TickerAnalytics {
  cumulativeReturns: CumulativeReturnComparisonPoint[];
  indicatorWeights: IndicatorWeightPoint[];
  normalizedIndicatorSeries: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
}
