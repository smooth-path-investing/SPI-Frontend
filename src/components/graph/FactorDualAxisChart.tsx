import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartTooltipShell,
  formatChartLongDate,
  formatChartShortDate,
  type FactorChartPoint,
} from '@/features/stocks';

interface FactorDualAxisChartProps {
  data: FactorChartPoint[];
  ticker: string;
  factorName: string;
}

const AXIS_TICK = { fontSize: 11 };
const STOCK_COLOR = '#FACC15'; // gold = stock (left axis)
const FACTOR_COLOR = '#FFFFFF'; // white = factor (right axis)

const compact = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  if (abs > 0 && abs < 1) return value.toFixed(2);
  return `${Math.round(value)}`;
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
  ticker: string;
  factorName: string;
}

const FactorTooltip: React.FC<TooltipProps> = ({ active, payload, label, ticker, factorName }) => {
  if (!active || !payload?.length || !label) return null;
  const stock = payload.find((p) => p.dataKey === 'stock')?.value;
  const factor = payload.find((p) => p.dataKey === 'factor')?.value;

  return (
    <ChartTooltipShell>
      <p className="text-[11px] text-[var(--muted-text)]">{formatChartLongDate(label)}</p>
      <div className="mt-2 space-y-1">
        <p className="flex items-center justify-between gap-5 text-sm">
          <span className="inline-flex items-center gap-2 text-[var(--accent)]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: STOCK_COLOR }} />
            {ticker}
          </span>
          <span className="tabular-nums text-[var(--foreground)]">
            {typeof stock === 'number' ? `$${stock.toFixed(2)}` : '—'}
          </span>
        </p>
        <p className="flex items-center justify-between gap-5 text-sm">
          <span className="inline-flex items-center gap-2 text-[var(--foreground)]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: FACTOR_COLOR }} />
            {factorName}
          </span>
          <span className="tabular-nums text-[var(--foreground)]">
            {typeof factor === 'number' ? compact(factor) : '—'}
          </span>
        </p>
      </div>
    </ChartTooltipShell>
  );
};

export const FactorDualAxisChart: React.FC<FactorDualAxisChartProps> = ({
  data,
  ticker,
  factorName,
}) => {
  return (
    <div className="h-[260px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.14))] p-2 sm:h-[300px] sm:p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 6, left: -6, bottom: 2 }}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartShortDate}
            minTickGap={32}
            tick={{ ...AXIS_TICK, fill: '#FFFFFF' }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.55 }}
            tickLine={false}
          />
          <YAxis
            yAxisId="stock"
            orientation="left"
            tickFormatter={(value: number) => `$${compact(value)}`}
            tick={{ ...AXIS_TICK, fill: STOCK_COLOR }}
            axisLine={{ stroke: STOCK_COLOR, strokeOpacity: 0.5 }}
            tickLine={false}
            width={56}
          />
          <YAxis
            yAxisId="factor"
            orientation="right"
            tickFormatter={(value: number) => compact(value)}
            tick={{ ...AXIS_TICK, fill: FACTOR_COLOR }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.4 }}
            tickLine={false}
            width={56}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(250,204,21,0.3)', strokeDasharray: '4 8' }}
            content={<FactorTooltip ticker={ticker} factorName={factorName} />}
          />
          <Line
            yAxisId="stock"
            type="monotoneX"
            dataKey="stock"
            name={ticker}
            stroke={STOCK_COLOR}
            strokeWidth={2.6}
            dot={false}
            connectNulls
            isAnimationActive={false}
          />
          <Line
            yAxisId="factor"
            type="monotoneX"
            dataKey="factor"
            name={factorName}
            stroke={FACTOR_COLOR}
            strokeWidth={2.2}
            dot={false}
            connectNulls
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
