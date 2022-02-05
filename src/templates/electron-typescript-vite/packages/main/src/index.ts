import { app, BrowserWindow, shell } from 'electron';
import desm, { join } from 'desm';

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === 'development';

function main() {
	if (!isSingleInstance) {
		app.quit();
		return;
	}

	app.disableHardwareAcceleration();

	// Install "Vue.js devtools"
	if (isDevelopment) {
		app
			.whenReady()
			.then(async () => import('electron-devtools-installer'))
			// eslint-disable-next-line @typescript-eslint/naming-convention
			.then(async ({ default: installExtension, VUEJS_DEVTOOLS }) =>
				installExtension(VUEJS_DEVTOOLS, {
					loadExtensionOptions: {
						allowFileAccess: true,
					},
				} as any)
			)
			.catch((error) => {
				console.error('Failed install extension:', error);
			});
	}

	let mainWindow: BrowserWindow | null = null;

	const createWindow = async () => {
		mainWindow = new BrowserWindow({
			show: false, // Use 'ready-to-show' event to show window
			webPreferences: {
				nativeWindowOpen: true,
				preload: join(import.meta.url, '../../preload/dist/index.cjs'),
			},
		});

		/**
		 * If you install `show: true` then it can cause issues when trying to close the window.
		 * Use `show: false` and listener events `ready-to-show` to fix these issues.
		 *
		 * @see https://github.com/electron/electron/issues/25012
		 */
		mainWindow.on('ready-to-show', () => {
			mainWindow?.show();

			if (isDevelopment) {
				mainWindow?.webContents.openDevTools();
			}
		});

		/**
		 * URL for main window.
		 * Vite dev server for development.
		 * `file://../renderer/index.html` for production and test
		 */
		const pageUrl =
			isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
				? import.meta.env.VITE_DEV_SERVER_URL
				: new URL(
						'../renderer/dist/index.html',

						`file://${desm(import.meta.url)}`
				  ).toString();

		await mainWindow.loadURL(pageUrl);
	};

	app.on('web-contents-created', (_event, contents) => {
		/**
		 * Block navigation to origins not on the allowlist.
		 *
		 * Navigation is a common attack vector. If an attacker can convince the app to navigate away
		 * from its current page, they can possibly force the app to open web sites on the Internet.
		 *
		 * @see https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation
		 */
		contents.on('will-navigate', (event, url) => {
			const allowedOrigins: ReadonlySet<string> =
				new Set<`https://${string}`>(); // Do not use insecure protocols like HTTP. https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
			const { origin, hostname } = new URL(url);
			const isDevLocalhost = isDevelopment && hostname === 'localhost'; // Permit live reload of index.html
			if (!allowedOrigins.has(origin) && !isDevLocalhost) {
				console.warn('Blocked navigating to an unallowed origin:', origin);
				event.preventDefault();
			}
		});

		/**
		 * Hyperlinks to allowed sites open in the default browser.
		 *
		 * The creation of new `webContents` is a common attack vector. Attackers attempt to convince the app to create new windows,
		 * frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.
		 * You should deny any unexpected window creation.
		 *
		 * @see https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows
		 * @see https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-openexternal-with-untrusted-content
		 */
		contents.setWindowOpenHandler(({ url }) => {
			const allowedOrigins: ReadonlySet<string> = new Set<`https://${string}`>([
				// Do not use insecure protocols like HTTP. https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
				'https://vitejs.dev',
				'https://github.com',
				'https://v3.vuejs.org',
			]);
			const { origin } = new URL(url);
			if (allowedOrigins.has(origin)) {
				void shell.openExternal(url);
			} else {
				console.warn('Blocked the opening of an unallowed origin:', origin);
			}

			return { action: 'deny' };
		});
	});

	app.on('second-instance', () => {
		// Someone tried to run a second instance, we should focus our window.
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	app.on('window-all-closed', () => {
		// eslint-disable-next-line node/prefer-global/process
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app
		.whenReady()
		.then(createWindow)
		.catch((error) => {
			console.error('Failed create window:', error);
		});

	// Auto-updates
	if (import.meta.env.PROD) {
		app
			.whenReady()
			.then(async () => import('electron-updater'))
			.then(async ({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
			.catch((error) => {
				console.error('Failed check updates:', error);
			});
	}
}

main();
