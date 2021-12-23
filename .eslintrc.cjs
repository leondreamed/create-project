/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

const createAliases = require('@leonzalion/eslint-config/alias.js');
const path = require('path');

module.exports = {
	extends: ['@leonzalion/eslint-config'],
	parserOptions: { project: path.resolve(__dirname, 'tsconfig.eslint.json') },
	settings: createAliases({ '~': './src', '~test': './test' }),
};
