import micromatch from 'micromatch';

const config = {
	'*.{js,ts,vue}': (files) => {
		const match = micromatch.not(files, '**/src/templates/**');
		if (match.length > 0) {
			return [
				`eslint --cache --fix ${match.join(' ')}`,
				`prettier --write ${match.join(' ')}`,
			];
		}

		return [];
	},
};

export default config;
