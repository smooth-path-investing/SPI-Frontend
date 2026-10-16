import { isRecord } from '@/lib/http';
import { RUNTIME_CONFIG } from '@/lib/runtimeConfig';

/**
 * Task 5 — per-factor time series for a stock, read directly from Supabase
 * (no backend round-trip). For each of the stock's (up to 5) factors we align
 * its series with the stock price so the page can draw one dual-axis chart per
 * factor: stock price on the left axis, the factor on the right, time on X.
 *
 * Factor → series table resolution mirrors the backend:
 *   - macro factors ("USA…")  → stock_macro,  variable = name without "USA"
 *   - fundamental ("marketcap") → stock_fundamental, variable = name (per ticker)
 *   - market (ETF ticker)      → stock_etf,    variable = name
 * Some factors have no seeded series yet; those come back `available: false`.
 */
export type FactorKind = 'macro' | 'fundamental' | 'market';

export interface FactorChartPoint {
  date: string;
  stock: number | null;
  factor: number | null;
}

export interface FactorChart {
  factorName: string;
  kind: FactorKind;
  available: boolean;
  points: FactorChartPoint[];
}

export interface StockFactorSeries {
  ticker: string;
  stockAvailable: boolean;
  charts: FactorChart[];
}

const isSupabaseConfigured = (): boolean =>
  Boolean(RUNTIME_CONFIG.supabaseUrl && RUNTIME_CONFIG.supabaseAnonKey);

const restHeaders = (): Record<string, string> => ({
  apikey: RUNTIME_CONFIG.supabaseAnonKey,
  Authorization: `Bearer ${RUNTIME_CONFIG.supabaseAnonKey}`,
});

const supabaseGet = async (query: string): Promise<unknown[]> => {
  const response = await fetch(`${RUNTIME_CONFIG.supabaseUrl}/rest/v1/${query}`, {
    headers: restHeaders(),
  });
  if (!response.ok) return [];
  const rows: unknown = await response.json();
  return Array.isArray(rows) ? rows : [];
};

const num = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

const str = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

const classify = (factorName: string): FactorKind => {
  if (factorName.startsWith('USA')) return 'macro';
  if (/^[a-z]/.test(factorName)) return 'fundamental';
  return 'market';
};

/** Fetch a factor's (date → value) series from the table its kind lives in. */
const fetchFactorSeries = async (
  ticker: string,
  factorName: string,
  kind: FactorKind,
): Promise<Map<string, number>> => {
  let query: string;
  if (kind === 'macro') {
    const variable = factorName.slice(3); // strip "USA"
    query = `stock_macro?select=date,value&variable=eq.${encodeURIComponent(variable)}&order=date.asc`;
  } else if (kind === 'fundamental') {
    query =
      `stock_fundamental?select=date,value&ticker=eq.${encodeURIComponent(ticker)}` +
      `&variable=eq.${encodeURIComponent(factorName)}&order=date.asc`;
  } else {
    query = `stock_etf?select=date,value&variable=eq.${encodeURIComponent(factorName)}&order=date.asc`;
  }

  const rows = await supabaseGet(query);
  const byDate = new Map<string, number>();
  rows.forEach((row) => {
    if (!isRecord(row)) return;
    const date = str(row.date);
    const value = num(row.value);
    if (date && value !== null) byDate.set(date, value);
  });
  return byDate;
};

export const fetchStockFactorSeries = async (ticker: string): Promise<StockFactorSeries> => {
  const normalized = ticker.trim().toUpperCase();
  if (!normalized || !isSupabaseConfigured()) {
    return { ticker: normalized, stockAvailable: false, charts: [] };
  }

  // 1) the stock's factors (latest quarter only)
  const coefRows = await supabaseGet(
    `stock_factor_coefvec?select=factor_name,quarter_end&stock_symbol=eq.${encodeURIComponent(
      normalized,
    )}`,
  );
  const latestQuarter = coefRows.reduce((latest, row) => {
    const q = isRecord(row) ? str(row.quarter_end) : '';
    return q > latest ? q : latest;
  }, '');
  const factorNames = Array.from(
    new Set(
      coefRows
        .filter((row) => isRecord(row) && str(row.quarter_end) === latestQuarter)
        .map((row) => (isRecord(row) ? str(row.factor_name) : ''))
        .filter(Boolean),
    ),
  );

  // 2) the stock price series
  const priceRows = await supabaseGet(
    `stock_assets?select=date,stock_price&ticker=eq.${encodeURIComponent(
      normalized,
    )}&order=date.asc`,
  );
  const pricePoints = priceRows
    .filter(isRecord)
    .map((row) => ({ date: str(row.date), stock: num(row.stock_price) }))
    .filter((point) => point.date);
  const stockAvailable = pricePoints.length > 0;

  // 3) one aligned dual-axis series per factor
  const charts: FactorChart[] = await Promise.all(
    factorNames.map(async (factorName) => {
      const kind = classify(factorName);
      const factorByDate = await fetchFactorSeries(normalized, factorName, kind);
      const points: FactorChartPoint[] = pricePoints.map((point) => ({
        date: point.date,
        stock: point.stock,
        factor: factorByDate.get(point.date) ?? null,
      }));
      const available = points.some((point) => point.factor !== null);
      return { factorName, kind, available, points };
    }),
  );

  return { ticker: normalized, stockAvailable, charts };
};
