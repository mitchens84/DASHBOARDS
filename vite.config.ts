import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Create a plugin to copy HTML files to the build directory and maintain their structure
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

      // Recursive function to copy HTML files maintaining directory structure
      const copyHtmlFiles = (srcDir, destDir, relativePath = '') => {
        const currentSrcDir = path.join(srcDir, relativePath);
        
        if (!fs.existsSync(currentSrcDir)) return;
        
        const entries = fs.readdirSync(currentSrcDir, { withFileTypes: true });
        
        entries.forEach(entry => {
          const entryRelativePath = path.join(relativePath, entry.name);
          const srcPath = path.join(srcDir, entryRelativePath);
          const destPath = path.join(destDir, entryRelativePath);
          
          if (entry.isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyHtmlFiles(srcDir, destDir, entryRelativePath);
          } 
          else if (entry.isFile() && entry.name.endsWith('.html')) {
            const destFolder = path.dirname(destPath);
            if (!fs.existsSync(destFolder)) {
              fs.mkdirSync(destFolder, { recursive: true });
            }
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${srcPath} to ${destPath}`);
            
            // Also copy to flat structure for backward compatibility
            const flatDestPath = path.join(destDir, entry.name);
            fs.copyFileSync(srcPath, flatDestPath);
            console.log(`Also copied to ${flatDestPath} (flat structure)`);
          }
        });
      };
      
      copyHtmlFiles(contentSrcDir, contentDestDir);
      
      // Copy any CSS/JS assets that might be referenced by the HTML files
      const copyAssets = (srcDir, destDir, relativePath = '') => {
        const currentSrcDir = path.join(srcDir, relativePath);
        
        if (!fs.existsSync(currentSrcDir)) return;
        
        const entries = fs.readdirSync(currentSrcDir, { withFileTypes: true });
        
        entries.forEach(entry => {
          const entryRelativePath = path.join(relativePath, entry.name);
          const srcPath = path.join(srcDir, entryRelativePath);
          const destPath = path.join(destDir, entryRelativePath);
          
          if (entry.isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyAssets(srcDir, destDir, entryRelativePath);
          } 
          else if (entry.isFile() && (
            entry.name.endsWith('.css') || 
            entry.name.endsWith('.js') || 
            entry.name.endsWith('.json') ||
            entry.name.endsWith('.svg') ||
            entry.name.endsWith('.png') ||
            entry.name.endsWith('.jpg') ||
            entry.name.endsWith('.jpeg') ||
            entry.name.endsWith('.gif')
          )) {
            const destFolder = path.dirname(destPath);
            if (!fs.existsSync(destFolder)) {
              fs.mkdirSync(destFolder, { recursive: true });
            }
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied asset ${srcPath} to ${destPath}`);
          }
        });
      };
      
      copyAssets(contentSrcDir, contentDestDir);
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
        // Configure server to handle HTML content paths
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
          if (id.includes('/content/')) {
            return 'content';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
