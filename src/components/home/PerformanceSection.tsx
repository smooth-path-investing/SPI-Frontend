import React, { useMemo } from 'react';
import { PerformanceChart } from '../charts/PerformanceChart';
import { performanceData } from '@/constants/graph';
import { formattedMetrics, performanceMetrics } from '@/constants/mertics';

// ---------- Metric Calculation Functions ----------

// Total Return (%) from cumulative values
const calculateTotalReturn = (data: { spi: number; sp500: number }[], key: 'spi' | 'sp500') => {
  const start = data[0][key];
  const end = data[data.length - 1][key];
  return ((end - start) / start) * 100;
};

// Maximum Drawdown (%) from cumulative values
const calculateMaxDrawdown = (data: { spi: number; sp500: number }[], key: 'spi' | 'sp500') => {
  let peak = data[0][key];
  let maxDrawdown = 0;

  data.forEach((point) => {
    if (point[key] > peak) peak = point[key];
    const drawdown = (point[key] - peak) / peak; // always <= 0
    if (drawdown < maxDrawdown) maxDrawdown = drawdown;
  });

  return maxDrawdown * 100;
};

// Sharpe Ratio from daily returns
const calculateSharpeRatio = (data: { spi: number; sp500: number }[], key: 'spi' | 'sp500') => {
  const dailyReturns: number[] = [];
  for (let i = 1; i < data.length; i++) {
    const ret = (data[i][key] - data[i - 1][key]) / data[i - 1][key];
    dailyReturns.push(ret);
  }

  const meanReturn = dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length;

  const stdDev = Math.sqrt(
    dailyReturns.map((r) => (r - meanReturn) ** 2).reduce((sum, r) => sum + r, 0) /
      (dailyReturns.length - 1),
  );

  return meanReturn / stdDev;
};

// Gain / Loss Ratio from daily changes
const calculateGainLossRatio = (data: { spi: number; sp500: number }[], key: 'spi' | 'sp500') => {
  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 1; i < data.length; i++) {
    const change = data[i][key] - data[i - 1][key];
    if (change > 0) gains.push(change);
    if (change < 0) losses.push(Math.abs(change));
  }

  const avgGain = gains.reduce((sum, g) => sum + g, 0) / (gains.length || 1);
  const avgLoss = losses.reduce((sum, l) => sum + l, 0) / (losses.length || 1);

  return avgGain / (avgLoss || 1);
};

// ---------- Component ----------
export const PerformanceSection: React.FC = () => {
  const metrics = useMemo(() => {
    return {
      totalReturnSPI: calculateTotalReturn(performanceData, 'spi'),
      totalReturnSP500: calculateTotalReturn(performanceData, 'sp500'),
      maxDrawdownSPI: calculateMaxDrawdown(performanceData, 'spi'),
      maxDrawdownSP500: calculateMaxDrawdown(performanceData, 'sp500'),
      sharpeSPI: calculateSharpeRatio(performanceData, 'spi'),
      sharpeSP500: calculateSharpeRatio(performanceData, 'sp500'),
      gainLossSPI: calculateGainLossRatio(performanceData, 'spi'),
      gainLossSP500: calculateGainLossRatio(performanceData, 'sp500'),
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/30 z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Chart */}
        <div className="flex-1 mb-12 lg:mb-0">
          <PerformanceChart className="w-full h-full shadow-2xl" />
        </div>

        {/* Key Metrics Table (IVV vs SPI) */}
        <div className="w-full lg:w-[450px] bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Key Performance Metrics</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">S&P500</th>
                <th className="text-right py-2">SPI</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {/* Ending VAMI */}
              <tr>
                <td className="py-2">Ending VAMI</td>
                <td className="text-right">{performanceMetrics.ivv.endingVami.toFixed(2)}</td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {performanceMetrics.spi.endingVami.toFixed(2)}
                </td>
              </tr>

              {/* Max Drawdown */}
              <tr>
                <td className="py-2">Max Drawdown</td>
                <td className="text-right">
                  {(performanceMetrics.ivv.maxDrawdown * 100).toFixed(2)}%
                </td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {(performanceMetrics.spi.maxDrawdown * 100).toFixed(2)}%
                </td>
              </tr>

              {/* Sharpe Ratio */}
              <tr>
                <td className="py-2">Sharpe Ratio</td>
                <td className="text-right">{performanceMetrics.ivv.sharpe.toFixed(2)}</td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {performanceMetrics.spi.sharpe.toFixed(2)}
                </td>
              </tr>

              {/* Sortino Ratio */}
              <tr>
                <td className="py-2">Sortino Ratio</td>
                <td className="text-right">{performanceMetrics.ivv.sortino.toFixed(2)}</td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {performanceMetrics.spi.sortino.toFixed(2)}
                </td>
              </tr>

              {/* Standard Deviation */}
              <tr>
                <td className="py-2">Std. Deviation</td>
                <td className="text-right">{(performanceMetrics.ivv.stdDev * 100).toFixed(2)}%</td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {(performanceMetrics.spi.stdDev * 100).toFixed(2)}%
                </td>
              </tr>

              {/* Downside Deviation */}
              <tr>
                <td className="py-2">Downside Deviation</td>
                <td className="text-right">
                  {(performanceMetrics.ivv.downsideDev * 100).toFixed(2)}%
                </td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {(performanceMetrics.spi.downsideDev * 100).toFixed(2)}%
                </td>
              </tr>

              {/* Daily Mean Return */}
              <tr>
                <td className="py-2">Mean Return</td>
                <td className="text-right">
                  {(performanceMetrics.ivv.meanReturn * 100).toFixed(3)}%
                </td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {(performanceMetrics.spi.meanReturn * 100).toFixed(3)}%
                </td>
              </tr>

              {/* Annualized Return (derived) */}
              <tr>
                <td className="py-2">Annualized Return</td>
                <td className="text-right">{formattedMetrics.ivv.annualizedReturn}</td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {formattedMetrics.spi.annualizedReturn}
                </td>
              </tr>

              {/* Gain/Loss Ratio (derived) */}
              <tr>
                <td className="py-2">Gain/Loss Ratio</td>
                <td className="text-right">{formattedMetrics.ivv.gainLossRatio}</td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {formattedMetrics.spi.gainLossRatio}
                </td>
              </tr>

              {/* Positive / Negative Periods */}
              <tr>
                <td className="py-2">Positive Periods</td>
                <td className="text-right">
                  {performanceMetrics.ivv.positivePeriods.count} (
                  {(performanceMetrics.ivv.positivePeriods.percent * 100).toFixed(2)}%)
                </td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {performanceMetrics.spi.positivePeriods.count} (
                  {(performanceMetrics.spi.positivePeriods.percent * 100).toFixed(2)}%)
                </td>
              </tr>

              <tr>
                <td className="py-2">Negative Periods</td>
                <td className="text-right">
                  {performanceMetrics.ivv.negativePeriods.count} (
                  {(performanceMetrics.ivv.negativePeriods.percent * 100).toFixed(2)}%)
                </td>
                <td className="text-right" style={{ color: '#FFD700' }}>
                  {performanceMetrics.spi.negativePeriods.count} (
                  {(performanceMetrics.spi.negativePeriods.percent * 100).toFixed(2)}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
