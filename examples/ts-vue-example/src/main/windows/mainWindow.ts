import { shell } from "electron";
import { overlay } from "../overlayed";
import { CoreWindow, type CoreWindowOptions } from "./core/coreWindow";
import { deepMerge } from "../utils/deepMerge";
import type { UniversalGameEvent } from "@overlayed/app/universal";
import type { SiegeEvent } from "@overlayed/app/siege";
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

	private readonly boundOnAnyUniversalEvent = this.onAnyUniversalEvent.bind(this);
	private readonly boundOnAnySiegeEvent = this.onAnySiegeEvent.bind(this);

	public constructor() {
		super("MainWindow");
	}

	public override create(options?: CoreWindowOptions) {
		super.create(deepMerge(this.options, options ?? {}));
		this.subscribeToEvents();

		this._browserWindow?.on("ready-to-show", () => {
			this._browserWindow?.show();

			overlay.universal.readyForGameEvents();
			overlay.siege.readyForGameEvents();
		});

		this._browserWindow?.webContents.setWindowOpenHandler((details) => {
			shell.openExternal(details.url);
			return { action: "deny" };
		});
	}

	public override destroy() {
		this.unsubscribeFromEvents();
		super.destroy();
	}

	private subscribeToEvents() {
		this.logger.info("Subscribing to events");
		overlay.universal.onAny(this.boundOnAnyUniversalEvent);
		overlay.siege.onAny(this.boundOnAnySiegeEvent);
	}

	private unsubscribeFromEvents() {
		this.logger.info("Unsubscribing from events");
		overlay.universal.offAny(this.boundOnAnyUniversalEvent);
		overlay.siege.offAny(this.boundOnAnySiegeEvent);
	}

	private onAnyUniversalEvent(event: UniversalGameEvent) {
		this.triggerCallback("onEvent", event);
		this.logger.log("Universal event");
	}

	private onAnySiegeEvent(event: SiegeEvent) {
		this.triggerCallback("onEvent", event);
		this.logger.log("Siege event");
	}
}
