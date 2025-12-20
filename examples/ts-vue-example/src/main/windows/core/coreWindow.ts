import { BrowserWindow, type BrowserWindowConstructorOptions } from "electron";
import { overlay } from "../../overlayed";
import { is } from "@electron-toolkit/utils";
import type { LoggerScope, RenderWindow } from "@overlayed/app";
import { type IPCCallbackParameters, type IPCCallbacks } from "../../ipc/ipcRenderer";

export interface CoreWindowOptions {
	/**
	 * The path to load in the browser window
	 * @default '/'
	 */
	path?: `/${string}`;

	browserWindow?: BrowserWindowConstructorOptions;
}

export abstract class CoreWindow<TWindow extends BrowserWindow | RenderWindow = BrowserWindow> {
	protected logger: LoggerScope;
	protected _browserWindow: TWindow | null = null;

	public get browserWindow(): TWindow | null {
		return this._browserWindow;
	}

	public constructor(name: string) {
		this.logger = overlay.log.scope(name);
	}

	public create(options: CoreWindowOptions) {
		this.logger.info("Creating window");
		this._browserWindow = this.getNewBrowserWindow(options.browserWindow);

		const url = this.getBrowserWindowUrl(options);
		this._browserWindow?.loadURL(url.toString());
	}

	public destroy() {
		this.logger.info("Destroying window");
		this._browserWindow?.destroy();
	}

	public triggerCallback<T extends keyof IPCCallbacks>(name: T, ...args: IPCCallbackParameters<T>) {
		this._browserWindow?.webContents.send(name, ...args);
	}

	protected getNewBrowserWindow(options?: BrowserWindowConstructorOptions): TWindow {
		return overlay.windows.createWindow(options ?? {}) as TWindow;
	}

	private getBrowserWindowUrl(options: CoreWindowOptions) {
		const { path = "/" } = options;

		let urlToLoad = `https://your-site.overlayedapps.com`;
		if (is.dev) {
			if (!process.env.ELECTRON_RENDERER_URL) {
				throw new Error("ELECTRON_RENDERER_URL is not set in dev");
			}

			urlToLoad = process.env.ELECTRON_RENDERER_URL;
		}

		return new URL(`${urlToLoad}${path}`);
	}
}
