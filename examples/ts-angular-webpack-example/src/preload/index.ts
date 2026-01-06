import { contextBridge } from "electron";

// Minimal preload - expose any APIs to renderer here
const api = {
	platform: process.platform,
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electronAPI", api);
	} catch (error) {
		console.error("Failed to expose API:", error);
	}
} else {
	(window as unknown as { electronAPI: typeof api }).electronAPI = api;
}

