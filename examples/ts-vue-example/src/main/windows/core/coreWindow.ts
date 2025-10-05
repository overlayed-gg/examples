import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { overlay } from '../../overlayed'
import { is } from '@electron-toolkit/utils'
import { LoggerScope } from '@overlayed/app'

export interface CoreWindowOptions {
  /**
   * The path to load in the browser window
   * @default '/'
   */
  path?: `/${string}`

  browserWindow?: BrowserWindowConstructorOptions
}

export class CoreWindow {
  protected logger: LoggerScope
  public browserWindow: BrowserWindow | null = null

  public constructor(name: string) {
    this.logger = overlay.log.scope(name)
  }

  public create(options: CoreWindowOptions) {
    this.logger.info('Creating window')
    this.browserWindow = this.getNewBrowserWindow(options.browserWindow)

    const url = this.getBrowserWindowUrl(options)
    this.browserWindow.loadURL(url.toString())
  }

  public destroy() {
    this.logger.info('Destroying window')
    this.browserWindow?.destroy()
  }

  protected getNewBrowserWindow(options?: BrowserWindowConstructorOptions) {
    return overlay.windows.createWindow(options ?? {})
  }

  private getBrowserWindowUrl(options: CoreWindowOptions) {
    const { path = '/' } = options

    let urlToLoad = `https://your-site.overlayedapps.com`
    if (is.dev) {
      if (!process.env.ELECTRON_RENDERER_URL) {
        throw new Error('ELECTRON_RENDERER_URL is not set in dev')
      }

      urlToLoad = process.env.ELECTRON_RENDERER_URL
    }

    return new URL(`${urlToLoad}${path}`)
  }
}
