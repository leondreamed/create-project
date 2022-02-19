import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'desm';

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
		},
	},
	plugins: [vue()],
});
