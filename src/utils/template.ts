import path from 'node:path';

import { templatesPath } from './paths.js';
import { TemplateOption } from '~/types/template.js';

const templateOptionToName = {
	[TemplateOption.electron]: 'electron-typescript-vite',
	[TemplateOption.typescript]: 'typescript',
	[TemplateOption.common]: 'common',
};
export const getTemplateName = (templateOption: TemplateOption) =>
	templateOptionToName[templateOption];
export const getTemplateFolder = (templateOption: TemplateOption) =>
	path.join(templatesPath, templateOptionToName[templateOption]);
