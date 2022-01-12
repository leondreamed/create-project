const path = require('path');

module.exports = {
	extends: ['../.eslintrc.cjs'],
	parserOptions: {
		project: ['./tsconfig.eslint.json'],
	},
};
