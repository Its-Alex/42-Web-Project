const axios = require('axios')

module.exports = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 2000,
  headers: {'Authorization': `Bearer ${global.localStorage.getItem('Token')}`}
})
