import auth from './auth'
import requests from './requests'

export default (axios) => ({
  auth: auth(axios),
  requests: requests(axios)
})
