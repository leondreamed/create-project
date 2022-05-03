const createESLintConfig = require('@leonzalion/configs/eslint.cjs');

module.exports = createESLintConfig(__dirname, {
	root: true,
	ignorePatterns: ['src/templates/**'],
});
