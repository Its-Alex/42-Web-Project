const model = require('../../models/user.js')
const valid = require('validator')
const bcrypt = require('bcryptjs')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  
}
