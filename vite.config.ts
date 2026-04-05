import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

const normalizeReleaseMode = (mode: string) =>
  mode === 'prod' || mode === 'production' ? 'prod' : 'dev';

const DEVELOPMENT_PROXY = {
  '/stock-assets': {
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
  },
  '/stock-factor-coefvec': {
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
  },
  '/stock-fundamental': {
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
  },
} as const;

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const releaseMode = normalizeReleaseMode(mode);
  const isLocalDevelopment = command === 'serve' && releaseMode === 'dev';
  const developmentProxyTarget = env.DEV_PROXY_TARGET?.trim() || 'http://127.0.0.1:3000';

  return {
    server: {
      host: '::',
      port: 8080,
      // Only local development uses the Vite proxy. Live deployments should point at real API origins.
      ...(isLocalDevelopment
        ? {
            proxy: Object.fromEntries(
              Object.entries(DEVELOPMENT_PROXY).map(([routePath, proxyConfig]) => [
                routePath,
                {
                  ...proxyConfig,
                  target: developmentProxyTarget,
                },
              ]),
            ),
          }
        : {}),
    },

    // Use absolute asset URLs so deep-route reloads (e.g. /portfolio/:id) can load bundles.
    base: '/',

    plugins: [react(), isLocalDevelopment && componentTagger()].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
