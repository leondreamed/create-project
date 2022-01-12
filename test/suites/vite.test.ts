import fs from 'node:fs';
import path from 'node:path';
import { ProjectType } from '~/types/project';

import { checkCommon } from '~test/utils/check';
import {
	createProject,
	getProjectDestFolder,
	removeMyProject,
} from '~test/utils/project';

describe('creates valid Vite project', () => {
	beforeAll(async () => {
		removeMyProject(ProjectType.vite);
		await createProject(ProjectType.vite);
	});

	afterAll(() => {
		removeMyProject(ProjectType.vite);
	});

	checkCommon(ProjectType.vite);

	test('should contain vite.config.ts', () => {
		const projectFolder = getProjectDestFolder(ProjectType.vite);
		expect(fs.existsSync(path.join(projectFolder, 'vite.config.ts'))).toBe(
			true
		);
	});
});
