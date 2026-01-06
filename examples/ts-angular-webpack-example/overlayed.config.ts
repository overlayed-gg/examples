import "dotenv/config";
import { defineConfig } from "@overlayed/app";

if (!process.env.VITE_APPLICATION_ID) {
  throw new Error("VITE_APPLICATION_ID is not set");
}

export default defineConfig({
  applicationId: process.env.VITE_APPLICATION_ID,
  app: {
    include: ["./dist/main/**/*", "./dist/preload/**/*"],
  },
  site: {
    baseDir: "./dist/renderer/browser",
    include: ["**/*"],
  },
});
