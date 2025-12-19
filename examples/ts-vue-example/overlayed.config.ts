import { defineConfig } from "@overlayed/app";

export default defineConfig({
	applicationId: "example-app",
	app: {
		include: ["./main/**/*", "./preload/**/*"],
	},
	site: {
		baseDir: "./out/renderer",
		include: ["**/*"],
	},
});
