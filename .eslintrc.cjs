const createESLintConfig = require('lionconfig');

module.exports = createESLintConfig(__dirname, {
	ignorePatterns: ['src/templates/**'],
	rules: {
		'unicorn/filename-case': 'off',
	},
});
