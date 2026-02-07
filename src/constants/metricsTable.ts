import { derivedMetrics, performanceMetrics } from './mertics';

export const METRICS_TABLE_ROWS = [
  {
    label: 'Return p.a.',
    ivv: derivedMetrics.ivv.annualizedReturn,
    spi: derivedMetrics.spi.annualizedReturn,
    isPercent: true,
    precision: 0,
  },
  {
    label: 'Sharpe Ratio',
    ivv: performanceMetrics.ivv.sharpe,
    spi: performanceMetrics.spi.sharpe,
    precision: 2,
  },
  {
    label: 'Max Drawdown',
    ivv: performanceMetrics.ivv.maxDrawdown,
    spi: performanceMetrics.spi.maxDrawdown,
    isPercent: true,
    precision: 0,
  },
  {
    label: 'Gain/Loss Ratio',
    ivv: derivedMetrics.ivv.gainLossRatio,
    spi: derivedMetrics.spi.gainLossRatio,
    precision: 2,
  },
];
