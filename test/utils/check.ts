import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

import type { ProjectType } from '~/types/project.js';

import { getProjectDestFolder, getProjectName } from './project.js';

export function checkCommon(type: ProjectType) {
	const projectFolder = getProjectDestFolder(type);
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

	test("the .gitignore file should've been renamed", () => {
		expect(fs.existsSync(path.join(projectFolder, '_gitignore'))).toBe(false);
		expect(fs.existsSync(path.join(projectFolder, '.gitignore'))).toBe(true);
	});

	test('the project name of package.json should be equal to the command-line name', () => {
		const packageJson = JSON.parse(
			fs.readFileSync(path.join(projectFolder, 'package.json')).toString()
		) as { name: string };
		expect(packageJson.name).toEqual(projectName);
	});

	test('interpolations should not exist in the package.json', () => {
		const packageJson = fs
			.readFileSync(path.join(projectFolder, 'package.json'))
			.toString();
		expect(/{{.*}}/.test(packageJson)).toBe(false);
	});

	test('the packages/{{project_name}} folder should have been renamed', () => {
		expect(
			fs.existsSync(path.join(projectFolder, 'packages/{{project_name}}'))
		).toBe(false);
	});
}
