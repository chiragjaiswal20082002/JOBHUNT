// Import Vite's defineConfig function to define the config
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// Vite config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'redux', 'axios'],
        },
      },
    },
  },
});
