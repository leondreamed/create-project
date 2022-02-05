import path from 'node:path';
import process from 'node:process';
import { build } from 'vite';

process.env.MODE = process.env.MODE ?? 'production';
const mode = process.env.MODE;

const packagesConfigs = [
	'packages/main/vite.config.ts',
	'packages/preload/vite.config.ts',
	'packages/renderer/vite.config.ts',
];

/**
 * Run `vite build` for config file
 */
const buildByConfig = async (configFile: string) => build({ configFile, mode });
try {
	const totalTimeLabel = 'Total bundling time';
	console.time(totalTimeLabel);

	for (const packageConfigPath of packagesConfigs) {
		const consoleGroupName = `${path.dirname(packageConfigPath)}/`;
		console.group(consoleGroupName);

		const timeLabel = 'Bundling time';
		console.time(timeLabel);

		// eslint-disable-next-line no-await-in-loop
		await buildByConfig(packageConfigPath);

		console.timeEnd(timeLabel);
		console.groupEnd();
		console.info('\n'); // Just for pretty print
	}

	console.timeEnd(totalTimeLabel);
} catch (error: unknown) {
	console.error(error);
	process.exit(1);
}
