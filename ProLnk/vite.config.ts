import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: 'client',
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      maxParallelFileOps: 1,
      treeshake: { preset: 'smallest' },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three';
          if (id.includes('node_modules/framer-motion')) return 'framer';
          if (id.includes('node_modules/recharts') || id.includes('d3-')) return 'charts';
          if (id.includes('node_modules/@radix-ui')) return 'radix';
          if (id.includes('node_modules/@tanstack')) return 'query';
          if (id.includes('node_modules/lucide-react')) return 'icons';
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod')) return 'forms';
          if (id.includes('node_modules/@trpc')) return 'trpc';
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-vendor';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
});
