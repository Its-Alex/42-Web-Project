const model = require('../../models/chat.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  model.getChatWith(req.user.id, req.params.id).then(result => {
    if (result.length === 0) return error(res, 'No text chat', 200)
    res.json({
      success: true,
      texts: result
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}