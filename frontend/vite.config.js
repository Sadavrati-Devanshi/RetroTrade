import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),    },
  }, 
  server: {
    proxy: {
      '/api':
         'http://localhost:5000'
      
    }
  },
  rollupOptions: {
    treeshake: true, // Remove unused code
  },
  
})
