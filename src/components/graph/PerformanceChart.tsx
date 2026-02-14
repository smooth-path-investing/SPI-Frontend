import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from 'recharts';
import type { OverallPerformanceChartProps } from '../../types';
import CustomTooltip from './tooltip';

export const OverallPerformanceChart: React.FC<OverallPerformanceChartProps> = ({
  data,
  height = 'h-[400px]',
  className = '',
}) => {
  return (
    <div
      className={`
        bg-[var(--card-bg)]
        border border-[var(--card-border)]
        rounded-[var(--radius)]
        p-6
        ${height}
        ${className}
      `}
    >
      <ResponsiveContainer width="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          {/* Gradients */}
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--muted-text)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--muted-text)" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid stroke="var(--card-border)" strokeDasharray="3 3" opacity={0.25} />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tickFormatter={(() => {
              let lastMonth: number | null = null;
              return (value: string) => {
                const d = new Date(value);
                const m = d.getMonth();
                if (m !== lastMonth) {
                  lastMonth = m;
                  return d.toLocaleString('default', { month: 'short' });
                }
                return '';
              };
            })()}
            tick={{ fill: 'var(--muted-text)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--ring)' }}
            tickLine={{ stroke: 'var(--card-border)' }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />

          {/* Y Axis */}
          <YAxis
            domain={[60, 160]}
            ticks={[60, 80, 100, 120, 140, 160]}
            tick={{ fill: 'var(--muted-text)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--ring)' }}
            tickLine={{ stroke: 'var(--card-border)' }}
            width={55}
          >
            <Label
              value="Cumulative Return (%)"
              angle={-90}
              position="insideLeft"
              style={{
                fontSize: 11,
                fill: 'var(--muted-text)',
                fontWeight: 500,
                textAnchor: 'middle',
              }}
              dx={-8}
            />
          </YAxis>

          {/* Reference Line at 100 */}
          <ReferenceLine
            y={100}
            stroke="var(--muted-text)"
            strokeDasharray="4 4"
            strokeOpacity={0.6}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Benchmark */}
          <Area
            type="monotone"
            dataKey="ivvVal"
            stroke="var(--muted-text)"
            strokeWidth={2}
            fill="url(#benchmarkGradient)"
            name="S&P 500"
          />

          {/* Portfolio */}
          <Area
            type="monotone"
            dataKey="spiVal"
            stroke="var(--accent)"
            strokeWidth={2.5}
            fill="url(#portfolioGradient)"
            name="Portfolio"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
