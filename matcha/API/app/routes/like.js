const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

router.use(middle('USER'))

// Path who need auth user
router.get('/:id', require('../controllers/like/get.js'))
router.post('/:id', require('../controllers/like/create.js'))
router.delete('/:id', require('../controllers/like/delete.js'))

module.exports = router
