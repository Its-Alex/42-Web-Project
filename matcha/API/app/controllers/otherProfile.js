const userModel = require('../models/user.js')
const profileModel = require('../models/profile.js')
const blockModel = require('../models/block.js')
const reportModel = require('../models/fake.js')
const likeModel = require('../models/like.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  let likeBack = false
  let block = false
  let report = false

  userModel.getUserById(req.params.id).then(user => {
    if (user.length === 0) return error(res, 'No user found', 200)
    profileModel.getProfileById(req.params.id).then(profile => {
      if (profile.length === 0) return error(res, 'User has no profile', 200)
      blockModel.userIsBlocked(req.user.id, req.params.id).then(results => {
        if (results.length !== 0) block = true
        reportModel.userIsReported(req.user.id, req.params.id).then(results => {
          if (results.length !== 0) report = true
          likeModel.getLike(user[0].id, req.user.id).then(results => {
            if (results.length !== 0) likeBack = true
            res.json({
              success: true,
              id: user[0].id,
              name: user[0].name,
              profile: profile,
              block,
              report,
              likeBack
            })
          }).catch(err => {
            console.log(err)
            return error(res, 'Internal server error', 500)
          })
        }).catch(err => {
          console.log(err)
          return error(res, 'Internal server error', 500)
        })
      }).catch(err => {
        console.log(err)
        return error(res, 'Internal server error', 500)
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
