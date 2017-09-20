const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const app = express()
const db = require('./db.js')
const port = 3005

db.connect()
require('./ws.js')

passport.use(new FacebookStrategy({
  clientID: '470705539978720',
  clientSecret: '33260cd61e061705842c6f698451ed88',
  callbackURL: 'http://localhost:3005/auth/facebook/callback',
  profileFields: ['id', 'name', 'emails', 'gender', 'photos']
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, profile)
}
))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

app.disable('x-powered-by')

app.use(cors())
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({extended: true, limit: '512kb'}))
app.use(bodyParser.json({limit: '5mb'}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

// Global api route
app.use('/', require('./routes/index.js'))

// 404 not found api response
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'URL not found'
  })
})

// Start web server
app.listen(port, () => {
  console.log('Start at ' + port)
})

// End connecton with database
process.on('SIGINT', () => {
  db.end()
  process.exit()
})
