import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/DASHBOARDS/',
  plugins: [
    react(),
    {
      name: 'history-api-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith('/assets/') || req.url.startsWith('/@vite/') || req.url.startsWith('/favicon.ico')) {
            next();
          } else if (req.method === 'GET' && !req.url.includes('.')) {
            req.url = '/index.html';
            next();
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: './index.html',
        404: './404.html'
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Create separate chunks for content files
          if (id.includes('/content/')) {
            return 'content';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
