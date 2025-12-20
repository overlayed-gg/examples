import type { UniversalGameEvent } from "@overlayed/app/universal";
import { EventEmitterManager } from "./manager";
import type { SiegeEvent } from "@overlayed/app/siege";
import { overlay } from "../overlayed";
import { AsSingleton } from "../utils/singleton";

export interface OverlayedEventManagerEvents {
	event: [event: UniversalGameEvent | SiegeEvent];
}

class OverlayedEventManagerSingleton extends EventEmitterManager<OverlayedEventManagerEvents> {
	private readonly boundOnAnyUniversalEvent = this.onAnyUniversalEvent.bind(this);
	private readonly boundOnAnySiegeEvent = this.onAnySiegeEvent.bind(this);
	private _events: Array<UniversalGameEvent | SiegeEvent> = [];

	public get events() {
		return this._events;
	}

	public constructor() {
		super("OverlayedEventManager");
	}

	public override init(): this {
		super.init();

		overlay.universal.onAny(this.boundOnAnyUniversalEvent);
		overlay.siege.onAny(this.boundOnAnySiegeEvent);

		overlay.universal.readyForGameEvents();
		overlay.siege.readyForGameEvents();
		return this;
	}

	public override destroy(): void {
		overlay.universal.offAny(this.boundOnAnyUniversalEvent);
		overlay.siege.offAny(this.boundOnAnySiegeEvent);

		super.destroy();
	}

	public clearEvents(): void {
		this._events = [];
	}

	private onAnyUniversalEvent(event: UniversalGameEvent): void {
		this._events.push(event);
		this.emit("event", event);
		this.logger.debug("onAnyUniversalEvent", event);
	}

	private onAnySiegeEvent(event: SiegeEvent): void {
		this._events.push(event);
		this.emit("event", event);
		this.logger.debug("onAnySiegeEvent", event);
	}
}

export const OverlayedEventManager = AsSingleton(OverlayedEventManagerSingleton);
