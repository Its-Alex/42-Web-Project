const express = require('express')
const router = express.Router()

// User root
router.get('/', require('../controllers/user/get.js'))
router.post('/signin', require('../controllers/user/signin.js'))
router.post('/signup', require('../controllers/user/signup.js'))

module.exports = router
