const model = require('../../models/notification.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getNotifications(req.user.id).then(result => {
    console.log(res)
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal error', 500)
  })
}
