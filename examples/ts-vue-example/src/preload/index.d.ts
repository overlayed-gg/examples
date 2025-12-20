import { type IPC } from "../main/ipc/ipcRenderer";

declare global {
	interface Window {
		ipc: IPC;
	}
}
