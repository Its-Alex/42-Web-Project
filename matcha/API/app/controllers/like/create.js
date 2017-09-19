const model = require('../../models/like.js')
const modelNotif = require('../../models/notification.js')
const modelBlock = require('../../models/block.js')
const ws = require('../../ws.js')
const path = require('path')
const dir = path.dirname(require.main.filename) + '/pictures/'
const fs = require('fs')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  if (!fs.existsSync(dir + req.user.id + '/0.png')) {
    return error(res, 'You need to have a profil picture to do this!', 200)
  }
  if (req.user.id === req.params.id) return error(res, 'Cannot like yourself', 200)
  model.getLike(req.user.id, req.params.id).then(result => {
    modelBlock.checkForNotif(req.user.id, req.params.id).then(isBlock => {
      if (isBlock === false) return error(res, 'User blocked you', 200)
      if (result.length !== 0) return error(res, 'User already liked', 200)
      model.addLike(req.user.id, req.params.id).then(result => {
        if (result.affectedRows === 0) return error(res, 'User not liked', 200)
        model.getLike(req.params.id, req.user.id).then(result => {
          if (result.length === 0) {
            modelNotif.addNotification(req.user.id, req.params.id, 'like').then(result => {
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
          } else {
            modelNotif.addNotification(req.user.id, req.params.id, 'likeback').then(result => {
              if (result.affectedRows === 0) return error(res, 'User has not been notified', 200)
              ws.sendToId(req.params.id, {
                method: 'notification',
                type: 'likeback',
                user: req.user.id
              })
              res.json({success: true})
            }).catch(err => {
              console.log(err)
              error(res, 'Internal server', 500)
            })
          }
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
  }).catch(err => {
    console.log(err)
    error(res, 'Internal server', 500)
  })
}
