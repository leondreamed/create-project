import { execaCommandSync as exec } from 'execa';
import { globbySync } from 'globby';
import { chProjectDir, copyPackageFiles, rmDist } from 'lion-system';
import * as fs from 'node:fs';

chProjectDir(import.meta.url);
rmDist();
exec('tsc -p tsconfig.build.json');
exec('tsc-alias -p tsconfig.build.json');
await copyPackageFiles();

// Verify that node_modules does not exist in templates
if (globbySync('src/templates/**/node_modules').length > 0) {
	throw new Error('node_modules folder detected in src/templates');
}

fs.cpSync('src/templates', 'dist/templates', { recursive: true });
