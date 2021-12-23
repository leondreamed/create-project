#!/usr/bin/node

import { execSync } from 'child_process';
import electron from 'electron';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

function getVendors(): NodeJS.ProcessVersions {
	const output = execSync(`${electron} -p "JSON.stringify(process.versions)"`, {
		env: { ELECTRON_RUN_AS_NODE: '1' },
		encoding: 'utf-8',
	});

	return JSON.parse(output);
}

function formattedJSON(obj: Record<string, unknown>) {
	return `${JSON.stringify(obj, null, 2)}\n`;
}

function updateVendors() {
	const electronRelease = getVendors();

	const nodeMajorVersion = electronRelease.node.split('.')[0];
	const chromeMajorVersion =
		electronRelease.v8.split('.')[0] + electronRelease.v8.split('.')[1];

	const packageJSONPath = path.resolve(process.cwd(), 'package.json');

	return Promise.all([
		writeFile(
			'./electron-vendors.config.json',
			formattedJSON({
				chrome: chromeMajorVersion,
				node: nodeMajorVersion,
			})
		),

		readFile(packageJSONPath)
			.then((packageJSONBuffer) => JSON.parse(packageJSONBuffer.toString()))
			.then((packageJSON) => {
				if (!packageJSON || !Array.isArray(packageJSON.browserslist)) {
					throw new Error(`Can't find browserslist in ${packageJSONPath}`);
				}

				packageJSON.browserslist = [`Chrome ${chromeMajorVersion}`];

				return writeFile(packageJSONPath, formattedJSON(packageJSON));
			}),
	]);
}

updateVendors().catch((error) => {
	console.error(error);
	process.exit(1);
});
