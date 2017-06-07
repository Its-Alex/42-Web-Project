const model = require('../../models/user.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = {
  user: (req, res) => {
    model.getUserByToken(req.user.token).then((results) => {
      if (results.length === 0) return error(res, 'No user', 404)
      res.status(200)
      res.json({
        success: true,
        user: results[0]
      })
    }).catch((err) => {
      console.log(new Error(err))
      if (err) error(res, 'Internal server error', 500)
    })
  },
  admin: (req, res) => {
    if (req.params.id === undefined || req.params.id === null ||
    req.params.id === '' || req.params.id.length !== 36) error(res, 'Id not well formated', 400)

    model.getUserById(req.params.id).then((results) => {
      if (results.length === 0) return error(res, 'No user', 404)
      res.status(200)
      res.json({
        success: true,
        user: results[0]
      })
    }).catch((err) => {
      console.log(new Error(err))
      if (err) error(res, 'Internal server error', 500)
    })
  }
}
