const express = require('express')
const middle = require('../middlewares.js')
const router = express.Router()

router.get('/:token/:id', require('../controllers/picture/get.js'))
router.put('/:id', middle('USER'), require('../controllers/picture/post.js'))
router.delete('/:id', middle('USER'), require('../controllers/picture/delete.js'))

module.exports = router
