import { builtinModules } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import vue from '@vitejs/plugin-vue';
import type { UserConfig } from 'vite';
import desm, { join } from 'desm';

const { chrome } = JSON.parse(
	fs
		.readFileSync(join(import.meta.url, '../../electron-vendors.config.json'))
		.toString()
) as { chrome: string; node: string };

const PACKAGE_ROOT = desm(import.meta.url);

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

export default config;
