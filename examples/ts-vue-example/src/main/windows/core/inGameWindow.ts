import { RenderWindow, RenderWindowConstructorOptions } from '@overlayed/app'
import { CoreWindow, CoreWindowOptions } from './coreWindow'
import { overlay } from '../../overlayed'
import { deepMerge } from '../../utils/deepMerge'
import { BrowserWindow } from 'electron'

const IN_GAME_WINDOW_OPTIONS: CoreWindowOptions = {
  browserWindow: {
    show: false,
    webPreferences: {
      offscreen: true
    }
  }
}

export class InGameWindow extends CoreWindow {
  public browserWindow: RenderWindow | null = null

  constructor() {
    super('InGameWindow')
  }

  public override create(options: CoreWindowOptions) {
    super.create(deepMerge(IN_GAME_WINDOW_OPTIONS, options))
    this.registerKeybinds()
  }

  protected override getNewBrowserWindow(options: RenderWindowConstructorOptions) {
    return overlay.windows.createInGameWindow(options)
  }

  private registerKeybinds() {
    this.logger.info('Registering keybinds')
    overlay.keybinds.toggleMainWindow.on('toggle', () => {
      if (this.browserWindow.isDestroyed()) {
        this.logger.warn('Browser window is destroyed, skipping keybind')
        return
      }

      this.logger.info('Toggling in game window', this.browserWindow?.isShown())

      if (this.browserWindow?.isShown()) {
        this.browserWindow?.hide()
      } else {
        this.browserWindow?.show()
      }
    })
  }
}
