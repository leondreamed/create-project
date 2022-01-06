import mapObject from 'map-obj';
import { templateOptions } from '~/utils/template.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProjectType = mapObject(templateOptions, (key) => [key, key]) as {
	[K in keyof typeof templateOptions]: K;
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ProjectType = keyof typeof ProjectType;
