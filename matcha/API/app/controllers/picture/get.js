// const model = require('../models/picture.js')
const fs = require('fs')
const path = require('path')
const userModel = require('../../models/user.js')
const dir = path.dirname(require.main.filename) + '/pictures/'

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  if (req.params.token === undefined || !req.params.token.match(/[a-zA-Z0-9]{128}/)) {
    res.sendStatus(200)
    return res.json({
      success: false,
      error: 'Bad token'
    })
  }

  userModel.getUserByToken(req.params.token).then((user) => {
    if (!fs.existsSync(dir + user[0].id) || !fs.existsSync(dir + user[0].id + '/' + req.params.id + '.png')) {
      error(res, 'Image not found', 404)
    } else {
      res.set('Content-Type', 'image/png')
      res.sendFile(dir + user[0].id + '/' + req.params.id + '.png')
    }
  }).catch((err) => {
    if (err) console.log(err)
    res.sendStatus(500)
    res.json({
      success: false,
      error: 'Internal server error'
    })
  })
}
