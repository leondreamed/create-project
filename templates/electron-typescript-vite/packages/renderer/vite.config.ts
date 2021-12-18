/* eslint-env node */

import vue from '@vitejs/plugin-vue';
import { builtinModules } from 'module';
import path from 'path';
import type { UserConfig } from 'vite';

import { chrome } from '../../electron-vendors.config.json';

const PACKAGE_ROOT = __dirname;

const config: UserConfig = {
	mode: process.env.MODE,
	root: PACKAGE_ROOT,
	resolve: {
		alias: {
			'~': path.join(PACKAGE_ROOT, 'src'),
		},
	},
	plugins: [vue()],
	base: '',
	server: {
		fs: {
			strict: true,
		},
	},
	build: {
		sourcemap: true,
		target: `chrome${chrome}`,
		outDir: 'dist',
		assetsDir: '.',
		rollupOptions: {
			external: [...builtinModules],
		},
		emptyOutDir: true,
		brotliSize: false,
	},
};

// eslint-disable-next-line import/no-default-export
export default config;
