import { RenderWindow, RenderWindowConstructorOptions } from "@overlayed/app";
import { CoreWindow, type CoreWindowOptions } from "./coreWindow";
import { overlay } from "../../overlayed";
import { deepMerge } from "../../utils/deepMerge";

export class InGameWindow extends CoreWindow<RenderWindow> {
	private readonly options: CoreWindowOptions = {
		browserWindow: {
			show: false,
			frame: false,
			webPreferences: {
				offscreen: true,
			},
		},
	};

	constructor() {
		super("InGameWindow");
	}

	public override create(options: CoreWindowOptions) {
		super.create(deepMerge(this.options, options));
		this.registerKeybinds();
	}

	protected override getNewBrowserWindow(options: RenderWindowConstructorOptions) {
		return overlay.windows.createInGameWindow(options);
	}

	private registerKeybinds() {
		this.logger.info("Registering keybinds");
		overlay.keybinds.toggleMainWindow.on("toggle", () => {
			if (this.browserWindow?.isDestroyed()) {
				this.logger.warn("Browser window is destroyed, skipping keybind");
				return;
			}

			this.logger.info("Toggling in game window", this.browserWindow?.isShown());

			if (this.browserWindow?.isShown()) {
				this.browserWindow?.hide();
			} else {
				this.browserWindow?.show();
			}
		});
	}
}
