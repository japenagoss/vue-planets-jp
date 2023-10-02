/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'

// Store
import store from '@/store'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App): void {
  app.use(vuetify)
  app.use(router)
  app.use(store)
}
