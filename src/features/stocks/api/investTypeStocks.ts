import { isRecord } from '@/lib/http';
import { RUNTIME_CONFIG } from '@/lib/runtimeConfig';

/**
 * DB-driven stock lists. The frontend reads Supabase directly (anon key, which
 * is public and read-only by design) so these lists stay in sync with the
 * `invest_type` column of `stock_factor_coefvec` without a backend round-trip.
 */
export type InvestType = 'long' | 'watchlist' | 'short';

export interface InvestTypeStock {
  ticker: string;
  name: string;
  sector: string;
}

const CORPORATE_SUFFIXES: Record<string, string> = {
  INC: 'Inc.',
  CORP: 'Corp.',
  CORPORATION: 'Corporation',
  COMPANY: 'Company',
  CO: 'Co.',
  PLC: 'plc',
  LTD: 'Ltd.',
  LLC: 'LLC',
  LP: 'LP',
  SA: 'SA',
  NV: 'NV',
  AG: 'AG',
  HOLDINGS: 'Holdings',
  GROUP: 'Group',
};

/**
 * Turn an all-caps DB name ("APPLE INC", "RTX CORP") into a display name
 * ("Apple Inc.", "RTX Corp."). Short all-caps tokens are kept as acronyms.
 */
const formatCompanyName = (raw: string): string => {
  const cleaned = raw.trim();
  if (!cleaned) return '';
  return cleaned
    .split(/\s+/)
    .map((word) => {
      const upper = word.toUpperCase();
      if (CORPORATE_SUFFIXES[upper]) return CORPORATE_SUFFIXES[upper];
      if (word.length <= 4 && /^[A-Z]+$/.test(word)) return word; // acronym, e.g. RTX, IBM
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

const isSupabaseConfigured = (): boolean =>
  Boolean(RUNTIME_CONFIG.supabaseUrl && RUNTIME_CONFIG.supabaseAnonKey);

const restHeaders = (): Record<string, string> => ({
  apikey: RUNTIME_CONFIG.supabaseAnonKey,
  Authorization: `Bearer ${RUNTIME_CONFIG.supabaseAnonKey}`,
});

const restUrl = (query: string): string => `${RUNTIME_CONFIG.supabaseUrl}/rest/v1/${query}`;

const readTicker = (row: unknown, key: string): string =>
  isRecord(row) && typeof row[key] === 'string' ? (row[key] as string).trim().toUpperCase() : '';

/** Fetch the distinct tickers for an invest_type, enriched with name + sector. */
export const fetchStocksByInvestType = async (
  investType: InvestType,
): Promise<InvestTypeStock[]> => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured (set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).',
    );
  }

  const coefResponse = await fetch(
    restUrl(
      `stock_factor_coefvec?select=stock_symbol&invest_type=eq.${encodeURIComponent(investType)}`,
    ),
    { headers: restHeaders() },
  );
  if (!coefResponse.ok) {
    throw new Error(`Failed to load ${investType} stocks (${coefResponse.status}).`);
  }
  const coefRows: unknown = await coefResponse.json();
  const tickers = Array.from(
    new Set(
      (Array.isArray(coefRows) ? coefRows : [])
        .map((row) => readTicker(row, 'stock_symbol'))
        .filter(Boolean),
    ),
  );
  if (tickers.length === 0) return [];

  const metaByTicker = new Map<string, { name: string; sector: string }>();
  const metaResponse = await fetch(
    restUrl(
      `security_master?select=ticker,long_name,sector&ticker=in.(${encodeURIComponent(
        tickers.join(','),
      )})`,
    ),
    { headers: restHeaders() },
  );
  if (metaResponse.ok) {
    const metaRows: unknown = await metaResponse.json();
    (Array.isArray(metaRows) ? metaRows : []).forEach((row) => {
      const ticker = readTicker(row, 'ticker');
      if (!ticker || !isRecord(row)) return;
      metaByTicker.set(ticker, {
        name: formatCompanyName(typeof row.long_name === 'string' ? row.long_name : ''),
        sector: typeof row.sector === 'string' ? row.sector.trim() : '',
      });
    });
  }

  return tickers
    .map((ticker) => ({
      ticker,
      name: metaByTicker.get(ticker)?.name || ticker,
      sector: metaByTicker.get(ticker)?.sector || '',
    }))
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
};

/** Resolve a single ticker's display name + sector (for the detail header). */
export const fetchStockMeta = async (ticker: string): Promise<InvestTypeStock | null> => {
  const normalized = ticker.trim().toUpperCase();
  if (!normalized || !isSupabaseConfigured()) return null;

  const response = await fetch(
    restUrl(
      `security_master?select=ticker,long_name,sector&ticker=eq.${encodeURIComponent(
        normalized,
      )}&limit=1`,
    ),
    { headers: restHeaders() },
  );
  if (!response.ok) return null;

  const rows: unknown = await response.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!isRecord(row)) return null;

  return {
    ticker: normalized,
    name: formatCompanyName(typeof row.long_name === 'string' ? row.long_name : '') || normalized,
    sector: typeof row.sector === 'string' ? row.sector.trim() : '',
  };
};
