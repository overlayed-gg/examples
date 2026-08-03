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
				externalizeDeps: {
					exclude: ["@overlayed/app"],
				},
				// Use rolldownOptions, not rollupOptions: Vite 8 translates user
				// rollupOptions to rolldownOptions and then ignores rollupOptions,
				// which drops electron-vite's default `external: ['electron']` and
				// inlines the CJS electron launcher stub into the ESM bundle
				// ("__dirname is not defined in ES module scope").
				rolldownOptions: {
					external: ["electron", /^electron\/.+/],
					output: {
						format: "es",
						// Strangely preload needs this.
						entryFileNames: "index.mjs",
					},
				},
			},
		},
		preload: {
			build: {
				rolldownOptions: {
					external: ["electron", /^electron\/.+/],
					output: {
						format: "cjs",
					},
				},
			},
		},
	} satisfies ElectronViteConfigExport;
});
