/* eslint-env node */

const createAliases = require('@leonzalion/eslint-config/alias');

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
