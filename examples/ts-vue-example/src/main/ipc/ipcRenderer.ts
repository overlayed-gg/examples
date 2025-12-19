import { ipcRenderer } from "electron";

type AnyFunction = (...args: any[]) => any;

export const ipc = {
	// Commands
	closeWindow: () => {
		ipcRenderer.invoke("closeWindow");
	},
	minimizeWindow: () => {
		ipcRenderer.invoke("minimizeWindow");
	},

	// Getters
	hasActiveGames: () => {
		return ipcRenderer.invoke("hasActiveGames");
	},

	// Callbacks
	onEvent: (callback: (event: unknown) => void) => {
		ipcRenderer.on("onEvent", (__, payload) => {
			callback(payload);
		});
	},
} as const satisfies Record<string, AnyFunction>;

export type IPC = typeof ipc;
export type IPCCallbacks = {
	[key in keyof IPC as key extends `on${string}` ? key : never]: IPC[key];
};

export type IPCCallbackParameters<T extends keyof IPCCallbacks> = Parameters<Parameters<IPCCallbacks[T]>[0]>;
