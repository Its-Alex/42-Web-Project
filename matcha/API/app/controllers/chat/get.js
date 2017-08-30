const model = require('../../models/chat.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getChatPeople(req.user.id).then(chat => {
    if (chat.length === 0) return error(res, 'No user found', 200)
    res.send({
      success: true,
      chat: chat
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server', 500)
  })
}
