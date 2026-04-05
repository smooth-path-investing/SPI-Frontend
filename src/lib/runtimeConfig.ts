export type ReleaseMode = 'dev' | 'prod';

const normalizeReleaseMode = (mode: string): ReleaseMode =>
  mode === 'prod' || mode === 'production' ? 'prod' : 'dev';

const normalizeBaseUrl = (value?: string) => value?.trim().replace(/\/+$/, '') ?? '';

export const RELEASE_MODE = normalizeReleaseMode(import.meta.env.MODE);
export const IS_DEV_RELEASE = RELEASE_MODE === 'dev';
export const IS_PROD_RELEASE = RELEASE_MODE === 'prod';

export const RUNTIME_CONFIG = {
  localBackendServer: normalizeBaseUrl(import.meta.env.VITE_LOCAL_BACKEND_SERVER),
  stockAssetsApiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_STOCK_ASSETS_API_BASE_URL),
  stockFactorCoefvecApiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_STOCK_FACTOR_COEFVEC_API_BASE_URL,
  ),
  stockFundamentalApiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_STOCK_FUNDAMENTAL_API_BASE_URL,
  ),
} as const;

export const buildApiUrl = (requestPath: string, baseUrl = '') =>
  baseUrl ? `${baseUrl}${requestPath}` : requestPath;
