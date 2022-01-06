import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync } from 'execa';

const rootPath = new URL('..', import.meta.url).pathname;

fs.rmSync(path.join(rootPath, 'dist'), { recursive: true, force: true });
execaCommandSync('tsc -p tsconfig.build.json');
execaCommandSync('tsc-alias -p tsconfig.build.json');
execaCommandSync('cp -r package.json src/templates dist/');
