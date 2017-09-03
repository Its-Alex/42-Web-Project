const userModel = require('../models/user.js')
const profileModel = require('../models/profile.js')

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
    profileModel.getProfileById(req.params.id).then(profile => {
      if (profile.length === 0) return error(res, 'User has no profile', 200)
      res.json({
        success: true,
        id: user[0].id,
        name: user[0].name,
        profile: profile
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
