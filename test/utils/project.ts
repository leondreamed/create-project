import fs from 'node:fs';
import path from 'node:path';

import inquirer, { PromptModule } from 'inquirer';
import { rootPath } from './path.js';
import { ProjectType } from '~test/types/project.js';

export const getProjectName = (type: ProjectType) => `my-${type}-project`;
export const getProjectFolder = (type: ProjectType) =>
	path.join(rootPath, `temp/my-${type}-folder`);
export function removeMyProject(type: ProjectType) {
	const projectFolder = getProjectFolder(type);
	if (fs.existsSync(projectFolder)) {
		fs.rmSync(projectFolder, { recursive: true, force: true });
	}
}

export async function createProject(type: ProjectType) {
	inquirer.prompt = (async () => ({
		projectType: type,
		projectName: getProjectName(type),
		isLibrary: false,
	})) as unknown as PromptModule;
	const { createProject } = await import('../../src/utils/project.js');
	await createProject({ folder: getProjectFolder(type) });
}
