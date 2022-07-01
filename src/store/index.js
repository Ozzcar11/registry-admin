import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'

export default createStore({
  plugins: [createPersistedState({
    paths: ['auth']
  })],
  modules: {
    auth
  }
})
