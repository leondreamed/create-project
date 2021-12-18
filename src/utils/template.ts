import path from 'node:path';

import type { Template } from '~/types/template';

import { templatesPath } from './paths';

export const getTemplateFolder = (template: Template) =>
	path.join(templatesPath, template);
