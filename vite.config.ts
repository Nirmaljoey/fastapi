import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.21yard.com',
        changeOrigin: true,
        secure: true,
        // Remove '/api' only, as the target already includes '/api/marketplace'
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});