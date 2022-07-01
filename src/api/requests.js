export default axios => ({
  list () {
    return axios.get('/applications_admin/')
  },
  one (id) {
    return axios.get(`/applications/${id}/`)
  },
  rejectedList () {
    return axios.get('/applications/rejected/')
  },
  acceptedList () {
    return axios.get('/applications/confirm/')
  },
  acceptedCompany (id) {
    return axios.get(`/applications/${id}/`)
  },
  reject (id, comment) {
    return axios.put(`/applications/${id}/`, {
      status: 2,
      rejection_cause: comment
    })
  },
  confirm (id) {
    return axios.put(`/applications/${id}/`, {
      status: 1
    })
  }
})
