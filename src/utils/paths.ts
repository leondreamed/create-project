import path from 'node:path';

export const srcPath = new URL('..', import.meta.url).pathname;
export const templatesPath = path.join(srcPath, 'templates');
