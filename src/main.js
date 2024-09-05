import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import VueSweetAlert from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import moment from 'moment'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

moment.locale('id')

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueSweetAlert)
app.component('v-select', vSelect)

app.use(Vue3Toasity, {
  theme: 'dark',
  type: 'default',
  dangerouslyHTMLString: true,
})

app.config.globalProperties.$moment = moment
app.mount('#app')
