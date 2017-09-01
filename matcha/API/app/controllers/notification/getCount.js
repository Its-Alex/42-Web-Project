const model = require('../../models/notification.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getNotificationsNotSeen(req.user.id).then(result => {
    res.json({
      success: true,
      number: result[0].count
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal error', 500)
  })
}
