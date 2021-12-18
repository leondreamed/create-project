import * as fs from 'node:fs';
import * as path from 'node:path';

import type { ProjectType } from '~test/types/project';

import { getProjectFolder, getProjectName } from './project';

export function checkCommon(type: ProjectType) {
	const projectFolder = getProjectFolder(type);
	const projectName = getProjectName(type);

	test('the project folder should exist', () => {
		expect(fs.existsSync(projectFolder)).toBe(true);
	});

	test('renovate.json should not exist', () => {
		expect(fs.existsSync(path.join(projectFolder, 'renovate.json'))).toBe(
			false
		);
	});

	test('the .git folder should not exist', () => {
		expect(fs.existsSync(path.join(projectFolder, '.git'))).toBe(false);
	});

	test('the project name of package.json should be equal to the command-line name', () => {
		const packageJson = JSON.parse(
			fs.readFileSync(path.join(projectFolder, 'package.json')).toString()
		);
		expect(packageJson.name === projectName).toBe(true);
	});
}
