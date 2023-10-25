import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bealy-pokemon/',
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: false,
    proxy: {
      '/api': {
        target: 'https://pokeapi.co/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
  publicDir: "public",
  plugins: [react()],
});
