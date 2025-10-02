import React from 'react';
import { BacktestResult } from '@/types/backtest';
import './backtest.css';

interface ExportButtonProps {
  result: BacktestResult;
  initialCapital: number;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ result, initialCapital }) => {
  const exportCSV = () => {
    let csv = 'Date,Portfolio Value,Period Return %,Cumulative Return %,Positions\n';
    
    result.snapshots.forEach(snapshot => {
      const positions = snapshot.positions.map(p => p.ticker).join(';');
      csv += `${snapshot.date.toLocaleDateString()},${snapshot.totalValue.toFixed(2)},${snapshot.periodReturn.toFixed(2)},${snapshot.cumulativeReturn.toFixed(2)},"${positions}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backtest-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const data = {
      initialCapital,
      finalValue: result.finalValue,
      totalReturn: result.totalReturn,
      cagr: result.cagr,
      maxDrawdown: result.maxDrawdown,
      periods: result.periods,
      snapshots: result.snapshots.map(s => ({
        date: s.date.toISOString(),
        totalValue: s.totalValue,
        periodReturn: s.periodReturn,
        cumulativeReturn: s.cumulativeReturn,
        positions: s.positions.map(p => ({
          ticker: p.ticker,
          weight: p.weight,
          shares: p.shares,
          buyPrice: p.buyPrice,
          currentPrice: p.currentPrice,
          currentValue: p.currentValue,
        })),
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backtest-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="export-buttons">
      <button className="export-btn" onClick={exportCSV}>
        Export CSV
      </button>
      <button className="export-btn" onClick={exportJSON}>
        Export JSON
      </button>
    </div>
  );
};
