// This is the entry point of the app — it wires everything together.

import { createApp } from 'vue'        // Core Vue — creates the app instance
import { createPinia } from 'pinia'    // Pinia — state management (our todo store)
import { createVuetify } from 'vuetify' // Vuetify — UI component library
import 'vuetify/styles'                 // Vuetify's base CSS (layout, colors, etc.)
import '@mdi/font/css/materialdesignicons.css' // Material Design Icons (mdi-pencil, mdi-delete, etc.)
import App from './App.vue'             // Our root component

// Create plugin instances
const pinia = createPinia()
const vuetify = createVuetify()

// Build the app:
// 1. createApp(App) — creates a Vue app with App.vue as the root component
// 2. .use(pinia)    — registers Pinia so useTodoStore() works in any component
// 3. .use(vuetify)  — registers Vuetify so <v-btn>, <v-card>, etc. work everywhere
// 4. .mount('#app') — renders into the <div id="app"> in index.html
createApp(App).use(pinia).use(vuetify).mount('#app')
