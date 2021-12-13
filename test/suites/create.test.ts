import { execaCommandSync } from 'execa';
import fs from 'fs';
import path from 'path';

import { rootPath } from '~test/utils';

const projectName = path.join(rootPath, 'my-project');
const projectFolder = path.join(rootPath, 'my-folder');

function removeMyProject() {
	if (fs.existsSync(projectFolder)) {
		fs.rmSync(projectFolder, { recursive: true });
	}
}

describe('creates valid project', () => {
	beforeAll(() => {
		removeMyProject();
		// Clone the project
		execaCommandSync(`pnpm start ${projectName} ${projectFolder}`);
	});

	afterAll(() => {
		removeMyProject();
	});

	test('the project folder should exist', () => {
		expect(fs.existsSync(projectFolder)).toBe(true);
	});

	test('renovate.json should not exist', () => {
		expect(fs.existsSync(path.join(projectFolder, 'renovate.json'))).toBe(false);
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
});
