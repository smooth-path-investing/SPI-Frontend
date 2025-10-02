import Papa from 'papaparse';
import { BacktestRow } from '@/types/backtest';

export interface ParseResult {
  success: boolean;
  data?: BacktestRow[];
  errors?: string[];
}

export function parseBacktestCSV(csvText: string): ParseResult {
  const errors: string[] = [];
  const rows: BacktestRow[] = [];

  try {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (result.errors.length > 0) {
      return {
        success: false,
        errors: result.errors.map(e => e.message),
      };
    }

    const data = result.data as any[];

    data.forEach((row, index) => {
      const rowNum = index + 2; // +2 for header and 0-index

      // Validate required columns
      if (!row['Start Date'] || !row['Assets'] || !row['Weights']) {
        errors.push(`Row ${rowNum}: Missing required columns`);
        return;
      }

      // Parse date
      const dateStr = row['Start Date'].trim();
      const parsedDate = new Date(dateStr);
      if (isNaN(parsedDate.getTime())) {
        errors.push(`Row ${rowNum}: Invalid date format "${dateStr}"`);
        return;
      }

      // Parse assets
      const assetsStr = row['Assets'].trim();
      const assets = assetsStr
        .split(',')
        .map(a => a.trim())
        .filter(a => a.length > 0);

      if (assets.length === 0) {
        errors.push(`Row ${rowNum}: No assets found`);
        return;
      }

      // Parse weights
      const weightsStr = row['Weights'].trim();
      const weights = weightsStr
        .split(',')
        .map(w => {
          const cleaned = w.trim().replace('%', '');
          return parseFloat(cleaned);
        })
        .filter(w => !isNaN(w));

      if (weights.length === 0) {
        errors.push(`Row ${rowNum}: No valid weights found`);
        return;
      }

      // Validate counts match
      if (assets.length !== weights.length) {
        errors.push(
          `Row ${rowNum}: Asset count (${assets.length}) doesn't match weight count (${weights.length})`
        );
        return;
      }

      // Validate weights sum to ~100%
      const sum = weights.reduce((a, b) => a + b, 0);
      if (Math.abs(sum - 100) > 0.5) {
        errors.push(
          `Row ${rowNum}: Weights sum to ${sum.toFixed(2)}%, should be ~100%`
        );
        return;
      }

      // Normalize weights to decimal
      const normalizedWeights = weights.map(w => w / 100);

      rows.push({
        startDate: parsedDate,
        assets,
        weights: normalizedWeights,
      });
    });

    if (errors.length > 0) {
      return { success: false, errors };
    }

    if (rows.length === 0) {
      return { success: false, errors: ['No valid rows found in CSV'] };
    }

    // Sort by date
    rows.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return { success: true, data: rows };
  } catch (error) {
    return {
      success: false,
      errors: [`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
}

export function parsePriceCSV(csvText: string): ParseResult {
  const errors: string[] = [];
  const priceMap = new Map<string, Map<string, number>>();

  try {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
    });

    if (result.errors.length > 0) {
      return {
        success: false,
        errors: result.errors.map(e => e.message),
      };
    }

    const data = result.data as any[];

    data.forEach((row, index) => {
      const rowNum = index + 2;

      if (!row.date || !row.ticker || !row.close) {
        errors.push(`Row ${rowNum}: Missing required columns (date, ticker, close)`);
        return;
      }

      const ticker = row.ticker.trim().toUpperCase();
      const dateStr = row.date.trim();
      const close = parseFloat(row.close);

      if (isNaN(close)) {
        errors.push(`Row ${rowNum}: Invalid price "${row.close}"`);
        return;
      }

      if (!priceMap.has(ticker)) {
        priceMap.set(ticker, new Map());
      }

      priceMap.get(ticker)!.set(dateStr, close);
    });

    if (errors.length > 0) {
      return { success: false, errors };
    }

    return { success: true, data: priceMap as any };
  } catch (error) {
    return {
      success: false,
      errors: [`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
}
