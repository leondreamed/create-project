const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	root: true,
	extends: [require.resolve('@leonzalion/configs/eslint.cjs')],
	parserOptions: {
		project: [path.resolve(__dirname, 'tsconfig.eslint.json')],
	},
	ignorePatterns: ['src/templates/**']
});
