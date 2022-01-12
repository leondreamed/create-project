import fs from 'node:fs';
import path from 'node:path';
import { ProjectType } from '~/types/project';

import { checkCommon } from '~test/utils/check';
import {
	createProject,
	getProjectDestFolder,
	removeMyProject,
} from '~test/utils/project';

describe('creates valid Electron project', () => {
	beforeAll(async () => {
		removeMyProject(ProjectType.electron);
		await createProject(ProjectType.electron);
	});

	afterAll(() => {
		removeMyProject(ProjectType.electron);
	});

	checkCommon(ProjectType.electron);

	test('should contain electron-builder.config.js', () => {
		const projectFolder = getProjectDestFolder(ProjectType.electron);
		expect(
			fs.existsSync(path.join(projectFolder, 'electron-builder.config.js'))
		).toBe(true);
	});
});
