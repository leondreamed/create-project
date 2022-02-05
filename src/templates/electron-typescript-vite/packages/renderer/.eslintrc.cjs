const path = require('path');
const createAliases = require('@leonzalion/configs/eslint/alias');

module.exports = {
	env: {
		browser: true,
		node: false,
	},
	extends: ['../../.eslintrc.cjs'],
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.eslint.json'),
		extraFileExtensions: ['.vue'],
	},
	settings: createAliases({
		'~': './packages/renderer/src',
	}),
	overrides: [
		{
			files: '.eslintrc.cjs',
			env: {
				browser: false,
				node: true,
			},
		},
	],
	rules: {
		'import/extensions': [
			'error',
			{
				ts: 'never',
				js: 'never',
				vue: 'always',
			},
		],
	},
};
