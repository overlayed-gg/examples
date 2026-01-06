import "dotenv/config";
import { app, BrowserWindow } from "electron";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { overlay } from "./overlayed.js";
import { assertNoProhibitedArgs } from "@overlayed/app/security";
import type { RenderWindow } from "@overlayed/app";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;
const preloadPath = path.join(__dirname, "..", "preload", "index.cjs");

// In production, enable security checks
if (!isDev) {
  assertNoProhibitedArgs();
}

let mainWindow: BrowserWindow | null = null;
let inGameWindow: RenderWindow | null = null;

function getRendererUrl(): string {
  // In dev, Angular serves on port 4200
  if (isDev) {
    return "http://localhost:4200";
  }
  // In prod, load from dist
  return `file://${path.join(__dirname, "..", "renderer", "browser", "index.html")}`;
}

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(getRendererUrl());

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createInGameWindow(): void {
  inGameWindow = overlay.windows.createInGameWindow({
    width: 900,
    height: 670,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  inGameWindow.loadURL(getRendererUrl());

  // Register keybind to toggle in-game window
  overlay.keybinds.toggleMainWindow.on("toggle", () => {
    console.log("toggle in game window");
    if (!inGameWindow || inGameWindow.isDestroyed()) {
      overlay.log.warn("In-game window is destroyed, skipping keybind");
      return;
    }

    if (inGameWindow.isShown()) {
      inGameWindow.hide();
    } else {
      inGameWindow.show();
    }
  });
}

function destroyInGameWindow(): void {
  if (inGameWindow && !inGameWindow.isDestroyed()) {
    inGameWindow.destroy();
    inGameWindow = null;
  }
}

app.whenReady().then(() => {
  createMainWindow();

  // Create in-game window when game is ready
  overlay.on("gameReady", () => {
    overlay.log.info("Game ready, creating in-game window");
    createInGameWindow();
  });

  // Destroy in-game window when game closes
  overlay.on("gameClose", () => {
    overlay.log.info("Game closed, destroying in-game window");
    destroyInGameWindow();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
