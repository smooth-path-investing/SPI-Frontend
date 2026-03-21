import type { StockPricePoint } from '@/features/stocks/types';

const STOCK_ASSETS_API_BASE_URL =
  import.meta.env.VITE_STOCK_ASSETS_API_BASE_URL?.trim() ?? '';

export interface StockAssetChartSeries {
  ticker: string;
  benchmark_ticker: 'IVV';
  interval: 'quarterly';
  as_of: string;
  ticker_points: StockPricePoint[];
  ivv_points: StockPricePoint[];
}

export async function fetchStockAssetChartSeries(
  ticker: string,
): Promise<StockAssetChartSeries | null> {
  const normalizedTicker = ticker.trim().toUpperCase();

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-assets/${normalizedTicker}`;
  const requestUrl = STOCK_ASSETS_API_BASE_URL
    ? `${STOCK_ASSETS_API_BASE_URL}${requestPath}`
    : requestPath;

  const response = await fetch(requestUrl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load stock asset data for ${normalizedTicker}.`);
  }

  return (await response.json()) as StockAssetChartSeries;
}
