/* eslint-env node */

const createAliases = require('@leonzalion/configs/eslint');

module.exports = {
	env: {
		browser: true,
		node: false,
	},
	extends: ['../../.eslintrc.cjs'],
	settings: createAliases({
		'~': './packages/renderer/src',
	}),
};
