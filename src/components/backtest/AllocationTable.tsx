import React from 'react';
import { Position } from '@/types/backtest';
import './backtest.css';

interface AllocationTableProps {
  positions: Position[];
}

export const AllocationTable: React.FC<AllocationTableProps> = ({ positions }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatShares = (shares: number) => {
    return shares.toFixed(4);
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(2) + '%';
  };

  return (
    <div className="allocation-table-container">
      <h3 className="table-title">Current Allocation</h3>
      <div className="table-wrapper">
        <table className="allocation-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Weight</th>
              <th>Invested $</th>
              <th>Shares</th>
              <th>Buy Price</th>
              <th>Current Price</th>
              <th>Current Value</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, idx) => {
              const profitLoss = position.currentValue - position.investedAmount;
              const profitLossPercent = (profitLoss / position.investedAmount) * 100;
              const isProfit = profitLoss >= 0;

              return (
                <tr key={`${position.ticker}-${idx}`}>
                  <td className="ticker-cell">{position.ticker}</td>
                  <td>{formatPercent(position.weight)}</td>
                  <td>{formatCurrency(position.investedAmount)}</td>
                  <td>{formatShares(position.shares)}</td>
                  <td>{formatCurrency(position.buyPrice)}</td>
                  <td>{formatCurrency(position.currentPrice)}</td>
                  <td>{formatCurrency(position.currentValue)}</td>
                  <td className={isProfit ? 'profit' : 'loss'}>
                    {formatCurrency(profitLoss)} ({profitLossPercent.toFixed(2)}%)
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}><strong>Total</strong></td>
              <td><strong>{formatCurrency(positions.reduce((sum, p) => sum + p.investedAmount, 0))}</strong></td>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>{formatCurrency(positions.reduce((sum, p) => sum + p.currentValue, 0))}</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
