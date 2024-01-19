import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build',
        assetsDir: 'assets',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    base: './',
    server: {
        proxy: {
            '/api': {
                target: `http://43.218.113.28:8081`,
                changeOrigin: true,
            }
        }
    }
})
