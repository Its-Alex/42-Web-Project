const model = require('../../models/chat.js')
const userModel = require('../../models/user.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getChatPeople(req.user.id).then(result => {
    if (result.length === 0) return error(res, 'No user found', 200)
    res.send({
      success: true,
      user: result
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server', 500)
  })
}
