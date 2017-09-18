const axios = require('axios')
const async = require('async')
const profileModel = require('../models/profile.js')
const blockModel = require('../models/block.js')
const model = require('../models/find.js')
const getDist = require('../getDist.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

let getAge = dateString => {
  var today = new Date()
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

module.exports = (req, res) => {
  if (typeof req.body.latLocation !== 'number' || typeof req.body.lngLocation !== 'number' ||
  typeof req.body.filterByTags !== 'string' || typeof req.body.isLoc !== 'boolean' ||
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
     * Get current user and all users who was match
     */
    profileModel.getProfileById(req.user.id).then(user => {
      if (typeof user[0].lat !== 'number' && typeof user[0].lng !== 'number') {
        return cb(new Error('User has no location'), null)
      }
      model.getResults(user[0], [
        req.user.id,
        req.body.minPop,
        req.body.maxPop
      ]).then(result => {
        return cb(null, result, user[0])
      }).catch(err => cb(err, null))
    }).catch(err => cb(err, null))
  }, (params, user, cb) => {
    /**
     * Delete blocked user form list
     */
    blockModel.getAllBlockedBy(req.user.id).then(result => {
      async.each(result, (profile, callback) => {
        for (let i = 0; i < params.length; i++) {
          /**
           * Need to remove blocked user
           */
        }
        return callback()
      }, (err) => {
        if (err) return cb(err, null)
      })
      return cb(null, params, user)
    }).catch(err => cb(err, null))
  }, (params, user, cb) => {
    /**
     * Check all query params
     */
    async.filter(params, (element, callback) => {
      element.birthday = getAge(element.birthday)
      element.dist = getDist({
        lat: element.lat,
        lng: element.lng
      }, {
        lat: user.lat,
        lng: user.lng
      }) / 1000
      if (element.birthday > req.body.maxAge || element.birthday < req.body.minAge ||
      element.popularity > req.body.maxPop || element.popularity < req.body.minPop ||
      typeof element.lng !== 'number' || typeof element.lat !== 'number') {
        return callback(null, !element)
      }
      if (req.body.isLoc === true && getDist({
        lat: element.lat,
        lng: element.lng
      }, {
        lat: req.body.latLocation,
        lng: req.body.lngLocation
      }) > 10000.00) {
        return callback(null, !element)
      }
      return callback(null, element)
    }, (err, results) => {
      if (err) cb(err, null)
      cb(null, results, user)
    })
  }, (params, user, cb) => {
    console.log(params)
    cb(null, params, user)
  }], (err, params, user) => {
    if (err) {
      console.log(err)
      return error(res, 'Internal server error', 500)
    }
    res.json({
      success: true,
      results: params
    })
  })
}
