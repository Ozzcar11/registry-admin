import apiFunc from '@/api'
import axios from '@/utils/axios'
import router from '@/router'

const api = apiFunc(axios)

export default {
  namespaced: true,
  state: {
    refresh_token: '',
    access_token: '',
    loggedInUser: {},
    isAuthenticated: false
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    isAuthenticated: state => state.isAuthenticated,
    accessToken: state => state.access_token,
    refreshToken: state => state.refresh_token
  },
  mutations: {
    setRefreshToken: function (state, refreshToken) {
      state.refresh_token = refreshToken
    },
    setAccessToken: function (state, accessToken) {
      state.access_token = accessToken
    },
    // sets state with user information and toggles
    // isAuthenticated from false to true
    setLoggedInUser: function (state, user) {
      state.loggedInUser = user
      state.isAuthenticated = true
    },
    // delete all auth and user information from the state
    clearUserData: function (state) {
      state.refresh_token = ''
      state.access_token = ''
      state.loggedInUser = {}
      state.isAuthenticated = false
    }
  },
  actions: {
    async logIn ({ commit, dispatch }, payload) {
      const response = await api.auth.login(payload)
      console.log(response)
      if (response.status === 200) {
        commit('setRefreshToken', response.data.refresh)
        commit('setAccessToken', response.data.access)
        dispatch('fetchUser')
        router.push('/')
      }
    },
    logout ({ commit }) {
      commit('clearUserData')
      router.push('/')
    },
    async refreshToken ({ state, commit }) {
      try {
        const response = await api.auth.refreshToken(state.refresh_token)

        if (response.status === 200) {
          commit('setAccessToken', response.data.access)
        }
      } catch (e) {
        console.log(e.response)
      }
    },
    async fetchUser ({ commit }) {
      try {
        const response = await api.auth.me()
        const data = response?.data ?? {}
        console.log(data)

        const body = {
          name: data.name
        }

        commit('setLoggedInUser', body)
      } catch (e) {
        console.log(e.response)
      }
    }
  }
}
