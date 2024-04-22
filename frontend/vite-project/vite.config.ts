import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080/' // Assuming Spring Boot runs on 8080
    }
  },
  build: {
    outDir: '../src/main/resources/static',
  },
});
