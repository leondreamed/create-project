import { defineConfig, configDefaults } from 'vitest/config';
import { join } from 'desm';

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
