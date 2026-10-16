const isHttpUrl = (value: string) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const normalizeBaseUrl = (value: string | undefined, envKey: string) => {
  const normalizedValue = value?.trim().replace(/\/+$/, '') ?? '';

  if (!normalizedValue) {
    return '';
  }

  if (!isHttpUrl(normalizedValue)) {
    console.warn(`${envKey} must be an absolute http(s) URL. Falling back to relative requests.`);
    return '';
  }

  return normalizedValue;
};

export const RUNTIME_CONFIG = {
  stockAssetsApiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_STOCK_ASSETS_API_BASE_URL,
    'VITE_STOCK_ASSETS_API_BASE_URL',
  ),
  stockFactorCoefvecApiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_STOCK_FACTOR_COEFVEC_API_BASE_URL,
    'VITE_STOCK_FACTOR_COEFVEC_API_BASE_URL',
  ),
  stockFundamentalApiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_STOCK_FUNDAMENTAL_API_BASE_URL,
    'VITE_STOCK_FUNDAMENTAL_API_BASE_URL',
  ),
  // Supabase is read directly from the browser for DB-driven stock lists.
  // The anon key is public and read-only by design.
  supabaseUrl: normalizeBaseUrl(import.meta.env.VITE_SUPABASE_URL, 'VITE_SUPABASE_URL'),
  supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim(),
} as const;

export const buildApiUrl = (requestPath: string, baseUrl = '') => {
  const normalizedPath = requestPath.startsWith('/') ? requestPath : `/${requestPath}`;

  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
};
