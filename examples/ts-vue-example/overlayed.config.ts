import { defineConfig } from "@overlayed/app";
import "dotenv/config";

if (!process.env.VITE_APPLICATION_ID) {
	throw new Error("VITE_APPLICATION_ID is not set");
}

export default defineConfig({
	applicationId: process.env.VITE_APPLICATION_ID,
	app: {
		include: ["./out/main/**/*", "./out/preload/**/*"],
	},
	site: {
		baseDir: "./out/renderer",
		include: ["**/*"],
	},
});
