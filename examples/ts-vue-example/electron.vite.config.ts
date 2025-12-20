import { resolve } from "path";
import { defineConfig, type ElectronViteConfigExport } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => {
	// Needed so we use the overlayed electron.
	const overlayedElectron = await import("@overlayed/electron");
	process.env.ELECTRON_EXEC_PATH = overlayedElectron.default as string;

	return {
		renderer: {
			resolve: {
				alias: {
					"@renderer": resolve("src/renderer/src"),
				},
			},
			plugins: [vue(), tailwindcss()],
		},
		main: {
			build: {
				externalizeDeps: true,
				rollupOptions: {
					output: {
						format: "es",
						// Strangely preload need this.
						entryFileNames: "index.mjs",
					},
				},
			},
		},
		preload: {
			build: {
				rollupOptions: {
					output: {
						format: "cjs",
					},
				},
			},
		},
	} satisfies ElectronViteConfigExport;
});
