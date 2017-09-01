const express = require('express')
const middle = require('../middlewares.js')
const router = express.Router()

router.use(middle('USER'))

router.get('/', require('../controllers/notification/getCount.js'))
router.post('/', require('../controllers/notification/create.js'))

module.exports = router
