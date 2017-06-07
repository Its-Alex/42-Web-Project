const model = require('../../models/user.js')
const valid = require('validator')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  if (req.body.name === undefined || req.body.mail === undefined || req.body.password === undefined || req.body.validPwd === undefined) {
    error(res, 'Body error', 400)
    return
  }
  if (valid.isEmpty(req.body.name) || valid.isEmpty(req.body.mail) || valid.isEmpty(req.body.password) || valid.isEmpty(req.body.validPwd)) {
    error(res, 'Empty field(s)', 400)
    return
  }
  if (req.body.password !== req.body.validPwd) {
    error(res, 'Password does not match', 400)
    return
  }
  if (req.body.name.length > 36 || !req.body.name.match(/^([a-zA-Z0-9]+)$/)) {
    error(res, 'Invalid name', 400)
    return
  }
  if (!valid.isEmail(req.body.mail)) {
    error(res, 'Invalid mail', 400)
    return
  } else {
    req.body.mail = req.body.mail.toLowerCase()
  }
  if (!req.body.password.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) || req.body.password.length < 6) {
    error(res, 'Invalid password', 400)
    return
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  req.body.id = uuid()
  model.getUserByMail(req.body.mail).then((results) => {
    if (results.length === 0) {
      model.insertUser(req.body).then(() => {
        res.status(201)
        res.json({
          success: true
        })
      }).catch((err) => {
        console.log(err)
        error(res, 'Server error', 500)
      })
    } else {
      error(res, 'Mail already taken', 403)
    }
  }).catch((err) => {
    console.log(err)
    error(res, 'Server error', 500)
  })
}
