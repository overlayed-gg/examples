import { BrowserWindow } from "electron";
import { typedIpcMain } from "./ipcMain";
import { overlay } from "../overlayed";

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

	// Callbacks
	typedIpcMain.handle("hasActiveGames", async () => {
		return overlay.hasAnyActiveGames();
	});
}
