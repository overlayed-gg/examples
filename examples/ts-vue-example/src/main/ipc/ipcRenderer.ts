import { ipcRenderer } from "electron";
import type { UniversalGameEvent } from "@overlayed/app/universal";
import type { SiegeEvent } from "@overlayed/app/siege";

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
	hasActiveGames: (): Promise<boolean> => {
		return ipcRenderer.invoke("hasActiveGames");
	},
	isConnectedToAnyGame: (): Promise<boolean> => {
		return ipcRenderer.invoke("isConnectedToAnyGame");
	},
	getEvents: (): Promise<Array<UniversalGameEvent | SiegeEvent>> => {
		return ipcRenderer.invoke("getEvents");
	},

	// Callbacks
	onEvent: (callback: (event: UniversalGameEvent | SiegeEvent) => void) => {
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
