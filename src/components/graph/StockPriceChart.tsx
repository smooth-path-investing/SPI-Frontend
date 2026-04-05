import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartTooltipShell,
  formatChartLongDate,
  formatChartShortDate,
  type StockPricePoint,
} from '@/features/stocks';
import { cn } from '@/lib/utils';

interface StockPriceChartProps {
  data: StockPricePoint[];
  ticker?: string;
  className?: string;
}

interface StockChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: StockPricePoint;
  }>;
  label?: string;
}

const CHART_FRAME_CLASS =
  'h-[280px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.14))] p-2 sm:h-[320px] sm:p-3';
const DEFAULT_AXIS_TICK = { fill: '#FFFFFF', fontSize: 11 };
const DEFAULT_AXIS_LINE = { stroke: '#FFFFFF', strokeOpacity: 0.55 };

const StockChartTooltip: React.FC<StockChartTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length || !label) return null;

  const price = payload[0].value;

  return (
    <ChartTooltipShell>
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]/90">
        Closing Price
      </p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <p className="text-base font-semibold tabular-nums text-[var(--foreground)]">
          ${price.toFixed(2)}
        </p>
        <p className="text-[11px] text-[var(--muted-text)]">{formatChartLongDate(label)}</p>
      </div>
    </ChartTooltipShell>
  );
};

export const StockPriceChart: React.FC<StockPriceChartProps> = ({
  data,
  ticker = 'stock',
  className = '',
}) => {
  if (data.length === 0) {
    return null;
  }

  const prices = data.map((row) => row.close);
  const minValue = Math.min(...prices);
  const maxValue = Math.max(...prices);
  const padding = Math.max((maxValue - minValue) * 0.12, 1);
  const firstClose = data[0]?.close ?? 0;
  const lowerBound = Number((minValue - padding).toFixed(2));
  const upperBound = Number((maxValue + padding).toFixed(2));
  const fillId = `${ticker.toLowerCase()}-price-fill`;
  const shadowId = `${ticker.toLowerCase()}-price-shadow`;

  return (
    <div className={cn(CHART_FRAME_CLASS, className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 16,
            right: 10,
            left: -18,
            bottom: 2,
          }}
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FACC15" stopOpacity={0.32} />
              <stop offset="70%" stopColor="#FACC15" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#FACC15" stopOpacity={0} />
            </linearGradient>
            <filter id={shadowId} x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow
                dx="0"
                dy="14"
                stdDeviation="16"
                floodColor="var(--accent)"
                floodOpacity="0.4"
              />
            </filter>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 8"
          />

          <XAxis
            dataKey="date"
            tickFormatter={formatChartShortDate}
            minTickGap={32}
            tick={DEFAULT_AXIS_TICK}
            axisLine={DEFAULT_AXIS_LINE}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(value: number) => `$${value.toFixed(0)}`}
            tick={DEFAULT_AXIS_TICK}
            axisLine={DEFAULT_AXIS_LINE}
            tickLine={false}
            width={64}
            domain={[lowerBound, upperBound]}
            tickCount={5}
          />

          <Tooltip
            cursor={{ stroke: 'rgba(250,204,21,0.3)', strokeDasharray: '4 8' }}
            content={<StockChartTooltip />}
          />

          <ReferenceLine
            y={firstClose}
            stroke="rgba(255,255,255,0.16)"
            strokeDasharray="5 5"
            ifOverflow="extendDomain"
          />

          <Area
            type="monotoneX"
            dataKey="close"
            stroke="rgba(250,204,21,0.4)"
            strokeWidth={1.4}
            fill={`url(#${fillId})`}
            name="Close"
            isAnimationActive={false}
          />

          <Line
            type="monotoneX"
            dataKey="close"
            stroke="#FFFFFF"
            strokeWidth={2.6}
            dot={false}
            activeDot={{
              r: 5,
              fill: '#0B0F19',
              stroke: '#FACC15',
              strokeWidth: 2,
            }}
            filter={`url(#${shadowId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
