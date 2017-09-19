const model = require('../models/fake.js')
const modelBlock = require('../models/block.js')
const modelPop = require('../models/popularity.js')

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
    modelBlock.checkForNotif(req.user.id, req.body.id).then(isBlock => {
      if (isBlock === false) return error(res, 'User blocked you', 200)
      model.reportUser(req.user.id, req.body.id).then(results => {
        modelPop.removePop(req.body.id, 2).then(res => {}).catch(err => console.log(err))
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