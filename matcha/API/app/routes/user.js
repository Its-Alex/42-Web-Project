const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

// User public path
router.post('/signin', require('../controllers/user/signin.js'))
router.post('/signup', require('../controllers/user/signup.js'))

router.use(middle('USER'))

// Path who need auth admin
router.get('/:id', require('../controllers/user/get.js'))
router.patch('/:id', require('../controllers/user/update.js'))
router.delete('/:id', require('../controllers/user/get.js'))

module.exports = router
