import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { BacktestResult } from '@/types/backtest';
import './backtest.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface BacktestChartsProps {
  result: BacktestResult;
}

export const BacktestCharts: React.FC<BacktestChartsProps> = ({ result }) => {
  // NAV Chart Data
  const navData = {
    labels: result.snapshots.map(s => s.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Portfolio Value',
        data: result.snapshots.map(s => s.totalValue),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const navOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Value Over Time (NAV)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Value: $${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Current Allocation Pie Chart
  const latestSnapshot = result.snapshots[result.snapshots.length - 1];
  const allocationData = {
    labels: latestSnapshot.positions.map(p => p.ticker),
    datasets: [
      {
        data: latestSnapshot.positions.map(p => (p.weight * 100)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
          'rgba(255, 99, 255, 0.8)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Current Allocation',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.toFixed(2)}%`;
          }
        }
      }
    },
  };

  return (
    <div className="backtest-charts">
      <div className="chart-container nav-chart">
        <Line data={navData} options={navOptions} />
      </div>
      
      <div className="chart-container pie-chart">
        <Pie data={allocationData} options={pieOptions} />
      </div>
    </div>
  );
};
