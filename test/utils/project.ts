import * as fs from 'node:fs';
import * as path from 'node:path';

import { rootPath } from './path.js';
import { ProjectType } from '~test/types/project.js';

export const getProjectName = (type: ProjectType) => `my-${type}-project`;
export const getProjectFolder = (type: ProjectType) =>
	path.join(rootPath, `my-${type}-folder`);
export function removeMyProject(type: ProjectType) {
	const projectFolder = getProjectFolder(type);
	if (fs.existsSync(projectFolder)) {
		fs.rmSync(projectFolder, { recursive: true, force: true });
	}
}
