const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

// User public path
router.post('/signin', require('../controllers/user/signin.js'))
router.post('/signup', require('../controllers/user/signup.js'))

// Path who need auth admin
router.get('/:id', middle('USER'), require('../controllers/user/get.js'))
router.put('/:id', middle('USER'), () => {})
router.patch('/:id', middle('USER'), require('../controllers/user/update.js'))
router.delete('/:id', middle('USER'), require('../controllers/user/get.js'))

module.exports = router
