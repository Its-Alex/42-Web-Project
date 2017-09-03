const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

router.use(middle('USER'))

// Path who need auth user
router.get('/:id', require('../controllers/profile/get.js'))
router.post('/', require('../controllers/profile/create.js'))
router.patch('/', require('../controllers/profile/update.js'))
// router.delete('/:id', require('../controllers/profile/get.js'))

module.exports = router
