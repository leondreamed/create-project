import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync as exec } from 'execa';

const rootPath = new URL('..', import.meta.url).pathname;

fs.rmSync(path.join(rootPath, 'dist'), { recursive: true, force: true });
exec('tsc -p tsconfig.build.json');
exec('tsc-alias -p tsconfig.build.json');
exec('cp -r package.json src/templates dist/');
