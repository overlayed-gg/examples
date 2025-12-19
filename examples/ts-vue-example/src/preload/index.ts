import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { ipc } from "../main/ipc/ipcRenderer";

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("ipc", ipc);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (defined in dts)
	window.electron = electronAPI;
	// @ts-ignore (defined in dts)
	window.ipc = ipc;
}
