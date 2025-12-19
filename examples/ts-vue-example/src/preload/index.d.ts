import { ElectronAPI } from "@electron-toolkit/preload";
import { type IPC } from "../main/ipc/ipcRenderer";

declare global {
	interface Window {
		electron: ElectronAPI;
		ipc: IPC;
	}
}
