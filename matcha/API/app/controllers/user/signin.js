const model = require('../../models/user.js')
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
    error(res, 'Body error', 403)
    return
  }

  if (req.body.mail === '' || req.body.password === '') {
    error(res, 'Empty field(s)', 403)
    return
  }

  if (!req.body.mail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    error(res, 'Invalid mail', 403)
    return
  } else {
    req.body.mail = req.body.mail.toLowerCase()
  }

  if (!req.body.password.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) ||
  req.body.password.length < 6) {
    error(res, 'Invalid password', 403)
    return
  }

  model.getUserByMail(req.body.mail).then((user) => {
    if (user[0] === undefined) {
      return error(res, 'User not found', 403)
    }
    if (!bcrypt.compareSync(req.body.password, user[0].password)) {
      return error(res, 'Invalid password', 403)
    }
    let token = genToken()
    model.insertToken(user[0].id, token).then(() => {
      res.status(200)
      res.json({
        success: true,
        token,
        id: user[0].id
      })
    }).catch((err) => {
      console.log(new Error(err))
      error(res, 'Server error', 500)
    })
  }).catch((err) => {
    console.log(new Error(err))
    error(res, 'Server error', 500)
  })
}
