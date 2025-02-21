import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/marketplace': {
        target: 'https://dev.21yard.com',
        changeOrigin: true,
      },
    },
  },
});