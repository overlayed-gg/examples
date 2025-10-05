import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'url'
import { electronApp } from '@electron-toolkit/utils'
import { MainWindow } from './windows/mainWindow'
import { InGameWindow } from './windows/core/inGameWindow'
import { overlay } from './overlayed'

const preloadPath = fileURLToPath(new URL('../preload/index.mjs', import.meta.url))

function setupWindows(): void {
  const mainWindow = new MainWindow()
  mainWindow.create({
    browserWindow: {
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: preloadPath,
        sandbox: false
      }
    }
  })

  overlay.on('gameReady', () => {
    const inGameWindow = new InGameWindow()
    inGameWindow.create({
      browserWindow: {
        width: 900,
        height: 670,
        autoHideMenuBar: true,
        webPreferences: {
          preload: preloadPath,
          sandbox: false
        }
      }
    })

    overlay.on('gameClose', () => {
      inGameWindow.destroy()
    })

    app.once('quit', () => {
      inGameWindow.destroy()
    })
  })

  app.once('quit', () => {
    mainWindow.destroy()
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  ipcMain.on('ping', () => console.log('pong'))

  setupWindows()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) setupWindows()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
