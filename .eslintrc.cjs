/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

const createAliases = require('@leonzalion/eslint-config/alias.js');

module.exports = {
	extends: ['@leonzalion/eslint-config'],
	parserOptions: { project: ['./tsconfig.eslint.json'] },
	settings: createAliases({ '~': './src', '~test': './test' }),
};
