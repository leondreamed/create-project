import { execaCommandSync } from 'execa';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { ProjectType } from '~test/types/project';
import { checkCommon } from '~test/utils/check';
import { getCreateProjectCommand } from '~test/utils/command';
import { getProjectFolder, removeMyProject } from '~test/utils/project';

describe('creates valid Electron project', () => {
	beforeAll(() => {
		removeMyProject(ProjectType.electron);

		// Create the project
		execaCommandSync(getCreateProjectCommand(ProjectType.electron));
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
