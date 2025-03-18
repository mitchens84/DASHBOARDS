import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Create a plugin to copy HTML files to the build directory
const copyContentFiles = () => {
  return {
    name: 'copy-content-files',
    writeBundle() {
      // Create content directory if it doesn't exist
      const contentSrcDir = path.resolve(__dirname, 'content');
      const contentDestDir = path.resolve(__dirname, 'docs/content');
      
      if (!fs.existsSync(contentDestDir)) {
        fs.mkdirSync(contentDestDir, { recursive: true });
      }

      // Copy HTML files from content directory
      if (fs.existsSync(contentSrcDir)) {
        // Handle HTML files in root of content directory
        const files = fs.readdirSync(contentSrcDir);
        files.forEach(file => {
          if (file.endsWith('.html')) {
            const srcFile = path.join(contentSrcDir, file);
            const destFile = path.join(contentDestDir, file);
            fs.copyFileSync(srcFile, destFile);
            console.log(`Copied ${srcFile} to ${destFile}`);
          }
        });
        
        // Handle subdirectories
        files.forEach(file => {
          const fullPath = path.join(contentSrcDir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            const subDir = path.join(contentSrcDir, file);
            const subFiles = fs.readdirSync(subDir);
            subFiles.forEach(subFile => {
              if (subFile.endsWith('.html')) {
                const srcFile = path.join(subDir, subFile);
                const destFile = path.join(contentDestDir, subFile);
                fs.copyFileSync(srcFile, destFile);
                console.log(`Copied ${srcFile} to ${destFile}`);
              }
            });
          }
        });
      }
    }
  };
};

export default defineConfig({
  base: '/DASHBOARDS/',
  plugins: [
    react(),
    copyContentFiles(),
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
  },
  // Add server configuration for development
  server: {
    fs: {
      // Allow serving files from the content directory
      allow: ['..']
    }
  }
})
