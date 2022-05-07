import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

export function checkProject({
	projectDir,
	projectName,
}: {
	projectDir: string;
	projectName: string;
}) {
	test('the project folder should exist', () => {
		expect(fs.existsSync(projectDir)).toBe(true);
	});

	test('renovate.json should not exist', () => {
		expect(fs.existsSync(path.join(projectDir, 'renovate.json'))).toBe(false);
	});

	test('the .git folder should not exist', () => {
		expect(fs.existsSync(path.join(projectDir, '.git'))).toBe(false);
	});

	test("the .gitignore file should've been renamed", () => {
		expect(fs.existsSync(path.join(projectDir, '_gitignore'))).toBe(false);
		expect(fs.existsSync(path.join(projectDir, '.gitignore'))).toBe(true);
	});

	test('the project name of package.json should be equal to the command-line name', () => {
		const packageJson = JSON.parse(
			fs.readFileSync(path.join(projectDir, 'package.json')).toString()
		) as { name: string };
		expect(packageJson.name).toEqual(projectName);
	});

	test('interpolations should not exist in the package.json', () => {
		const packageJson = fs
			.readFileSync(path.join(projectDir, 'package.json'))
			.toString();
		expect(/{{.*}}/.test(packageJson)).toBe(false);
	});

	test('the packages/{{project_name}} folder should have been renamed', () => {
		expect(
			fs.existsSync(path.join(projectDir, 'packages/{{project_name}}'))
		).toBe(false);
	});
}
