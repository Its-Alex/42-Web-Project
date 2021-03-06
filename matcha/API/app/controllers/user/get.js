const model = require('../../models/user.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  if (req.params.id === 'me') {
    model.getUserByToken(req.user.token).then((results) => {
      if (results.length === 0) return error(res, 'User not found', 200)
      res.status(200)
      res.json({
        success: true,
        user: results[0]
      })
    }).catch((err) => {
      console.log(new Error(err))
      if (err) return error(res, 'Internal server error', 500)
    })
  } else if (req.user.role === 'ADMIN') {
    if (req.params.id.length !== 128) {
      return error(res, 'Id not well formated', 200)
    }

    model.getUserByToken(req.params.id).then((results) => {
      if (results.length === 0) return error(res, 'User not found', 200)
      res.status(200)
      res.json({
        success: true,
        user: results[0]
      })
    }).catch((err) => {
      console.log(new Error(err))
      if (err) return error(res, 'Internal server error', 500)
    })
  } else {
    return error(res, 'Not authorized', 401)
  }
}
