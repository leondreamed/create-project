const createAliases = require('@leonzalion/configs/eslint/alias');

module.exports = {
	extends: [require.resolve('@leonzalion/configs/eslint')],
	parserOptions: {
		project: ['./tsconfig.eslint.json'],
		extraFileExtensions: ['.vue'],
	},
	settings: createAliases({ '~': './src', '~test': './test' }),
};
