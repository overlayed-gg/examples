import { overlayed } from "@overlayed/app";
import * as Siege from "@overlayed/app/siege";
import electron from "electron";

export const overlay = overlayed({
	universal: true,
	debug: true,
	silent: false,
	applicationId: import.meta.env.VITE_APPLICATION_ID,
	electron: electron,
	modules: [Siege.module()],
	keybinds: {
		toggleMainWindow: {
			keys: ["AltLeft", "KeyX"],
			mode: "toggle",
		},
	},
});
