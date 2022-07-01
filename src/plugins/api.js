import api from '../api/index'

export default {
  install (app, axios) {
    app.config.globalProperties.$api = api(axios)
  }
}
