/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const HOST = "43.218.113.28";
const PORT = "8081";
// const HOST = 'localhost';
// const PORT = '8080';

// https://vitejs.dev/config/
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
				target: `http://${HOST}:${PORT}`,
				changeOrigin: true,
				// rewrite: (path) => path.replace('^/api/', ''),
			},
		},
	},
});
