import type { IPC } from "./ipcRenderer";
import { type IpcMainInvokeEvent, ipcMain } from "electron";

type IpcMain = NodeJS.EventEmitter & {
	handle<TChannel extends keyof IPC>(
		channel: TChannel,
		listener: (event: IpcMainInvokeEvent, ...args: Parameters<IPC[TChannel]>) => ReturnType<IPC[TChannel]>,
	): void;

	handleOnce<TChannel extends keyof IPC>(
		channel: TChannel,
		listener: (event: IpcMainInvokeEvent, ...args: Parameters<IPC[TChannel]>) => ReturnType<IPC[TChannel]>,
	): void;
};

const typedIpcMain = ipcMain as unknown as IpcMain;
export { typedIpcMain };
