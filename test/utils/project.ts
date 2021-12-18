import * as fs from 'node:fs';
import * as path from 'node:path';

import type { ProjectType } from '~test/types/project';

import { rootPath } from './path';

export const getProjectName = (type: ProjectType) => `my-${type}-project`;
export const getProjectFolder = (type: ProjectType) =>
	path.join(rootPath, `my-${type}-folder`);

export function removeMyProject(type: ProjectType) {
	const projectFolder = getProjectFolder(type);
	if (fs.existsSync(projectFolder)) {
		fs.rmSync(projectFolder, { recursive: true });
	}
}
