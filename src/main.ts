import { createApp, ref } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import "@a/css/g.css"

const app = createApp(App)
app.provide("ShowSwitchAnimation", {})
app.use(router)
app.mount('body')