// const model = require('../models/picture.js')
const fs = require('fs')
const validate = require('uuid-validate')
const path = require('path')
const userModel = require('../../models/user.js')
const dir = path.dirname(require.main.filename) + '/pictures/'

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  if (req.params.token === undefined) return error(res, 'Bad token', 200)
  if (req.params.token.match(/[a-zA-Z0-9]{128}/)) {
    userModel.getUserByToken(req.params.token).then((user) => {
      if (!fs.existsSync(dir + user[0].id) ||
      !fs.existsSync(dir + user[0].id + '/' + req.params.id + '.png')) {
        res.set('Content-Type', 'image/svg+xml')
        res.sendFile(path.dirname(require.main.filename) + '/avatar.svg')
      } else {
        res.set('Content-Type', 'image/png')
        res.sendFile(dir + user[0].id + '/' + req.params.id + '.png')
      }
    }).catch((err) => {
      if (err) console.log(err)
      error(res, 'Internal server error', 500)
    })
  } else if (validate(req.params.token, 4)) {
    userModel.getUserById(req.params.token).then((user) => {
      if (!fs.existsSync(dir + user[0].id) ||
      !fs.existsSync(dir + user[0].id + '/' + req.params.id + '.png')) {
        res.set('Content-Type', 'image/svg+xml')
        res.sendFile(path.dirname(require.main.filename) + '/avatar.svg')
      } else {
        res.set('Content-Type', 'image/png')
        res.sendFile(dir + user[0].id + '/' + req.params.id + '.png')
      }
    }).catch((err) => {
      if (err) console.log(err)
      error(res, 'Internal server error', 500)
    })
  } else {
    return error(res, 'Bad token', 200)
  }
}
