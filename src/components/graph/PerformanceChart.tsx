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
    <div className={`bg-card rounded-lg border border-border p-4 ${height} ${className}`}>
      <ResponsiveContainer width="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="spiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="ivvGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.25} />
              <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />

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
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />

          <YAxis
            domain={[60, 160]}
            ticks={[60, 80, 100, 120, 140, 160]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            width={50}
          >
            <Label
              value="Cumulative Return (%)"
              angle={-90}
              position="insideLeft" // Changed to insideLeft for more reliable alignment
              style={{
                fontSize: 10,
                fill: 'hsl(var(--muted-foreground))',
                fontWeight: 500,
                textAnchor: 'middle',
              }}
              offset={0}
              dx={-5} // Fine-tune this based on your specific font
            />
          </YAxis>

          <ReferenceLine
            y={100}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="3 3"
            strokeWidth={1}
            strokeOpacity={0.8}
          >
            <Label
              position="insideBottomLeft"
              fill="hsl(var(--muted-foreground))"
              fontSize={10}
              dy={-5}
            />
          </ReferenceLine>

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="ivvVal"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            fill="url(#ivvGradient)"
            name="S&P 500"
          />

          <Area
            type="monotone"
            dataKey="spiVal"
            stroke="#FFD700"
            strokeWidth={2}
            fill="url(#spiGradient)"
            name="Portfolio"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
