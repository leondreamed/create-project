import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync } from 'execa';

const rootPath = new URL('..', import.meta.url).pathname;

fs.rmSync(path.join(rootPath, 'dist'), { recursive: true, force: true });
execaCommandSync('pnpm i --lockfile-only', {
	cwd: path.join(rootPath, './src/templates/typescript'),
});
execaCommandSync('pnpm i --lockfile-only', {
	cwd: path.join(rootPath, './src/templates/electron-typescript-vite'),
});

execaCommandSync('tsc -p tsconfig.build.json');
execaCommandSync('tsc-alias -p tsconfig.build.json');
