import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { electronApp } from "@electron-toolkit/utils";
import { MainWindow } from "./windows/mainWindow";
import { InGameWindow } from "./windows/core/inGameWindow";
import { overlay } from "./overlayed";
import { initIpcElectron } from "./ipc/ipcElectron";
import { MainInGameWindow } from "./windows/mainInGameWindow";

const preloadPath = fileURLToPath(new URL("../preload/index.mjs", import.meta.url));

function setupWindows(): void {
	const mainWindow = new MainWindow();
	mainWindow.create({
		browserWindow: {
			width: 900,
			height: 670,
			show: false,
			autoHideMenuBar: true,
			webPreferences: {
				preload: preloadPath,
				sandbox: false,
			},
		},
	});

	let mainInGameWindowCreated = false;
	overlay.on("gameReady", ({ inGameRenderingSupported }) => {
		if (!inGameRenderingSupported) {
			return;
		}

		if (mainInGameWindowCreated) {
			return;
		}

		const inGameWindow = new MainInGameWindow();
		inGameWindow.create({
			browserWindow: {
				width: 900,
				height: 670,
				autoHideMenuBar: true,
				webPreferences: {
					preload: preloadPath,
					sandbox: false,
				},
			},
		});

		mainInGameWindowCreated = true;

		overlay.on("gameClose", () => {
			inGameWindow.destroy();
		});

		app.once("quit", () => {
			inGameWindow.destroy();
		});
	});

	app.once("quit", () => {
		mainWindow.destroy();
	});
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId("com.electron");

	initIpcElectron();
	setupWindows();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			setupWindows();
		}
	});
});

app.on("window-all-closed", () => {
	app.quit();
});
