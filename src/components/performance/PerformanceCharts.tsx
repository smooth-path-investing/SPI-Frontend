import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  monthlyPerformanceData,
  drawdownData,
  sectorAllocationData,
  sectorPerformanceData,
  attributionData,
  riskMetricsData,
} from '@/data/performanceData';

interface PerformanceChartsProps {
  activeTab: string;
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ activeTab }) => {
  const renderOverallPerformance = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Portfolio Value Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#FFD700"
              strokeWidth={3}
              dot={false}
              name="Smooth Path Portfolio"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              dot={false}
              name="S&P 500"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Drawdown Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={drawdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="#FFD700"
              fill="#FFD70040"
              name="Portfolio Drawdown"
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground) / 0.2)"
              name="S&P 500 Drawdown"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSectorPerformance = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorAllocationData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ sector, percentage }) => `${sector}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="percentage"
              >
                {sectorAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Sector Distribution</h3>
          <div className="space-y-3">
            {sectorAllocationData.map((sector, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{sector.sector}</span>
                  <span className="font-semibold text-foreground">{sector.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${sector.percentage}%`,
                      backgroundColor: sector.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Sector Performance by Year</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sectorPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Bar dataKey="Technology" fill="#3b82f6" />
            <Bar dataKey="Healthcare" fill="#10b981" />
            <Bar dataKey="Financials" fill="#f59e0b" />
            <Bar dataKey="Consumer" fill="#8b5cf6" />
            <Bar dataKey="Industrials" fill="#ef4444" />
            <Bar dataKey="Energy" fill="#06b6d4" />
            <Bar dataKey="Real Estate" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderRiskMetrics = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Risk-Adjusted Returns Comparison
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={riskMetricsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis
                dataKey="metric"
                type="category"
                stroke="hsl(var(--muted-foreground))"
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
              <Bar dataKey="portfolio" fill="#FFD700" name="Smooth Path" />
              <Bar dataKey="benchmark" fill="hsl(var(--muted-foreground))" name="S&P 500" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Risk Profile Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart
              data={riskMetricsData.map((item) => ({
                ...item,
                portfolio: Math.abs(item.portfolio),
                benchmark: Math.abs(item.benchmark),
              }))}
            >
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <PolarRadiusAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Radar
                name="Smooth Path"
                dataKey="portfolio"
                stroke="#FFD700"
                fill="#FFD700"
                fillOpacity={0.5}
              />
              <Radar
                name="S&P 500"
                dataKey="benchmark"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.3}
              />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Downside Protection Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={drawdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              name="Portfolio Protection"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="Benchmark Loss"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAttribution = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Active Return vs Benchmark</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={attributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Bar dataKey="activeReturn" fill="#FFD700" name="Active Return" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Alpha Generation Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={attributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Area type="monotone" dataKey="alpha" stroke="#10b981" fill="#10b98140" name="Alpha" />
            <Area
              type="monotone"
              dataKey="beta"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground) / 0.2)"
              name="Beta"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg p-8 border border-border">
      {activeTab === 'overall' && renderOverallPerformance()}
      {activeTab === 'sector' && renderSectorPerformance()}
      {activeTab === 'risk' && renderRiskMetrics()}
      {activeTab === 'attribution' && renderAttribution()}
    </div>
  );
};
