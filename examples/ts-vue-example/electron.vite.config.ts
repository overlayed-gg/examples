import { resolve } from 'path'
import { defineConfig, ElectronViteConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(async () => {
  // Needed so we use the overlayed electron.
  const overlayedElectron = await import('@overlayed/electron')
  process.env.ELECTRON_EXEC_PATH = overlayedElectron.default as string

  return {
    main: {
      plugins: [externalizeDepsPlugin()],
      build: {
        rollupOptions: {
          output: {
            format: 'es',
            // Strangely preload need this.
            entryFileNames: 'index.mjs'
          }
        }
      }
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      build: {
        rollupOptions: {
          output: {
            format: 'es'
          }
        }
      }
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [vue()]
    }
  } satisfies ElectronViteConfig
})
