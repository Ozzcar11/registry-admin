export default axios => ({
  login ({ username, password }) {
    return axios.post('/login/', {
      username, password
    })
  },
  refreshToken (token) {
    return axios.post('/token/refresh/', {
      refresh: token
    }, {})
  },
  me () {
    return axios.get('/profile/')
  }
})
