import type { IndicatorWeightPoint } from '@/features/stocks';

interface StockFactorBarValue {
  factor_name: string;
  normalized_value: number;
}

interface StockFactorBarGraphResponse {
  ticker: string;
  count: number;
  normalization_basis: string;
  bars: StockFactorBarValue[];
}

const STOCK_FACTOR_COEFVEC_API_BASE_URL =
  import.meta.env.VITE_STOCK_FACTOR_COEFVEC_API_BASE_URL?.trim() ?? '';
const MAX_INDICATOR_WEIGHTS = 5;

const buildIndicatorWeightKey = (ticker: string, factorName: string) =>
  `${ticker.toLowerCase()}-${factorName.toLowerCase()}`;

export async function fetchStockIndicatorWeights(
  ticker: string,
): Promise<IndicatorWeightPoint[] | null> {
  const normalizedTicker = ticker.trim().toUpperCase();

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-factor-coefvec/${normalizedTicker}/bar-graph`;
  const requestUrl = STOCK_FACTOR_COEFVEC_API_BASE_URL
    ? `${STOCK_FACTOR_COEFVEC_API_BASE_URL}${requestPath}`
    : requestPath;
  const response = await fetch(requestUrl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load indicator weights for ${normalizedTicker}.`);
  }

  const data = (await response.json()) as StockFactorBarGraphResponse;
  const validBars = Array.isArray(data.bars)
    ? data.bars.filter(
        (bar) =>
          bar.factor_name &&
          typeof bar.normalized_value === 'number' &&
          Number.isFinite(bar.normalized_value),
      )
    : [];

  if (validBars.length === 0) {
    return [];
  }

  return validBars
    .sort((left, right) => {
      const absoluteDifference =
        Math.abs(right.normalized_value) - Math.abs(left.normalized_value);

      if (absoluteDifference !== 0) {
        return absoluteDifference;
      }

      const normalizedDifference = right.normalized_value - left.normalized_value;

      if (normalizedDifference !== 0) {
        return normalizedDifference;
      }

      return left.factor_name.localeCompare(right.factor_name);
    })
    .slice(0, MAX_INDICATOR_WEIGHTS)
    .map((bar) => ({
      key: buildIndicatorWeightKey(normalizedTicker, bar.factor_name),
      indicator: bar.factor_name,
      weight: Number((bar.normalized_value * 100).toFixed(2)),
    }));
}
