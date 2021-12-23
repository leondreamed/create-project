/* eslint-disable */

const createAlias = require('@leonzalion/eslint-config/alias.cjs');

module.exports = {
	extends: ['@leonzalion/eslint-config'],
	parserOptions: {project: ['./tsconfig.eslint.json']},
	settings: createAlias({'~': './src', '~test': './test'}),
};
