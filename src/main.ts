import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// query client
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(router).use(VueQueryPlugin).mount('#app')
