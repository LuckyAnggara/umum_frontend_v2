import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import Vue3Toasity from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'

import VueSweetAlert from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(router)
app.use(VueSweetAlert)

app.use(Vue3Toasity, {
  theme: 'dark',
  type: 'default',
  dangerouslyHTMLString: true,
})

app.mount('#app')
