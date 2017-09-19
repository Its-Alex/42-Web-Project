const model = require('../../models/user.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const zxcvbn = require('zxcvbn')

let genToken = () => {
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
  if (req.body.name === undefined || req.body.mail === undefined ||
  req.body.password === undefined || req.body.validPwd === undefined) {
    error(res, 'Body error', 400)
    return
  }
  if (req.body.name === '' || req.body.mail === '' ||
  req.body.password === '' || req.body.validPwd === '') {
    return error(res, 'Empty field(s)', 400)
  }
  if (req.body.password !== req.body.validPwd) {
    return error(res, 'Password does not match', 400)
  }
  if (req.body.name.length > 36 || !req.body.name.match(/^([a-zA-Z0-9]+)$/)) {
    return error(res, 'Invalid name', 400)
  }
  if (!req.body.mail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return error(res, 'Invalid mail', 400)
  } else {
    req.body.mail = req.body.mail.toLowerCase()
  }
  if (!req.body.password.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) ||
  req.body.password.length < 8 || zxcvbn(req.body.password).score < 4) {
    return error(res, 'Invalid password', 400)
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  req.body.id = uuid()
  model.getUserByMail(req.body.mail).then((results) => {
    if (results.length === 0) {
      model.insertUser(req.body).then(() => {
        model.getUserByMail(req.body.mail).then((results) => {
          let token = genToken()
          model.insertToken(results[0].id, token).then(() => {
            res.status(201)
            res.json({
              success: true,
              token
            })
          }).catch((err) => {
            console.log(new Error(err))
            error(res, 'Server error', 500)
          })
        }).catch((err) => {
          console.log(err)
          error(res, 'Server error', 500)
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
