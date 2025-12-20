import { BrowserWindow } from "electron";
import { typedIpcMain } from "./ipcMain";
import { overlay } from "../overlayed";
import { OverlayedEventManager } from "../managers/overlayedEventManager";

export function initIpcElectron(): void {
	const logger = overlay.log.scope("ipcElectron");
	logger.info("Initializing ipcElectron");

	// Commands
	typedIpcMain.handle("closeWindow", (event) => {
		const window = BrowserWindow.fromWebContents(event.sender);
		window?.close();
	});

	typedIpcMain.handle("minimizeWindow", (event) => {
		const window = BrowserWindow.fromWebContents(event.sender);
		window?.minimize();
	});

	// Getters
	typedIpcMain.handle("getEvents", async () => {
		return OverlayedEventManager.getInstance().events;
	});

	typedIpcMain.handle("hasActiveGames", async () => {
		return overlay.hasAnyActiveGames();
	});

	typedIpcMain.handle("isConnectedToAnyGame", async () => {
		return overlay.windows.getActiveGameInfo().isConnected;
	});
}
