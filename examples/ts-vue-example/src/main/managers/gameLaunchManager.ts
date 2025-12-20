import { Manager } from "./manager";
import { AsSingleton } from "../utils/singleton";
import { overlay } from "../overlayed";
import type { GameCloseEvent, GameReadyEvent } from "@overlayed/app";
import { WindowsManager, type WindowClass } from "./windowsManager";
import { MainInGameWindow } from "../windows/mainInGameWindow";
import { OverlayedEventManager } from "./overlayedEventManager";
import type { UniversalGameEvent } from "@overlayed/app/universal";
import type { SiegeEvent } from "@overlayed/app/siege";
import { MainWindow } from "../windows/mainWindow";
import type { CoreWindow } from "../windows/core/coreWindow";

class GameLaunchManagerSingleton extends Manager {
	private readonly boundOnGameReady = this.onGameReady.bind(this);
	private readonly boundOnGameClose = this.onGameClose.bind(this);
	private readonly boundOnOverlayedEvent = this.onOverlayedEvent.bind(this);
	private readonly windowsManager = WindowsManager.getInstance();
	private readonly overlayedEventManager = OverlayedEventManager.getInstance();

	private readonly WINDOWS_NEEDING_EVENTS: Array<WindowClass<CoreWindow>> = [MainWindow, MainInGameWindow];

	public constructor() {
		super("GameLaunchManager");
	}

	public override init(): this {
		super.init();

		overlay.on("gameReady", this.boundOnGameReady);
		overlay.on("gameClose", this.boundOnGameClose);

		return this;
	}

	public override destroy(): void {
		this.overlayedEventManager.destroy();

		super.destroy();
	}

	private onGameReady(event: GameReadyEvent) {
		this.logger.info("Game ready", event);

		this.overlayedEventManager.on("event", this.boundOnOverlayedEvent);
		this.overlayedEventManager.init();

		if (!event.inGameRenderingSupported) {
			return;
		}

		this.windowsManager.getWindow(MainInGameWindow).create();
	}

	private onGameClose(event: GameCloseEvent) {
		this.logger.info("Game closed", event);

		this.overlayedEventManager.destroy();
		this.windowsManager.getWindow(MainInGameWindow).destroy();
	}

	private onOverlayedEvent(event: UniversalGameEvent | SiegeEvent) {
		this.WINDOWS_NEEDING_EVENTS.forEach((windowClass) => {
			const window = this.windowsManager.getWindow(windowClass);
			window.triggerCallback("onEvent", event);
		});
	}
}

export const GameLaunchManager = AsSingleton(GameLaunchManagerSingleton);
