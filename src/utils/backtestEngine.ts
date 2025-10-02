import { BacktestRow, BacktestConfig, BacktestResult, PeriodSnapshot, Position } from '@/types/backtest';

export function runBacktest(
  rows: BacktestRow[],
  config: BacktestConfig
): BacktestResult {
  const snapshots: PeriodSnapshot[] = [];
  let currentCapital = config.initialCapital;
  let highWaterMark = config.initialCapital;
  let maxDrawdown = 0;

  // Filter rows based on start date override
  const filteredRows = config.startDateOverride
    ? rows.filter(r => r.startDate >= config.startDateOverride!)
    : rows;

  if (filteredRows.length === 0) {
    return {
      snapshots: [],
      finalValue: config.initialCapital,
      totalReturn: 0,
      cagr: 0,
      maxDrawdown: 0,
      periods: 0,
    };
  }

  for (let i = 0; i < filteredRows.length; i++) {
    const row = filteredRows[i];
    const positions: Position[] = [];

    // Calculate positions for this period
    for (let j = 0; j < row.assets.length; j++) {
      const ticker = row.assets[j];
      const weight = row.weights[j];
      const investedAmount = currentCapital * weight;

      const buyPrice = getPrice(config.priceData, ticker, row.startDate);
      
      if (!buyPrice || buyPrice === 0) {
        console.warn(`No price found for ${ticker} on ${row.startDate.toISOString()}`);
        continue;
      }

      let shares: number;
      if (config.fractionalShares) {
        shares = investedAmount / buyPrice;
      } else {
        shares = Math.floor(investedAmount / buyPrice);
      }

      // Calculate current value (at end of period or current)
      const nextDate = i < filteredRows.length - 1 ? filteredRows[i + 1].startDate : new Date();
      const currentPrice = getPrice(config.priceData, ticker, nextDate) || buyPrice;
      const currentValue = shares * currentPrice;

      positions.push({
        ticker,
        weight,
        investedAmount,
        shares,
        buyPrice,
        currentPrice,
        currentValue,
      });
    }

    const totalValue = positions.reduce((sum, p) => sum + p.currentValue, 0);
    
    // Update capital for next period
    currentCapital = totalValue;

    // Calculate returns
    const periodReturn = i === 0 
      ? ((totalValue - config.initialCapital) / config.initialCapital) * 100
      : ((totalValue - snapshots[i - 1].totalValue) / snapshots[i - 1].totalValue) * 100;
    
    const cumulativeReturn = ((totalValue - config.initialCapital) / config.initialCapital) * 100;

    // Update max drawdown
    if (totalValue > highWaterMark) {
      highWaterMark = totalValue;
    }
    const drawdown = ((highWaterMark - totalValue) / highWaterMark) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }

    snapshots.push({
      date: row.startDate,
      positions,
      totalValue,
      periodReturn,
      cumulativeReturn,
    });
  }

  const finalValue = snapshots[snapshots.length - 1]?.totalValue || config.initialCapital;
  const totalReturn = ((finalValue - config.initialCapital) / config.initialCapital) * 100;
  
  // Calculate CAGR
  const years = calculateYears(filteredRows[0].startDate, filteredRows[filteredRows.length - 1].startDate);
  const cagr = years > 0 
    ? (Math.pow(finalValue / config.initialCapital, 1 / years) - 1) * 100 
    : 0;

  return {
    snapshots,
    finalValue,
    totalReturn,
    cagr,
    maxDrawdown,
    periods: snapshots.length,
  };
}

function getPrice(
  priceData: Map<string, Map<string, number>>,
  ticker: string,
  date: Date
): number | null {
  const tickerPrices = priceData.get(ticker.toUpperCase());
  if (!tickerPrices) return null;

  const dateStr = formatDate(date);
  
  // Try exact match
  if (tickerPrices.has(dateStr)) {
    return tickerPrices.get(dateStr)!;
  }

  // Try to find closest previous date (within 7 days)
  for (let i = 0; i < 7; i++) {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - i);
    const prevDateStr = formatDate(prevDate);
    
    if (tickerPrices.has(prevDateStr)) {
      return tickerPrices.get(prevDateStr)!;
    }
  }

  return null;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function calculateYears(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays / 365.25;
}
