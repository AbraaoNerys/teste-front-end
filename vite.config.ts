import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const econverseProxy = {
  '/api-produtos': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api-produtos/, ''),
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy: econverseProxy },
  preview: { proxy: econverseProxy },
});