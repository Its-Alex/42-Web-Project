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
  model.getLike(req.user.id, req.params.id).then(result => {
    if (result.length !== 0) return error(res, 'User already liked', 200)
    model.addLike(req.user.id, req.params.id).then(result => {
      if (result.affectedRows === 0) return error(res, 'User not liked', 200)
      modelNotif.addNotificaton(req.user.id, req.params.id, 'like').then(result => {
        if (result.affectedRows === 0) return error(res, 'User has not been notified', 200)
        ws.sendToId(req.params.id, {
          method: 'notification',
          type: 'like',
          user: req.user.id
        })
        res.json({success: true})
      }).catch(err => {
        console.log(err)
        error(res, 'Internal server', 500)
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
