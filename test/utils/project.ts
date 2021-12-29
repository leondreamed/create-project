import fs from 'node:fs';
import path from 'node:path';

import { execaCommandSync } from 'execa';
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

type PromptInputOptions = {
	projectName: string;
	projectType: string;
	isLibrary: boolean;
};
function getPromptInput({
	projectName,
	projectType,
	isLibrary,
}: PromptInputOptions) {
	return [projectName, projectType, isLibrary].join('\n');
}

export function createProject(type: ProjectType) {
	execaCommandSync('pnpm start', {
		input: getPromptInput({
			projectName: getProjectName(type),
			projectType: type,
			isLibrary: false,
		}),
	});
}
