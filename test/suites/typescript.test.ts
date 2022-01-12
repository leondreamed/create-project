import { ProjectType } from '~/types/project';
import { checkCommon } from '~test/utils/check';
import { createProject, removeMyProject } from '~test/utils/project';

describe('creates valid TypeScript project', () => {
	beforeAll(async () => {
		removeMyProject(ProjectType.typescript);
		await createProject(ProjectType.typescript);
	});

	afterAll(() => {
		removeMyProject(ProjectType.typescript);
	});

	checkCommon(ProjectType.typescript);
});
