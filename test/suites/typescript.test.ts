import * as path from 'node:path';

import { beforeAll, describe } from 'vitest';

import { ProjectType } from '~/types/project.js';
import { checkProject } from '~test/utils/check.js';
import { tempDir } from '~test/utils/path.js';
import {
	createProject,
	getProjectName,
	removeMyProject,
} from '~test/utils/project.js';

describe('creates valid TypeScript project', () => {
	const projectName = getProjectName(ProjectType.typescript);
	const projectDestDir = path.join(tempDir, 'my-typescript-project');

	beforeAll(async () => {
		removeMyProject(projectDestDir);
		await createProject({
			projectDestDir,
			projectType: ProjectType.typescript,
			projectName,
		});
	});

	checkProject({
		projectDir: projectDestDir,
	});
});
