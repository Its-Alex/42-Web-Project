const model = require('../../models/reset.js')
const modelUser = require('../../models/user.js')
const bcrypt = require('bcryptjs')
const zxcvbn = require('zxcvbn')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  let pwd

  console.log(req.body)
  if (typeof req.body.newPassword !== 'string' || typeof req.body.confirmNewPassword !== 'string' ||
  typeof req.body.mail !== 'string') {
    return error(res, 'Invalid fields', 200)
  }

  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return error(res, 'Password does not match', 200)
  }

  if (!req.body.mail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return error(res, 'Invalid mail', 200)
  } else {
    req.body.mail = req.body.mail.toLowerCase()
  }

  if (req.body.newPassword.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) && req.body.newPassword.length >= 8) {
    pwd = bcrypt.hashSync(req.body.newPassword, 10)
  } else {
    return error(res, 'Invalid password', 200)
  }

  if (zxcvbn(req.body.newPassword).score < 4) {
    return error(res, 'Password too weak', 200)
  }

  modelUser.getUserByMail(req.body.mail).then(user => {
    if (user.length === 0) return error(res, 'User not found', 200)
    model.checkHash(user[0].id, req.params.hash).then(results => {
      if (results.length === 0) return error(res, 'No password forgotten request')
      model.updatePwd(user[0].id, pwd).then(result => {
        if (result.constructor.name === 'OkPacket') {
          model.delHash(user[0].id).then(result => {
            if (result.constructor.name === 'OkPacket') {
              return res.json({success: true})
            } else {
              return error(res, 'Internal server error', 500)
            }
          }).catch(err => {
            console.log(err)
            return error(res, 'Internal server error', 500)
          })
        } else {
          return error(res, 'Internal server error', 500)
        }
      }).catch(err => {
        console.log(err)
        return error(res, 'Internal server error', 500)
      })
    }).catch(err => {
      console.log(err)
      return error(res, 'Internal server error', 500)
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}
