const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')

router.use(middle('USER'))

// Path who need auth admin
router.get('/:id', require('../controllers/profil/get.js'))
// router.patch('/:id', require('../controllers/profil/update.js'))
// router.delete('/:id', require('../controllers/profil/get.js'))

module.exports = router
