//  API KEY GOOGLE MAPS GEOLOC : AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk
//  API KEY GOOGLE MAPS GEOLOC : AIzaSyA0RO-FTbhyy6pDzm3EX04YImmfqjmATKI

const axios = require('axios')
const express = require('express')
const router = express.Router()
const middle = require('../middlewares.js')
const db = require('../db.js')

router.get('/', (req, res) => {
  res.json({
    success: true,
    version: 0.1,
    message: 'Matcha API'
  })
})

router.post('/geoloc', middle('USER'), (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lng}&key=AIzaSyA0RO-FTbhyy6pDzm3EX04YImmfqjmATKI&language=fr&region=FR`).then((res) => {
    db.get().then((db) => {
      db.query('UPDATE profils JOIN users ON profils.userId = users.id set profils.location = ? WHERE users.id = ?', [res.data.results[2].formatted_address, req.user.id], (err, results) => {
        if (err) {
          console.log(err)
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
  res.status(200)
  res.send()
})

// All paths
router.get('/users', middle('ADMIN'), require('../controllers/users.js'))
router.use('/user', require('./user.js'))
router.use('/profil', require('./profil.js'))
router.use('/picture', require('./picture.js'))

module.exports = router
