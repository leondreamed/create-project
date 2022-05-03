import type { PromptModule } from 'inquirer';
import inquirer from 'inquirer';
import fs from 'node:fs';
import path from 'node:path';

import type { ProjectType } from '~/types/project.js';

import { rootPath } from './path.js';

export const getProjectName = (type: ProjectType) => `my-${type}-project`;
export const getProjectDestFolder = (type: ProjectType) =>
	path.join(rootPath, `temp/my-${type}-folder`);
export function removeMyProject(type: ProjectType) {
	const projectFolder = getProjectDestFolder(type);
	if (fs.existsSync(projectFolder)) {
		fs.rmSync(projectFolder, { recursive: true, force: true });
	}
}

export async function createProject(type: ProjectType) {
	inquirer.prompt = (async () => ({
		projectType: type,
		projectRepository: 'leonzalion/my-repo',
		projectDescription: 'my project',
		projectName: getProjectName(type),
		isLibrary: false,
	})) as unknown as PromptModule;
	const { createProject } = await import('../../src/utils/project.js');
	await createProject({ folder: getProjectDestFolder(type) });
}
