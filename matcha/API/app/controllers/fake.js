const model = require('../models/fake.js')
const modelBlock = require('../models/block.js')

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
    modelBlock.checkForNotif(req.user.id, req.params.id).then(isBlock => {
      if (isBlock === true) return error(res, 'User blocked you', 200)
      model.reportUser(req.user.id, req.body.id).then(results => {
        res.json({success: true})
      }).catch(err => {
        console.log(err)
        return error(res, 'Internal server error', 500)
      })
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}