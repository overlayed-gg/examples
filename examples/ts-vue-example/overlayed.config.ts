import { defineConfig } from "@overlayed/app";

export default defineConfig({
	applicationId: "01KC2QAEZ4FJW3M5W7W89CJK0V",
	app: {
		include: ["./main/**/*", "./preload/**/*"],
	},
	site: {
		baseDir: "./out/renderer",
		include: ["**/*"],
	},
});
