import { overlayed } from "@overlayed/app";
import electron from "electron";

export const overlay = overlayed({
  applicationId: process.env.VITE_APPLICATION_ID,
  universal: true,
  debug: true,
  silent: false,
  electron: electron,
  modules: [],
  keybinds: {
    toggleMainWindow: {
      keys: ["AltLeft", "KeyX"],
      mode: "toggle",
    },
  },
});
