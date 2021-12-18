import { execaCommandSync } from 'execa';
import { ProjectType } from '~test/types/project';

import { checkCommon } from '~test/utils/check';
import { getCreateProjectCommand } from '~test/utils/command';
import {
	removeMyProject,
} from '~test/utils/project';

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
