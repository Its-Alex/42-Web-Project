const model = require('../../models/like.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getLike(req.user.id, req.params.id).then(result => {
    if (result.length === 0) return error(res, 'No like', 200)
    res.json({
      success: true
    })
  }).catch(err => {
    console.log(err)
    error(res, 'Internal server', 500)
  })
}
