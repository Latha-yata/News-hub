import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/News-hub/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // Add common headers to the request
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = proxyReq.path;
            if (!url.includes('apiKey=')) {
              proxyReq.path = `${url}&apiKey=${apiKey}`;
            }
            
            // Set the required headers for newsapi.org (if needed)
            proxyReq.setHeader('Accept-Encoding', 'gzip, deflate, br');
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
          });
        },
      },
    },
  },
});
