const createAliases = require('@leonzalion/configs/eslint/alias');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: [require.resolve('@leonzalion/configs/eslint')],
	parserOptions: { project: ['./tsconfig.eslint.json'] },
	ignorePatterns: ['src/templates/**'],
	settings: createAliases({ '~': './src', '~test': './test' }),
	overrides: [
		{
			files: ['scripts/**/*.ts'],
			rules: {
				'unicorn/no-process-exit': 'off',
			},
		},
	],
});
