import { InGameWindow } from "./core/inGameWindow";
import { overlay } from "../overlayed";
import type { CoreWindowOptions } from "./core/coreWindow";
import { fileURLToPath } from "url";
import { deepMerge } from "../utils/deepMerge";

const preloadPath = fileURLToPath(new URL("../preload/index.cjs", import.meta.url));
export class MainInGameWindow extends InGameWindow {
	private readonly options: CoreWindowOptions = {
		browserWindow: {
			show: true,
			frame: false,
			width: 900,
			height: 670,
			autoHideMenuBar: true,
			webPreferences: {
				preload: preloadPath,
			},
		},
	};

	public constructor() {
		super();
	}

	public override create(options?: CoreWindowOptions) {
		super.create(deepMerge(this.options, options ?? {}));
		this.registerKeybinds();

		if (import.meta.env.DEV) {
			this._browserWindow?.once("ready-to-show", () => {
				this._browserWindow?.webContents.openDevTools({
					mode: "detach",
					title: `Main In Game Window Developer Tools`,
				});
			});
		}
	}

	private registerKeybinds() {
		this.logger.info("Registering keybinds");
		overlay.keybinds.toggleMainWindow.on("toggle", () => {
			if (this._browserWindow?.isDestroyed()) {
				this.logger.warn("Browser window is destroyed, skipping keybind");
				return;
			}

			if (this._browserWindow?.isShown()) {
				this._browserWindow?.hide();
			} else {
				this._browserWindow?.show();
			}

			this.logger.info("Toggling in game window", this._browserWindow?.isShown());
		});
	}
}
