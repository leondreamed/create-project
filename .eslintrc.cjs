const createESLintConfig = require('@leonzalion/configs/eslint.cjs');

module.exports = createESLintConfig(__dirname, {
	ignorePatterns: ['src/templates/**'],
	rules: {
		'unicorn/filename-case': 'off',
	},
});
