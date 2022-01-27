import * as fs from 'node:fs';
import { execaCommandSync as exec } from 'execa';
import { rmDist, copyPackageFiles, chProjectDir } from 'lion-system';

chProjectDir(import.meta.url);
rmDist();
exec('tsc -p tsconfig.build.json');
exec('tsc-alias -p tsconfig.build.json');
copyPackageFiles();
fs.cpSync('src/templates', 'dist/templates', { recursive: true });
