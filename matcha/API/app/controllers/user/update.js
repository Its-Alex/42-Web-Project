const model = require('../../models/user.js')
const bcrypt = require('bcryptjs')
const valid = require('validator')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    mail: req.user.mail,
    password: req.user.password,
    role: req.user.role
  }

  if (req.params.id.length === 128 && req.user.role === 'ADMIN') {
    model.getUserByToken(req.params.id).then((res) => {
      user.id = res[0].id
      user.name = res[0].name
      user.mail = res[0].mail
      user.password = res[0].password
      user.role = res[0].role
    }).catch((err) => {
      console.log(new Error(err))
      return error(res, 'User not found', 404)
    })
  } else if (req.params.id !== 'me') {
    return error(res, 'Not authorized', 401)
  }

  if (typeof req.body.name !== 'undefined') {
    if (req.body.name.length <= 36 || req.body.name.match(/^([a-zA-Z0-9]+)$/)) user.name = req.body.name
  }
  if (typeof req.body.password !== 'undefined') {
    if (req.body.password === req.body.validPwd || req.body.password.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) || req.body.password.length >= 8) {
      user.password = bcrypt.hashSync(req.body.password, 10)
    }
  }
  if (typeof req.body.mail !== 'undefined') {
    if (valid.isEmail(req.body.mail)) {
      model.getUserByMail(req.body.mail).then((results) => {
        if (results.length === 0) {
          user.mail = req.body.mail.toLowerCase()
        } else {
          return error(res, 'Mail already taken', 400)
        }
      }).catch((err) => {
        console.log(new Error(err))
        return error(res, 'Internal error', 500)
      })
    }
  }

  if (req.params.id === 'me') {
    model.updateUser(user).then((results) => {
      if (results.message.split(' ')[5] === '0') {
        res.status(400)
        res.json({
          success: false,
          message: 'Nothing has change'
        })
      } else {
        res.status(200)
        res.json({
          success: true
        })
      }
    }).catch((err) => {
      console.log(new Error(err))
      return error(res, 'Internal error', 500)
    })
  } else if (req.params.id.length === 128 && req.user.role === 'ADMIN') {
    model.updateUser(user).then((results) => {
      if (results.message.split(' ')[5] === '0') {
        res.status(400)
        res.json({
          success: false,
          message: 'Nothing has change'
        })
      } else {
        res.status(200)
        res.json({
          success: true
        })
      }
    }).catch((err) => {
      console.log(new Error(err))
      return error(res, 'Internal error', 500)
    })
  } else {
    return error(res, 'Internal error', 500)
  }
}
