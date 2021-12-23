import { execaCommandSync } from 'execa';
import { ProjectType } from '~test/types/project.js';

import { checkCommon } from '~test/utils/check.js';
import { getCreateProjectCommand } from '~test/utils/command.js';
import { removeMyProject } from '~test/utils/project.js';

describe('creates valid TypeScript project', () => {
	beforeAll(() => {
		removeMyProject(ProjectType.typescript);

		// Create the project
		execaCommandSync(getCreateProjectCommand(ProjectType.typescript));
	});

	afterAll(() => {
		removeMyProject(ProjectType.typescript);
	});

	checkCommon(ProjectType.typescript);
});
