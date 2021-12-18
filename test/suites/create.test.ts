import { execaCommandSync } from 'execa';

import { checkCommon } from '~test/utils/check';
import {
	projectFolder,
	projectName,
	removeMyProject,
} from '~test/utils/project';

describe('creates valid TypeScript project', () => {
	beforeAll(() => {
		removeMyProject();

		// Create the project
		execaCommandSync(
			`pnpm start ${projectName} ${projectFolder} -- -t typescript`
		);
	});

	afterAll(() => {
		removeMyProject();
	});

	checkCommon();
});
