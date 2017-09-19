const model = require('../../models/forgetPwd.js')
const modelUser = require('../../models/user.js')
const nodemailer = require('nodemailer')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''

  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}

module.exports = (req, res) => {
  if (typeof req.body.mail !== 'string' || !req.body.mail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return error(res, 'Invalid mail', 200)
  } else {
    req.body.mail = req.body.mail.toLowerCase()
  }

  let hash = genToken()

  modelUser.getUserByMail(req.body.mail).then(user => {
    if (user.length !== 1) return error(res, 'User not found', 200)
    model.addOneForget(user[0].id, hash).then(result => {
      if (result.constructor.name === 'OkPacket') {
        nodemailer.createTestAccount((err, account) => {
          if (err) return error(res, 'Mail was not send', 500)
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'admmatcha@gmail.com', // generated ethereal user
              pass: 'Apwn789123'  // generated ethereal password
            }
          })

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Matcha Admin" <admmatcha@gmail.com>', // sender address
            to: req.body.mail, // list of receivers
            subject: 'Matcha forget password', // Subject line
            text: 'Hello, if you have forget you password go on this link: http://localhost:3000/auth/forget/' + hash, // plain text body
            html: 'Hello,</br> if you have forget you password go on this <b><a href=\'http://localhost:3000/auth/forget/' + hash + '\'>link</a></b>' // html body
          }

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error)
              return error(res, 'Mail was not send', 500)
            }
            res.json({success: true})
          })
        })
      } else {
        error(res, 'Mail was not send', 500)
      }
    }).catch(err => {
      console.log(err)
      error(res, 'Internal server error', 500)
    })
  }).catch(err => {
    console.log(err)
    error(res, 'Internal server error', 500)
  })
}
