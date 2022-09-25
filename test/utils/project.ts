import fs from 'node:fs';

import type { PromptModule } from 'inquirer';
import inquirer from 'inquirer';

import type { ProjectType } from '~/types/project.js';

export const getProjectName = (type: ProjectType) => `my-${type}-project`;
export function removeMyProject(projectDestDir: string) {
	if (fs.existsSync(projectDestDir)) {
		fs.rmSync(projectDestDir, { recursive: true, force: true });
	}
}

export async function createProject({
	projectType,
	projectName,
	projectDestDir,
}: {
	projectDestDir: string;
	projectType: ProjectType;
	projectName: string;
}) {
	inquirer.prompt = (async () => ({
		projectType,
		projectRepository: 'leonzalion/my-repo',
		projectDescription: 'my project',
		projectName,
		isLibrary: false,
	})) as unknown as PromptModule;
	const { createProject } = await import('../../src/utils/project.js');
	await createProject({
		folder: projectDestDir,
	});
}
