import { overlayed } from "@overlayed/app";
import * as Siege from "@overlayed/app/siege";
import electron from "electron";

export const overlay = overlayed({
	debug: true,
	silent: false,
	universal: true,
	applicationId: "01KC2QAEZ4FJW3M5W7W89CJK0V",
	electron: electron,
	modules: [Siege.module()],
	keybinds: {
		toggleMainWindow: {
			keys: ["AltLeft", "KeyX"],
			mode: "toggle",
		},
	},
});
