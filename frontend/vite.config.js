<<<<<<< HEAD
// Import Vite's defineConfig function to define the config
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// Vite config
=======
>>>>>>> 43b87040531a2cf8608be74426ef8468d9a90d47
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
<<<<<<< HEAD
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'redux', 'axios'],
=======
    chunkSizeWarningLimit: 1000, // 1000 KB (1 MB)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'redux', 'axios'] // Example, include large libraries in separate chunk
>>>>>>> 43b87040531a2cf8608be74426ef8468d9a90d47
        },
      },
    },
  },
});
