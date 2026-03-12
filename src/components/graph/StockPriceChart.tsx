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
import type { StockPricePoint } from '@/constants/stockData';

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

const isIsoDateLabel = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);

const formatShortDate = (date: string) => {
  if (!isIsoDateLabel(date)) {
    return date;
  }

  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

const formatLongDate = (date: string) => {
  if (!isIsoDateLabel(date)) {
    return date;
  }

  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

const StockChartTooltip: React.FC<StockChartTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length || !label) return null;

  const price = payload[0].value;

  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 px-3.5 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1">
        {formatLongDate(label)}
      </p>
      <p className="text-base font-semibold text-[var(--foreground)] tabular-nums">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};

export const StockPriceChart: React.FC<StockPriceChartProps> = ({ data, ticker = 'stock', className = '' }) => {
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
    <div className={`h-[280px] sm:h-[320px] w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 18,
            right: 10,
            left: -20,
            bottom: 6,
          }}
        >
          <defs>
            <pattern id={fillId} patternUnits="userSpaceOnUse" width="1" height="1">
              <rect width="1" height="1" fill="rgba(250,204,21,0.22)" />
            </pattern>
            <filter id={shadowId} x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow
                dx="0"
                dy="14"
                stdDeviation="16"
                floodColor="var(--accent)"
                floodOpacity="0.16"
              />
            </filter>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="3 6"
          />

          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
            minTickGap={32}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(value: number) => `$${value.toFixed(0)}`}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
            width={64}
            domain={[lowerBound, upperBound]}
            tickCount={5}
          />

          <Tooltip
            cursor={{ stroke: 'rgba(250,204,21,0.22)', strokeDasharray: '4 8' }}
            content={<StockChartTooltip />}
          />

          <ReferenceLine
            y={firstClose}
            stroke="rgba(250,204,21,0.16)"
            strokeDasharray="5 5"
            ifOverflow="extendDomain"
          />

          <Area
            type="monotoneX"
            dataKey="close"
            stroke="transparent"
            fill={`url(#${fillId})`}
            name="Close"
            isAnimationActive={false}
          />

          <Line
            type="monotoneX"
            dataKey="close"
            stroke="#FFFFFF"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 5,
              fill: 'var(--background)',
              stroke: '#FFFFFF',
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
