const axios = require('axios')

module.exports = () => {
  return axios.create({
    baseURL: 'http://localhost:3005/',
    timeout: 2000,
    headers: {'Authorization': `Bearer ${global.localStorage.getItem('Token')}`}
  })
}
