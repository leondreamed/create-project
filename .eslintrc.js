/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createAlias = require('@leonzalion/eslint-config/alias');

module.exports = {
	extends: ['@leonzalion/eslint-config'],
	parserOptions: { tsconfigRootDir: __dirname },
	settings: createAlias({ '~': './src' }),
};
