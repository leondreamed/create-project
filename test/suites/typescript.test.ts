import { beforeAll, describe } from 'vitest';

import { ProjectType } from '~/types/project.js';
import { checkCommon } from '~test/utils/check.js';
import { createProject, removeMyProject } from '~test/utils/project.js';

describe('creates valid TypeScript project', () => {
	beforeAll(async () => {
		removeMyProject(ProjectType.typescript);
		await createProject(ProjectType.typescript);
	});

	checkCommon(ProjectType.typescript);
});
