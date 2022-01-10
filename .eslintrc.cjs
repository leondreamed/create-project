/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

const createAliases = require('@leonzalion/configs/eslint/alias');
const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: [require.resolve('@leonzalion/configs/eslint')],
	ignorePatterns: ['src/templates/**'],
	parserOptions: { project: path.resolve(__dirname, 'tsconfig.eslint.json') },
	settings: createAliases({ '~': './src', '~test': './test' }),
});
