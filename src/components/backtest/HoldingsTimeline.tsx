import React from 'react';
import { PeriodSnapshot } from '@/types/backtest';
import './backtest.css';

interface HoldingsTimelineProps {
  snapshots: PeriodSnapshot[];
}

export const HoldingsTimeline: React.FC<HoldingsTimelineProps> = ({ snapshots }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="holdings-timeline-container">
      <h3 className="table-title">Holdings Timeline</h3>
      <div className="table-wrapper">
        <table className="holdings-timeline">
          <thead>
            <tr>
              <th>Date</th>
              <th>Positions</th>
              <th>Portfolio Value</th>
              <th>Period Return</th>
              <th>Cumulative Return</th>
            </tr>
          </thead>
          <tbody>
            {snapshots.map((snapshot, idx) => {
              const isPositiveReturn = snapshot.periodReturn >= 0;
              const isPositiveCumulative = snapshot.cumulativeReturn >= 0;
              
              return (
                <tr key={idx}>
                  <td className="date-cell">{snapshot.date.toLocaleDateString()}</td>
                  <td className="positions-cell">
                    {snapshot.positions.map(p => p.ticker).join(', ')}
                  </td>
                  <td>{formatCurrency(snapshot.totalValue)}</td>
                  <td className={isPositiveReturn ? 'profit' : 'loss'}>
                    {snapshot.periodReturn.toFixed(2)}%
                  </td>
                  <td className={isPositiveCumulative ? 'profit' : 'loss'}>
                    {snapshot.cumulativeReturn.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
