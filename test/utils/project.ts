import * as fs from 'node:fs';
import { rootPath } from './path';
import * as path from 'node:path';

export const projectName = 'my-project';
export const projectFolder = path.join(rootPath, 'my-folder');

export function removeMyProject() {
	if (fs.existsSync(projectFolder)) {
		fs.rmSync(projectFolder, { recursive: true });
	}
}
