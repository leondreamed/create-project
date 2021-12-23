import { getProjectFolder, getProjectName } from './project.js';
import type { ProjectType } from '~test/types/project.js';

export const getCreateProjectCommand = (type: ProjectType) =>
	`pnpm start ${getProjectName(type)} ${getProjectFolder(type)} -- -t ${type}`;
