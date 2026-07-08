import type { FC } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltipShell, formatChartLongDate, formatChartShortDate } from '@/features/stocks';
import {
  HF_PERFORMANCE_DATA,
  HF_PERFORMANCE_SUMMARY,
} from '@/constants/hedgeFundPerformance';
import { cn } from '@/lib/utils';

export const HF_SERIES = [
  { key: 'spi', label: 'SPI', color: '#3B82F6', value: HF_PERFORMANCE_SUMMARY.spi },
  { key: 'ivv', label: 'IVV (S&P 500)', color: '#22C55E', value: HF_PERFORMANCE_SUMMARY.ivv },
  { key: 'ijr', label: 'IJR (Small Cap)', color: '#FACC15', value: HF_PERFORMANCE_SUMMARY.ijr },
] as const;

interface PerformanceTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
}

const PerformanceTooltip: FC<PerformanceTooltipProps> = ({ active, label, payload }) => {
  if (!active || !payload?.length || !label) return null;

  return (
    <ChartTooltipShell>
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]/90">
        {formatChartLongDate(label)}
      </p>
      <div className="mt-2 space-y-1.5">
        {HF_SERIES.map((series) => {
          const row = payload.find((item) => item.dataKey === series.key);
          if (!row) return null;
          return (
            <div key={series.key} className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-2 text-[12px] text-[var(--muted-text)]">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: series.color }} />
                {series.label}
              </span>
              <span className="text-[13px] font-semibold tabular-nums text-[var(--foreground)]">
                {row.value >= 0 ? '+' : ''}
                {row.value.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </ChartTooltipShell>
  );
};

interface HedgeFundPerformanceChartProps {
  className?: string;
  /** Height of the plot area */
  heightClassName?: string;
  /** Show the inline legend with final returns above the chart */
  showLegend?: boolean;
}

export const HedgeFundPerformanceChart: FC<HedgeFundPerformanceChartProps> = ({
  className,
  heightClassName = 'h-[260px] w-full sm:h-[300px]',
  showLegend = true,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {showLegend && (
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {HF_SERIES.map((series) => (
            <span
              key={series.key}
              className="flex items-center gap-1.5 text-[11px] text-[var(--muted-text)]"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: series.color }} />
              {series.label}
              <span
                className="font-semibold tabular-nums"
                style={{ color: series.color }}
              >
                {series.value >= 0 ? '+' : ''}
                {series.value.toFixed(1)}%
              </span>
            </span>
          ))}
        </div>
      )}

      <div className={heightClassName}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={HF_PERFORMANCE_DATA} margin={{ top: 12, right: 12, left: -12, bottom: 4 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" />
            <XAxis
              dataKey="date"
              tickFormatter={formatChartShortDate}
              minTickGap={48}
              tick={{ fill: '#FFFFFF', fontSize: 11 }}
              axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.4 }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value: number) => `${value}%`}
              tick={{ fill: '#FFFFFF', fontSize: 11 }}
              axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.4 }}
              tickLine={false}
              width={48}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeDasharray: '4 8' }}
              content={<PerformanceTooltip />}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.18)" strokeDasharray="5 5" />
            {HF_SERIES.map((series) => (
              <Line
                key={series.key}
                type="monotone"
                dataKey={series.key}
                stroke={series.color}
                strokeWidth={series.key === 'spi' ? 2.8 : 1.8}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
