const model = require('../../models/profil.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  var profil = { id: req.user.id}

  
}
