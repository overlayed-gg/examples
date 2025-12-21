import { overlayed } from "@overlayed/app";
import * as Siege from "@overlayed/app/siege";
import electron from "electron";

export const overlay = overlayed({
	applicationId: import.meta.env.VITE_APPLICATION_ID,
	universal: true,
	electron: electron,
	modules: [Siege.module()],
	keybinds: {
		toggleMainWindow: {
			keys: ["AltLeft", "KeyX"],
			mode: "toggle",
		},
	},
});
