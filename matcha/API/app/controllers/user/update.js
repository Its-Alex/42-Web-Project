const model = require('../../models/user.js')

module.exports = {
  user: (req, res) => {
    console.log('Req user')
    res.send('')
  },
  admin: (req, res) => {
    console.log('Req admin')
    res.send('')
  }
}
