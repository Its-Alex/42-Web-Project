const express = require('express')
const router = express.Router()

// User root
router.get('/:id', require('../controllers/user/get.js'))
router.post('/signin', require('../controllers/user/signin.js'))
router.post('/signup', require('../controllers/user/signup.js'))
router.post('/update/:id', require('../controllers/user/update.js'))

module.exports = router
