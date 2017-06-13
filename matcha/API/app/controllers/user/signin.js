const model = require('../../models/user.js')
const valid = require('validator')
const bcrypt = require('bcryptjs')

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''

  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  if (req.body.mail === undefined || req.body.password === undefined) {
    error(res, 'Body error', 400)
    return
  }
  if (valid.isEmpty(req.body.mail) || valid.isEmpty(req.body.password)) {
    error(res, 'Empty field(s)', 400)
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
  }

  model.getUserByMail(req.body.mail).then((user) => {
    if (user[0] === undefined) {
      return error(res, 'User not found', 400)
    }
    if (user[0].state === 'NEED_VALID') {
      return error(res, 'User must complete his registration', 400)
    }
    if (!bcrypt.compareSync(req.body.password, user[0].password)) {
      return error(res, 'Invalid password', 400)
    }
    var token = genToken()
    model.insertToken(user[0].id, token).then(() => {
      res.status(200)
      res.json({
        success: true,
        token
      })
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
    error(res, 'Server error', 500)
  })
}
