import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import axios from './utils/axios'
import api from './plugins/api'

import './assets/scss/index.scss'

createApp(App)
  .use(router)
  .use(store)
  .use(api, axios)
  .mount('#app')
