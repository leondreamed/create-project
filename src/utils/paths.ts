import path from 'node:path';

export const rootPath = new URL('../..', import.meta.url).pathname;
export const templatesPath = path.join(rootPath, 'templates');
