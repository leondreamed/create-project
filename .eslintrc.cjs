/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

const createAliases = require('@leonzalion/eslint-config/alias.js');
const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: ['@leonzalion/eslint-config'],
	ignorePatterns: ['src/templates/**'],
	parserOptions: { project: path.resolve(__dirname, 'tsconfig.eslint.json') },
	settings: createAliases({ '~': './src', '~test': './test' }),
});
