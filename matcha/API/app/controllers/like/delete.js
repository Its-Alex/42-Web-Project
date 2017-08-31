const model = require('../../models/like.js')
const modelNotif = require('../../models/notification.js')
const ws = require('../../ws.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.removeLike(req.user.id, req.params.id).then(result => {
    if (result.affectedRows === 0) return error(res, 'User not liked', 200)
    modelNotif.addNotification(req.user.id, req.params.id, 'dislike').then(result => {
      if (result.affectedRows === 0) return error(res, 'User has not been notified', 200)
      res.json({success: true})
      ws.sendToId(req.params.id, {
        method: 'notification',
        type: 'dislike',
        user: req.user.id
      })
    }).catch(err => {
      console.log(err)
      error(res, 'Internal server', 500)
    })
  }).catch(err => {
    console.log(err)
    error(res, 'Internal server', 500)
  })
}