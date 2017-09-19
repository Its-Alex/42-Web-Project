const model = require('../models/chat.js')
const modelBlock = require('../models/block.js')
const async = require('async')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getChatPeople(req.user.id).then(chats => {
    if (chats.length === 0) return error(res, 'No user found', 200)
    async.filter(chats, (chat, cb) => {
      modelBlock.checkForNotif(req.user.id, chat.id).then(result => {
        if (result === false) return cb(null, !chat)
        return cb(null, chat)
      }).catch(err => cb(err, null))
    }, (err, chats) => {
      console.log(chats)
      if (err) {
        console.log(err)
        return error(res, 'Internal server', 500)
      }
      res.send({
        success: true,
        chat: chats
      })
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server', 500)
  })
}
