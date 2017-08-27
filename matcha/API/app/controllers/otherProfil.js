const userModel = require('../models/user.js')
const profilModel = require('../models/profil.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  userModel.getUserById(req.params.id).then(user => {
    if (user.length === 0) return error(res, 'No user found', 200)
    profilModel.getProfilById(req.params.id).then(profil => {
      if (profil.length === 0) return error(res, 'User has no profil', 200)
      res.json({
        success: true,
        id: user[0].id,
        name: user[0].name,
        profil: profil
      })
    }).catch(err => {
      console.log(err)
      return error(res, 'Internal server error', 500)
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}
