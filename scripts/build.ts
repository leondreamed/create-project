import * as fs from 'node:fs';

import { execaCommandSync as exec } from 'execa';
import { globbySync } from 'globby';
import { chProjectDir, copyPackageFiles, rmDist } from 'lionconfig';

chProjectDir(import.meta.url);
rmDist();
exec('tsc -p tsconfig.build.json');
exec('tsc-alias -p tsconfig.build.json');
await copyPackageFiles({ commonjs: false });

// Verify that node_modules does not exist in templates
if (globbySync('src/templates/**/node_modules').length > 0) {
	throw new Error('node_modules folder detected in src/templates');
}

fs.cpSync('src/templates', 'dist/templates', { recursive: true });
