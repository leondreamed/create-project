import * as fs from 'node:fs';
import { execaCommandSync as exec } from 'execa';
import { rmDist, copyPackageFiles } from 'lion-system';

rmDist();
exec('tsc -p tsconfig.build.json');
exec('tsc-alias -p tsconfig.build.json');
await copyPackageFiles();
fs.cpSync('src/templates', 'dist/templates', { recursive: true });
