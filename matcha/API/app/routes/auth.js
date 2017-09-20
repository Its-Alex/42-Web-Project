const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    console.log(req.user)
    res.json({
      success: true,
      token: 'lol'
    })
  })

module.exports = router
