import { shell } from "electron";
import { CoreWindow, type CoreWindowOptions } from "./core/coreWindow";
import { deepMerge } from "../utils/deepMerge";
import { fileURLToPath } from "url";

const preloadPath = fileURLToPath(new URL("../preload/index.cjs", import.meta.url));

export class MainWindow extends CoreWindow {
	private readonly options: CoreWindowOptions = {
		browserWindow: {
			frame: false,
			width: 900,
			height: 670,
			show: false,
			autoHideMenuBar: true,
			webPreferences: {
				preload: preloadPath,
			},
		},
	};

	public constructor() {
		super("MainWindow");
	}

	public override create(options?: CoreWindowOptions) {
		super.create(deepMerge(this.options, options ?? {}));

		this._browserWindow?.on("ready-to-show", () => {
			this._browserWindow?.show();
		});

		this._browserWindow?.webContents.setWindowOpenHandler((details) => {
			shell.openExternal(details.url);
			return { action: "deny" };
		});
	}

	public override destroy() {
		super.destroy();
	}
}
