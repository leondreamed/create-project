import { builtinModules } from 'module';
import path from 'path';
import type { UserConfig } from 'vite';

import { node } from '../../electron-vendors.config.json';

const PACKAGE_ROOT = __dirname;

const config: UserConfig = {
	mode: process.env.MODE,
	root: PACKAGE_ROOT,
	envDir: process.cwd(),
	resolve: {
		alias: {
			'~': path.join(PACKAGE_ROOT, 'src'),
		},
	},
	build: {
		sourcemap: 'inline',
		target: `node${node}`,
		outDir: 'dist',
		assetsDir: '.',
		minify: process.env.MODE !== 'development',
		lib: {
			entry: 'src/index.ts',
			formats: ['cjs'],
		},
		rollupOptions: {
			external: ['electron', 'electron-devtools-installer', ...builtinModules],
			output: {
				entryFileNames: '[name].cjs',
			},
		},
		emptyOutDir: true,
		brotliSize: false,
	},
};

// eslint-disable-next-line import/no-default-export
export default config;
