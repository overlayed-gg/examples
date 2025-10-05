import { shell } from 'electron'
import { CoreWindow, CoreWindowOptions } from './core/coreWindow'

export class MainWindow extends CoreWindow {
  public constructor() {
    super('MainWindow')
  }

  public override create(options: CoreWindowOptions) {
    super.create(options)

    this.browserWindow?.on('ready-to-show', () => {
      this.browserWindow?.show()
    })

    this.browserWindow?.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }
}
