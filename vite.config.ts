import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  assetsInclude: ['**/*.webp'],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
