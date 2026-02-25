import { contextBridge } from "electron";
import { ipc } from "../main/ipc/ipcRenderer";

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("ipc", ipc);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (defined in dts)
	window.ipc = ipc;
}
