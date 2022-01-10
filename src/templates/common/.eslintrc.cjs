const createAliases = require('@leonzalion/configs/eslint/alias');

module.exports = {
	extends: [require.resolve('@leonzalion/configs/eslint')],
	parserOptions: { tsconfigRootDir: __dirname },
	settings: createAliases({ '~': './src', '~test': './test' }),
};
