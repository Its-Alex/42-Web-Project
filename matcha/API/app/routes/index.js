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
      db.query('UPDATE profiles JOIN users ON profiles.userId = users.id set profiles.location = ? WHERE users.id = ?', [res.data.results[2].formatted_address, req.user.id], (err, results) => {
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
router.get('/notifications', middle('USER'), require('../controllers/notifications.js'))
router.get('/otherProfile/:id', middle('USER'), require('../controllers/otherProfile.js'))
router.post('/find', middle('USER'), require('../controllers/find.js'))
router.post('/block', middle('USER'), require('../controllers/block.js'))
router.post('/fake', middle('USER'), require('../controllers/fake.js'))
router.use('/chats', middle('USER'), require('../controllers/chats.js'))
router.use('/user', require('./user.js'))
router.use('/profile', require('./profile.js'))
router.use('/picture', require('./picture.js'))
router.use('/like', require('./like.js'))
router.use('/notification', require('./notification.js'))
router.use('/chat', require('./chat.js'))

module.exports = router
