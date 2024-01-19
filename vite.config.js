/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const HOST = "43.218.113.28";
const PORT = "8081";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: `http://${HOST}:${PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api/', ''),
      }
    }
  }
})
