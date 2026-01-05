import { app } from "electron";
import { electronApp } from "@electron-toolkit/utils";
import { MainWindow } from "./windows/mainWindow";
import { initIpcElectron } from "./ipc/ipcElectron";
import { WindowsManager } from "./managers/windowsManager";
import { GameLaunchManager } from "./managers/gameLaunchManager";
import { assertNoProhibitedArgs } from "@overlayed/app/security";

if (import.meta.env.PROD) {
	assertNoProhibitedArgs();
}

function setupApp(): void {
	const windowsManager = WindowsManager.getInstance().init();
	const gameLaunchManager = GameLaunchManager.getInstance().init();

	const mainWindow = windowsManager.getWindow(MainWindow);
	mainWindow.create();

	app.once("quit", () => {
		mainWindow.destroy();
		windowsManager.destroy();
		gameLaunchManager.destroy();
	});
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId("com.electron");

	initIpcElectron();
	setupApp();
});

app.on("window-all-closed", () => {
	app.quit();
});
