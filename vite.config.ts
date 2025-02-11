import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      treeshake: true,
    },
  },
});
