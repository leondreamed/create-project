import { ProjectType } from '~test/types/project.js';

import { checkCommon } from '~test/utils/check.js';
import { createProject, removeMyProject } from '~test/utils/project.js';

describe('creates valid TypeScript project', () => {
	beforeAll(() => {
		removeMyProject(ProjectType.typescript);
		createProject(ProjectType.typescript);
	});

	afterAll(() => {
		removeMyProject(ProjectType.typescript);
	});

	checkCommon(ProjectType.typescript);
});
