#!/usr/bin/env node

import path from 'node:path';
import { build } from 'vite';

/** @type 'production' | 'development' */
process.env.MODE = process.env.MODE || 'production';
const mode = process.env.MODE;

const packagesConfigs = [
	'packages/main/vite.config.ts',
	'packages/preload/vite.config.ts',
	'packages/renderer/vite.config.ts',
];

/**
 * Run `vite build` for config file
 */
const buildByConfig = (configFile: string) => build({ configFile, mode });
void (async () => {
	try {
		const totalTimeLabel = 'Total bundling time';
		console.time(totalTimeLabel);

		for (const packageConfigPath of packagesConfigs) {
			const consoleGroupName = `${path.dirname(packageConfigPath)}/`;
			console.group(consoleGroupName);

			const timeLabel = 'Bundling time';
			console.time(timeLabel);

			await buildByConfig(packageConfigPath);

			console.timeEnd(timeLabel);
			console.groupEnd();
			console.log('\n'); // Just for pretty print
		}
		console.timeEnd(totalTimeLabel);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
