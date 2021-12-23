import path from 'node:path';

import {templatesPath} from './paths.js';
import type {Template} from '~/types/template';

export const getTemplateFolder = (template: Template) =>
	path.join(templatesPath, template);
