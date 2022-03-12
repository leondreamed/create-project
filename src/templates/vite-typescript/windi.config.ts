import { defineConfig } from 'windicss/helpers/index.js';

export default defineConfig({
	attributify: true,
	shortcuts: {
		row: 'flex flex-row',
		column: 'flex flex-column',
		center: 'items-center justify-center',
	},
});
