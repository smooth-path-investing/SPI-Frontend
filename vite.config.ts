import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },

  // Use absolute asset URLs so deep-route reloads (e.g. /portfolio/:id) can load bundles.
  base: '/',

  plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
