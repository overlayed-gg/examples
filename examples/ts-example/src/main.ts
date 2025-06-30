import { app, BrowserWindow } from "electron";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { overlay } from "./overlayed";
import { AppWindow } from "./appWindow";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	const appWindow = new AppWindow();
	overlay.on("gameReady", () => appWindow.create());
	overlay.on("gameClose", () => appWindow.destroy());

	overlay.siege.on("player_joined", (event) => {
		console.log(event);
	});

	mainWindow.loadFile(path.join(__dirname, "..", "index.html"));
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
