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
    model.deleteUser(req.user.id).then((results) => {
      if (results.affectedRows !== 0) {
        res.status(200)
        return res.json({
          success: true
        })
      } else return error(res, 'Nothing has been deleted', 200)
    }).catch((err) => {
      console.log(new Error(err))
      return error(res, 'Internal error', 500)
    })
  } else if (req.user.role === 'ADMIN') {
    model.getUserByToken(req.params.id).then((results) => {
      model.deleteUser(results[0].userId).then((results) => {
        if (results.affectedRows !== 0) {
          res.status(200)
          return res.json({
            success: true
          })
        } else return error(res, 'Nothing has been deleted', 200)
      }).catch((err) => {
        console.log(new Error(err))
        return error(res, 'Internal error', 500)
      })
    }).catch((err) => {
      console.log(new Error(err))
      return error(res, 'Internal error', 500)
    })
  } else {
    return error(res, 'Not authorized', 401)
  }
}
