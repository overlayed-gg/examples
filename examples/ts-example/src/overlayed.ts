import { overlayed } from "@overlayed/app";
import { Siege } from "@overlayed/app/siege";

export const overlay = overlayed({
	appName: "my-app",
	modules: [Siege.module()],
	keybinds: {
		toggleMainWindow: {
			keys: ["AltLeft", "KeyX"],
			mode: "toggle",
		},
	},
});
