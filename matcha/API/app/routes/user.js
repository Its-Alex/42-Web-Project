const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

// User public path
router.post('/signin', require('../controllers/user/signin.js'))
router.post('/signup', require('../controllers/user/signup.js'))

// Path who need auth user
router.get('/', middle('USER'), require('../controllers/user/get.js').user)
router.post('/update', middle('USER'), require('../controllers/user/update.js').user)

// Path who need auth admin
router.get('/:id', middle('ADMIN'), require('../controllers/user/get.js').admin)
router.post('/update/:id', middle('ADMIN'), require('../controllers/user/update.js').admin)

module.exports = router
