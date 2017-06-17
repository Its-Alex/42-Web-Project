const express = require('express')
const router = express.Router()
const geoip = require('geoip-lite')
const middle = require('../middlewares.js')

router.get('/', (req, res) => {
  res.json({
    success: true,
    version: 0.1,
    message: 'Matcha API'
  })
})

router.get('/geoloc', middle('USER'), (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(ip)
  res.status(200)
  res.send()
})

// All paths
router.get('/users', middle('ADMIN'), require('../controllers/users.js'))
router.use('/user', require('./user.js'))
router.use('/profil', require('./profil.js'))

module.exports = router
