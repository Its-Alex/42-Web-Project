const model = require('../models/fake.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.userIsReported(req.user.id, req.body.id).then(results => {
    if (results.length !== 0) return error(res, 'User was already reported', 200)
    model.reportUser(req.user.id, req.body.id).then(results => {
      res.json({success: true})
    }).catch(err => {
      console.log(err)
      return error(res, 'Internal server error', 500)
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}