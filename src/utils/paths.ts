import path from 'node:path';

import type { ProjectTemplate } from '~/types/template.js';

export const srcPath = new URL('..', import.meta.url).pathname;
export const templatesPath = path.join(srcPath, 'templates');
export const getTemplateFolderPath = (template: ProjectTemplate) =>
	path.join(templatesPath, template.folderName);
