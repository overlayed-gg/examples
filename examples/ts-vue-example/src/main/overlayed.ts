import { overlayed } from '@overlayed/app'
import * as Siege from '@overlayed/app/siege'
import electron from 'electron'

export const overlay = overlayed({
  applicationId: 'sample-app',
  electron: electron,
  modules: [Siege.module()],
  keybinds: {
    toggleMainWindow: {
      keys: ['AltLeft', 'KeyX'],
      mode: 'toggle'
    }
  }
})
