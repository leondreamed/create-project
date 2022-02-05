#!/usr/bin/node

import { execSync } from 'node:child_process';
import electron from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import type { PackageJson } from 'type-fest';

function getVendors(): NodeJS.ProcessVersions {
	const output = execSync(
		`${electron as unknown as string} -p "JSON.stringify(process.versions)"`,
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			env: { ELECTRON_RUN_AS_NODE: '1' },
			encoding: 'utf-8',
		}
	);

	return JSON.parse(output) as NodeJS.ProcessVersions;
}

function formattedJSON(obj: Record<string, unknown>) {
	return `${JSON.stringify(obj, null, 2)}\n`;
}

try {
	const electronRelease = getVendors();

	const nodeMajorVersion = electronRelease.node.split('.')[0];
	const chromeMajorVersion =
		electronRelease.v8.split('.')[0]! + electronRelease.v8.split('.')[1]!;

	const packageJSONPath = path.resolve(process.cwd(), 'package.json');

	await Promise.all([
		fs.writeFile(
			'./electron-vendors.config.json',
			formattedJSON({
				chrome: chromeMajorVersion,
				node: nodeMajorVersion,
			})
		),

		fs
			.readFile(packageJSONPath)
			.then(
				(packageJSONBuffer) =>
					JSON.parse(packageJSONBuffer.toString()) as PackageJson
			)
			.then(async (packageJSON) => {
				if (!packageJSON || !Array.isArray(packageJSON.browserslist)) {
					throw new Error(`Can't find browserslist in ${packageJSONPath}`);
				}

				packageJSON.browserslist = [`Chrome ${chromeMajorVersion}`];

				return fs.writeFile(packageJSONPath, formattedJSON(packageJSON));
			}),
	]);
} catch (error: unknown) {
	console.error(error);
	process.exit(1);
}
