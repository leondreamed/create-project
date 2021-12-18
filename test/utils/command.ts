import type { ProjectType } from '~test/types/project';

import { getProjectFolder, getProjectName } from './project';

export const getCreateProjectCommand = (type: ProjectType) =>
	`pnpm start ${getProjectName(type)} ${getProjectFolder(type)} -- -t ${type}`;
