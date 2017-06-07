const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

router.get('/', (req, res) => {
  res.json({
    success: true,
    version: 0.1,
    message: 'Matcha API'
  })
})

// All paths
router.get('/users', middle('ADMIN'), require('../controllers/users.js'))
router.use('/user', require('./user.js'))

module.exports = router
