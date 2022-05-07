import * as path from 'node:path';
import { beforeAll, describe } from 'vitest';

import { ProjectType } from '~/types/project.js';
import { checkProject } from '~test/utils/check.js';
import { tempDir } from '~test/utils/path.js';
import { createProject, removeMyProject } from '~test/utils/project.js';

describe('creates valid TypeScript project', () => {
	const projectDestDir = path.join(tempDir, 'scoped-package');

	beforeAll(async () => {
		removeMyProject(projectDestDir);
		await createProject({
			projectDestDir,
			projectName: '@scoped/package',
			projectType: ProjectType.typescript,
		});
	});

	checkProject({
		projectDir: projectDestDir,
		projectName: '@scoped/package',
	});
});
