import { shell } from "electron";
import { overlay } from "../overlayed";
import { CoreWindow, type CoreWindowOptions } from "./core/coreWindow";
import { deepMerge } from "../utils/deepMerge";
import type { UniversalGameEvent } from "@overlayed/app/universal";
import type { SiegeEvent } from "@overlayed/app/siege";

export class MainWindow extends CoreWindow {
	private readonly options: CoreWindowOptions = {
		browserWindow: {
			frame: false,
		},
	};

	private readonly boundOnAnyUniversalEvent = this.onAnyUniversalEvent.bind(this);
	private readonly boundOnAnySiegeEvent = this.onAnySiegeEvent.bind(this);

	public constructor() {
		super("MainWindow");
	}

	public override create(options: CoreWindowOptions) {
		super.create(deepMerge(this.options, options));
		this.subscribeToEvents();

		this.browserWindow?.on("ready-to-show", () => {
			this.browserWindow?.show();
		});

		this.browserWindow?.webContents.setWindowOpenHandler((details) => {
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
		this.sendChannelMessage("onEvent", event);
	}

	private onAnySiegeEvent(event: SiegeEvent) {
		this.sendChannelMessage("onEvent", event);
	}
}
