const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

router.use(middle('USER'))

// Path who need auth user
router.get('/:id', require('../controllers/chat/get.js'))

module.exports = router
