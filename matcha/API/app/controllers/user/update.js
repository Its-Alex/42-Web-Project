const model = require('../../models/user.js')
const bcrypt = require('bcryptjs')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
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

  if (req.params.id !== 'me') {
    return error(res, 'Not authorized', 401)
  }

  if (!bcrypt.compareSync(req.body.oldPassword, req.user.password)) {
    return error(res, 'Password invalid', 400)
  }

  if (typeof req.body.name !== 'undefined' && req.body.name !== '') {
    if (req.body.name.length <= 36 &&
    req.body.name.match(/^([a-zA-Z0-9]+)$/)) {
      user.name = req.body.name
    }
  }

  if (typeof req.body.newPassword !== 'undefined' && req.body.newPassword !== '') {
    if (req.body.newPassword.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) &&
    req.body.newPassword.length >= 8 && zxcvbn(req.body.password).score >= 4) {
      user.password = bcrypt.hashSync(req.body.newPassword, 10)
    }
  }

  if (typeof req.body.mail !== 'undefined') {
    if (req.body.mail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      model.getUserByMail(req.body.mail).then((results) => {
        if (results.length === 0) {
          user.mail = req.body.mail.toLowerCase()
        }

        if (req.params.id === 'me') {
          console.log(user)
          model.updateUser(user).then((results) => {
            if (results.message.split(' ')[5] === '0') {
              res.status(400)
              return res.json({
                success: false,
                error: 'Nothing has change'
              })
            } else {
              res.status(200)
              return res.json({
                success: true
              })
            }
          }).catch((err) => {
            console.log(err)
            return error(res, 'Internal error', 500)
          })
        } else if (req.params.id.length === 128 && req.user.role === 'ADMIN') {
          model.updateUser(user).then((results) => {
            if (results.message.split(' ')[5] === '0') {
              res.status(400)
              res.json({
                success: false,
                error: 'Nothing has change'
              })
            } else {
              res.status(200)
              res.json({
                success: true
              })
            }
          }).catch((err) => {
            console.log(err)
            return error(res, 'Internal error', 500)
          })
        } else {
          return error(res, 'Bad request', 200)
        }
      }).catch((err) => {
        console.log(err)
        return error(res, 'Internal error', 500)
      })
    } else {
      return error(res, 'Invalid mail', 400)
    }
  }
}
