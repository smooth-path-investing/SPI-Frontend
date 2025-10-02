import React, { useState } from 'react';
import { CsvUploader } from './CsvUploader';
import { BacktestCharts } from './BacktestCharts';
import { AllocationTable } from './AllocationTable';
import { HoldingsTimeline } from './HoldingsTimeline';
import { SummaryStats } from './SummaryStats';
import { ExportButton } from './ExportButton';
import { parseBacktestCSV, parsePriceCSV } from '@/utils/csvParser';
import { runBacktest } from '@/utils/backtestEngine';
import { BacktestRow, BacktestResult } from '@/types/backtest';
import './backtest.css';

export const PortfolioBacktest: React.FC = () => {
  const [strategyRows, setStrategyRows] = useState<BacktestRow[]>([]);
  const [priceData, setPriceData] = useState<Map<string, Map<string, number>>>(new Map());
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<BacktestResult | null>(null);
  
  const [initialCapital, setInitialCapital] = useState(10000);
  const [fractionalShares, setFractionalShares] = useState(true);
  const [startDateOverride, setStartDateOverride] = useState('');

  const handleStrategyLoad = (csvText: string) => {
    const parseResult = parseBacktestCSV(csvText);
    
    if (!parseResult.success) {
      setErrors(parseResult.errors || ['Unknown error']);
      setStrategyRows([]);
      setResult(null);
      return;
    }

    setStrategyRows(parseResult.data || []);
    setErrors([]);
  };

  const handlePricesLoad = (csvText: string) => {
    const parseResult = parsePriceCSV(csvText);
    
    if (!parseResult.success) {
      setErrors(parseResult.errors || ['Unknown error']);
      return;
    }

    setPriceData(parseResult.data as any);
    setErrors([]);
  };

  const handleRunBacktest = () => {
    if (strategyRows.length === 0) {
      setErrors(['Please load strategy CSV first']);
      return;
    }

    if (priceData.size === 0) {
      setErrors(['Please load historical price data first']);
      return;
    }

    const config = {
      initialCapital,
      fractionalShares,
      startDateOverride: startDateOverride ? new Date(startDateOverride) : undefined,
      priceData,
    };

    try {
      const backtestResult = runBacktest(strategyRows, config);
      setResult(backtestResult);
      setErrors([]);
    } catch (error) {
      setErrors([`Backtest error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      setResult(null);
    }
  };

  return (
    <div className="backtest-container">
      <div className="backtest-header">
        <h1 className="backtest-title">Portfolio Backtest Simulator</h1>
        <p className="backtest-subtitle">
          Upload your strategy CSV and historical prices to simulate portfolio performance
        </p>
      </div>

      {errors.length > 0 && (
        <div className="error-messages">
          <div className="error-title">Errors:</div>
          <ul className="error-list">
            {errors.map((error, idx) => (
              <li key={idx} className="error-item">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="config-section">
        <CsvUploader
          type="strategy"
          label="1. Upload Strategy CSV"
          onCsvLoad={handleStrategyLoad}
          onPricesLoad={handlePricesLoad}
          placeholder="Start Date,Assets,Weights&#10;12/31/2019,&quot;AMGN, KR, BAC&quot;,&quot;33.33%, 33.33%, 33.34%&quot;"
        />

        <CsvUploader
          type="prices"
          label="2. Upload Historical Prices CSV"
          onCsvLoad={handleStrategyLoad}
          onPricesLoad={handlePricesLoad}
          placeholder="date,ticker,close&#10;2019-12-31,AMGN,242.50&#10;2019-12-31,KR,29.80"
        />

        <div className="config-grid">
          <div className="config-field">
            <label className="config-label">Initial Capital ($)</label>
            <input
              type="number"
              className="config-input"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              min="100"
              step="100"
            />
          </div>

          <div className="config-field">
            <label className="config-label">Start Date Override (Optional)</label>
            <input
              type="date"
              className="config-input"
              value={startDateOverride}
              onChange={(e) => setStartDateOverride(e.target.value)}
            />
          </div>

          <div className="config-field">
            <label className="config-checkbox-wrapper">
              <input
                type="checkbox"
                className="config-checkbox"
                checked={fractionalShares}
                onChange={(e) => setFractionalShares(e.target.checked)}
              />
              <span className="config-label">Allow Fractional Shares</span>
            </label>
          </div>
        </div>

        <button
          className="run-backtest-btn"
          onClick={handleRunBacktest}
          disabled={strategyRows.length === 0 || priceData.size === 0}
        >
          Run Backtest
        </button>
      </div>

      {result && (
        <>
          <SummaryStats result={result} initialCapital={initialCapital} />
          
          <BacktestCharts result={result} />
          
          <AllocationTable positions={result.snapshots[result.snapshots.length - 1].positions} />
          
          <HoldingsTimeline snapshots={result.snapshots} />
          
          <ExportButton result={result} initialCapital={initialCapital} />
        </>
      )}
    </div>
  );
};
