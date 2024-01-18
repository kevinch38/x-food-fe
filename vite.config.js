/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: `http://${process.env.HOST}:${process.env.PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api/', ''),
      }
    }
  }
})
