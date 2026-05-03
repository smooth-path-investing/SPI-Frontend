/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STOCK_ASSETS_API_BASE_URL?: string;
  readonly VITE_STOCK_FACTOR_COEFVEC_API_BASE_URL?: string;
  readonly VITE_STOCK_FUNDAMENTAL_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
