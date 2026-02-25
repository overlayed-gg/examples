import { Manager } from "./manager";
import { CoreWindow } from "../windows/core/coreWindow";
import { BrowserWindow } from "electron";
import { AsSingleton } from "../utils/singleton";
import { InGameWindow } from "../windows/core/inGameWindow";

export type WindowClass<T extends CoreWindow = CoreWindow> = new () => T;

class WindowsManagerSingleton extends Manager {
	private _windows: Map<WindowClass, CoreWindow> = new Map();

	public constructor() {
		super("WindowsManager");
	}

	public getWindow<T extends CoreWindow>(windowClass: WindowClass<T>): T {
		const window = this._windows.get(windowClass);
		if (!window) {
			this.logger.log("Window not found, creating new instance", windowClass.name);
			const newWindow = new windowClass();
			this._windows.set(windowClass, newWindow);
			return newWindow;
		}

		return window as T;
	}

	public getWindows(): CoreWindow[] {
		return Array.from(this._windows.values());
	}

	public getInGameWindows(): InGameWindow[] {
		return this.getWindows().filter((window) => window instanceof InGameWindow);
	}

	public getUndestroyedWindows(): CoreWindow[] {
		return this.getWindows().filter((window) => !window.browserWindow?.isDestroyed());
	}

	public getWindowFromBrowserWindow(browserWindow: BrowserWindow): CoreWindow | undefined {
		return this.getWindows().find((window) => window.browserWindow === browserWindow);
	}
}

export const WindowsManager = AsSingleton(WindowsManagerSingleton);
