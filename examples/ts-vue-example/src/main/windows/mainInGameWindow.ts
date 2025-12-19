import { InGameWindow } from "./core/inGameWindow";
import { overlay } from "../overlayed";
import type { CoreWindowOptions } from "./core/coreWindow";
import type { UniversalGameEvent } from "@overlayed/app/universal";
import type { SiegeEvent } from "@overlayed/app/siege";
export class MainInGameWindow extends InGameWindow {
	private readonly boundOnAnyUniversalEvent = this.onAnyUniversalEvent.bind(this);
	private readonly boundOnAnySiegeEvent = this.onAnySiegeEvent.bind(this);

	public constructor() {
		super();
	}

	public override create(options: CoreWindowOptions) {
		super.create(options);
		this.subscribeToEvents();

		this.browserWindow?.once("ready-to-show", () => {
			this.browserWindow?.webContents.openDevTools({
				mode: "detach",
				title: `Main In Game Window Developer Tools`,
			});
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
