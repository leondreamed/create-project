import type { ChildProcessWithoutNullStreams } from 'node:child_process';
import { spawn } from 'node:child_process';
import electron from 'electron';
import process from 'node:process';
import type { Buffer } from 'node:buffer';
import type { OutputPlugin, RollupOutput, RollupWatcher } from 'rollup';
import type { InlineConfig, LogLevel, ViteDevServer } from 'vite';
import { build, createLogger, createServer } from 'vite';

const electronPath = electron;

process.env.MODE = process.env.MODE ?? 'development';
const mode = process.env.MODE;

const LOG_LEVEL: LogLevel = 'info';

const sharedConfig: InlineConfig = {
	mode,
	build: {
		watch: {},
	},
	logLevel: LOG_LEVEL,
};

/** Messages on stderr that match any of the contained patterns will be stripped from output */
const stderrFilterPatterns = [
	// Warning about devtools extension
	// https://github.com/cawa-93/vite-electron-builder/issues/492
	// https://github.com/MarshallOfSound/electron-devtools-installer/issues/143
	/ExtensionLoadWarning/,
];

type GetWatcherProps = {
	name: string;
	configFile: string;
	writeBundle: OutputPlugin['writeBundle'];
};
const getWatcher = async ({ name, configFile, writeBundle }: GetWatcherProps) =>
	build({
		...sharedConfig,
		configFile,
		plugins: [{ name, writeBundle }],
	}) as Promise<RollupWatcher>;

/**
 * Start or restart App when source files are changed
 */
const setupMainPackageWatcher = async (
	viteDevServer: ViteDevServer
): Promise<RollupOutput | RollupOutput[] | RollupWatcher> => {
	// Write a value to an environment variable to pass it to the main process.
	{
		const protocol = `http${viteDevServer.config.server.https ? 's' : ''}:`;
		const host = viteDevServer.config.server.host ?? 'localhost';
		const { port } = viteDevServer.config.server; // Vite searches for and occupies the first free port: 3000, 3001, 3002 and so on
		const path = '/';
		process.env.VITE_DEV_SERVER_URL = `${protocol}//${host.toString()}:${port.toString()}${path}`;
	}

	const logger = createLogger(LOG_LEVEL, {
		prefix: '[main]',
	});

	let spawnProcess: ChildProcessWithoutNullStreams | null = null;

	return getWatcher({
		name: 'reload-app-on-main-package-change',
		configFile: 'packages/main/vite.config.ts',
		writeBundle() {
			if (spawnProcess !== null) {
				spawnProcess.kill('SIGINT');
				spawnProcess = null;
			}

			spawnProcess = spawn(String(electronPath), ['.']);

			spawnProcess.stdout.on('data', (data: Buffer) => {
				const dString = data.toString();
				if (dString.trim() !== '') {
					logger.warn(dString, { timestamp: true });
				}
			});
			spawnProcess.stderr.on('data', (data: Buffer) => {
				const dataString = data.toString().trim();
				if (dataString === '') return;
				const mayIgnore = stderrFilterPatterns.some((r) => r.test(dataString));
				if (mayIgnore) return;
				logger.error(dataString, { timestamp: true });
			});
		},
	});
};

/**
 * Start or restart App when source files are changed
 */
const setupPreloadPackageWatcher = async (
	viteDevServer: ViteDevServer
): Promise<RollupOutput | RollupOutput[] | RollupWatcher> =>
	getWatcher({
		name: 'reload-page-on-preload-package-change',
		configFile: 'packages/preload/vite.config.ts',
		writeBundle() {
			viteDevServer.ws.send({
				type: 'full-reload',
			});
		},
	});

try {
	const viteDevServer = await createServer({
		...sharedConfig,
		configFile: 'packages/renderer/vite.config.ts',
	});

	await viteDevServer.listen();

	await setupPreloadPackageWatcher(viteDevServer);
	await setupMainPackageWatcher(viteDevServer);
} catch (error: unknown) {
	console.error(error);
	process.exit(1);
}
