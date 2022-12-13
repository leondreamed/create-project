const { createESLintConfig } = require('lionconfig/eslint');

module.exports = createESLintConfig(__dirname, {
	ignorePatterns: ['src/templates/**'],
	rules: {
		'unicorn/filename-case': 'off',
	},
});
