import React from 'react';
import { BacktestResult } from '@/utils/backtestEngine';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

interface SimulatorResultsProps {
  results: BacktestResult;
  initialCapital: number;
}

export const SimulatorResults: React.FC<SimulatorResultsProps> = ({ results, initialCapital }) => {
  const { portfolioValue, metrics, holdings } = results;
  
  // Prepare chart data
  const chartData = portfolioValue.map(pv => ({
    date: pv.date.toLocaleDateString(),
    value: pv.value
  }));
  
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Return</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className={`text-2xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {metrics.totalReturn >= 0 ? '+' : ''}{metrics.totalReturn.toFixed(2)}%
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">CAGR</span>
            <BarChart3 className="w-4 h-4 text-foreground" />
          </div>
          <div className={`text-2xl font-bold ${metrics.cagr >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {metrics.cagr >= 0 ? '+' : ''}{metrics.cagr.toFixed(2)}%
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Max Drawdown</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            -{metrics.maxDrawdown.toFixed(2)}%
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
            <Activity className="w-4 h-4 text-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {metrics.sharpeRatio.toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* Portfolio Value Chart */}
      <div className="bg-muted rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Portfolio Value Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
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
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Portfolio Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Holdings Timeline */}
      <div className="bg-muted rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Rebalancing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-foreground">Date</th>
                <th className="text-left py-2 px-3 font-semibold text-foreground">Assets</th>
                <th className="text-right py-2 px-3 font-semibold text-foreground">Portfolio Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, idx) => (
                <tr key={idx} className="border-b border-border/50">
                  <td className="py-2 px-3 text-muted-foreground">
                    {holding.date.toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 text-foreground">
                    {holding.positions.map(p => p.ticker).join(', ')}
                  </td>
                  <td className="py-2 px-3 text-right text-foreground font-medium">
                    ${holding.totalValue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="bg-muted rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Summary Statistics</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Initial Capital:</span>
            <span className="font-medium text-foreground">${initialCapital.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Final Value:</span>
            <span className="font-medium text-foreground">
              ${portfolioValue[portfolioValue.length - 1].value.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Volatility (Annual):</span>
            <span className="font-medium text-foreground">{metrics.volatility.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Number of Rebalances:</span>
            <span className="font-medium text-foreground">{holdings.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
