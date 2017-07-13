// const model = require('../models/picture.js')
const fs = require('fs')
const path = require('path')
const dir = path.dirname(require.main.filename) + '/pictures/'

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  if (!fs.existsSync(dir + req.user.id) || !fs.existsSync(dir + req.user.id + '/' + req.params.id + '.png')) {
    return error(res, 'Image not found', 404)
  }

  res.set('Content-Type', 'image/png')
  res.sendFile(dir + req.user.id + '/' + req.params.id + '.png')
}
