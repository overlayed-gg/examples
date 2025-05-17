import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { overlayed } from "@overlayed/app";
import { Siege } from "@overlayed/app/siege";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const overlay = overlayed({
	appName: "my-app",
	modules: [Siege.module()],
	keybinds: {
		toggleMainWindow: {
			keys: ["AltLeft", "KeyX"],
			mode: "toggle",
		},
	},
});

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

	mainWindow.loadFile(path.join(__dirname, "index.html"));
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

class AppWindow {
	constructor() {
		this.renderWindow = null;
	}

	create(options) {
		this.renderWindow = overlay.windows.createWindow(options || {});
		this.registerKeybinds(this.renderWindow);

		this.renderWindow.loadURL("https://google.com");
	}

	destroy() {
		if (this.renderWindow) this.renderWindow.destroy();
	}

	registerKeybinds(renderWindow) {
		overlay.keybinds.toggleMainWindow.on("toggle", () => {
			if (renderWindow.isVisible()) {
				renderWindow.hide();
			} else {
				renderWindow.show();
			}
		});
	}
}
