import { join } from 'desm';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, 'src'),
			'~test': join(import.meta.url, 'test'),
		},
	},
	test: {
		exclude: [...configDefaults.exclude, 'src/templates/**'],
	},
});
