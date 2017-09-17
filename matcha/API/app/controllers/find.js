const profileModel = require('../models/profile.js')
const blockModel = require('../models/block.js')
const model = require('../models/find.js')
const async = require('async')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

let getAge = dateString => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

module.exports = (req, res) => {
  if (typeof req.body.filterByLocation !== 'string' ||
  typeof req.body.filterByTags !== 'string' ||
  typeof req.body.orderBy !== 'string' ||
  typeof req.body.minAge !== 'number' || typeof req.body.maxAge !== 'number' ||
  typeof req.body.minDist !== 'number' || typeof req.body.maxDist !== 'number' ||
  typeof req.body.minPop !== 'number' || typeof req.body.maxPop !== 'number') {
    return res.json({
      success: false,
      error: 'Invalid fields'
    })
  }

  if (req.body.minAge < 0 || req.body.maxAge > 100 ||
  req.body.minDist < 0 || req.body.maxDist > 500 ||
  req.body.minPop < 0 || req.body.maxPop > 100) {
    return res.json({
      success: false,
      error: 'Invalid fields'
    })
  }

  async.waterfall([(cb) => {
    /**
     * Get all users who was match
     */
    profileModel.getProfileById(req.user.id).then(result => {
      model.getResults(result[0] ,[
        req.user.id,
        req.body.minPop,
        req.body.maxPop
      ]).then(result => {
        cb(null, result)
      }).catch(err => cb(err, null))
    }).catch(err => cb(err, null))
  }, (params, cb) => {
    /**
     * Delete blocked user form list
     */
    blockModel.getAllBlockedBy(req.user.id).then(result => {
      async.each(result, (profile, callback) => {
        for (let i = 0; i < params.length; i++) {
          let element = params[i];
          params[i].birthday = getAge(element.birthday)
          if (element.birthday > req.body.maxAge || elemnt.birthday < req.body.minAge ||
          element.popularity > req.body.maxPop || element.popularity < req.body.minPop ||
          params[i].concernUser === profile.id) {
            delete params[i]
          }
        }
        callback()
      }, (err) => {
        if (err) return cb(err, null)
        cb(null, params)
      })
    }).catch(err => cb(err, null))
  },(params, cb) => {
    for (let i = 0; i < params.length; i++) {
    }
    console.log(params)
    cb(null, params)
  }], (err, result) => {
    if (err) {
      console.log(err)
      return error(res, 'Internal server error', 500)
    }
    res.json({
      success: true,
      results: result
    })
  })
}
