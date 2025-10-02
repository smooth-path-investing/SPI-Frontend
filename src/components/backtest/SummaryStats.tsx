import React from 'react';
import { BacktestResult } from '@/types/backtest';
import './backtest.css';

interface SummaryStatsProps {
  result: BacktestResult;
  initialCapital: number;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ result, initialCapital }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  return (
    <div className="summary-stats">
      <div className="stat-card">
        <div className="stat-label">Initial Capital</div>
        <div className="stat-value">{formatCurrency(initialCapital)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Final Value</div>
        <div className="stat-value">{formatCurrency(result.finalValue)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Total Return</div>
        <div className={`stat-value ${result.totalReturn >= 0 ? 'profit' : 'loss'}`}>
          {formatPercent(result.totalReturn)}
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">CAGR</div>
        <div className={`stat-value ${result.cagr >= 0 ? 'profit' : 'loss'}`}>
          {formatPercent(result.cagr)}
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Max Drawdown</div>
        <div className="stat-value loss">-{formatPercent(result.maxDrawdown)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Periods</div>
        <div className="stat-value">{result.periods}</div>
      </div>
    </div>
  );
};
