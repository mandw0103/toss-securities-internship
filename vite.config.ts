import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/toss-api': {
        target: 'https://wts-cert-api.tossinvest.com',
        changeOrigin: true,
        headers: {
          origin: 'https://www.tossinvest.com',
          referer: 'https://www.tossinvest.com/',
        },
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            proxyReq.setHeader('origin', 'https://www.tossinvest.com');
            proxyReq.setHeader('referer', 'https://www.tossinvest.com/');
          });
        },
        rewrite: (path) => path.replace(/^\/toss-api/, ''),
      },
    },
  },
});
