import { derivedMetrics, performanceMetrics } from './mertics';

export type MetricDirection = 'higher' | 'lower';

export interface MetricsTableRow {
  label: string;
  ivv: number;
  spi: number;
  isPercent?: boolean;
  precision?: number;
  tooltip: string;
  direction: MetricDirection;
}

export const METRICS_TABLE_ROWS: MetricsTableRow[] = [
  {
    label: 'Return p.a.',
    ivv: derivedMetrics.ivv.annualizedReturn,
    spi: derivedMetrics.spi.annualizedReturn,
    isPercent: true,
    precision: 0,
    tooltip: 'The average yearly return of the strategy. Higher means the investment grows faster over time.',
    direction: 'higher',
  },
  {
    label: 'Sharpe Ratio',
    ivv: performanceMetrics.ivv.sharpe,
    spi: performanceMetrics.spi.sharpe,
    precision: 2,
    tooltip:
      'Measures return relative to risk. A higher Sharpe ratio means better returns for the amount of volatility taken.',
    direction: 'higher',
  },
  {
    label: 'Max Drawdown',
    ivv: performanceMetrics.ivv.maxDrawdown,
    spi: performanceMetrics.spi.maxDrawdown,
    isPercent: true,
    precision: 0,
    tooltip:
      'The largest percentage drop from a peak to a trough. Indicates worst historical loss. Lower means smaller crashes.',
    direction: 'lower',
  },
  {
    label: 'Gain/Loss Ratio',
    ivv: derivedMetrics.ivv.gainLossRatio,
    spi: derivedMetrics.spi.gainLossRatio,
    precision: 2,
    tooltip:
      'Compares the average winning trade to the average losing trade. Above 1 means wins are larger than losses.',
    direction: 'higher',
  },
];
