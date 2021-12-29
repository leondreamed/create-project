import fs from 'node:fs';
import path from 'node:path';

import { ProjectType } from '~test/types/project.js';
import { checkCommon } from '~test/utils/check.js';
import {
	createProject,
	getProjectFolder,
	removeMyProject,
} from '~test/utils/project.js';

describe('creates valid Electron project', () => {
	beforeAll(() => {
		removeMyProject(ProjectType.electron);
		createProject(ProjectType.electron);
	});

	afterAll(() => {
		removeMyProject(ProjectType.electron);
	});

	checkCommon(ProjectType.electron);

	test('should contain electron-builder.config.js', () => {
		const projectFolder = getProjectFolder(ProjectType.electron);
		expect(
			fs.existsSync(path.join(projectFolder, 'electron-builder.config.js'))
		).toBe(true);
	});
});
