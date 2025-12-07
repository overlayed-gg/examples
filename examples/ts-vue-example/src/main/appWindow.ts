import { RenderWindow, RenderWindowConstructorOptions } from '@overlayed/app'
import { overlay } from './overlayed'

export class AppWindow {
  private renderWindow: RenderWindow | null

  constructor() {
    this.renderWindow = null
  }

  create(options?: RenderWindowConstructorOptions) {
    this.renderWindow = overlay.windows.createWindow(options || {})
    this.registerKeybinds(this.renderWindow)

    this.renderWindow.loadURL('https://google.com')
  }

  destroy() {
    if (this.renderWindow) this.renderWindow.destroy()
  }

  registerKeybinds(renderWindow: RenderWindow) {
    overlay.keybinds.toggleMainWindow.on('toggle', () => {
      if (renderWindow.isDestroyed()) {
        overlay.log.warn('Browser window is destroyed, skipping keybind')
        return
      }

      if (renderWindow.isVisible()) {
        renderWindow.hide()
      } else {
        renderWindow.show()
      }
    })
  }
}
