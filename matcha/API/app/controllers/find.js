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

let sortByDistAsc = (a, b) => {
  if (a.dist < b.dist) return -1
  else if (a.dist > b.dist) return 1
  else if (a.dist === b.dist) return 0
}

let sortByPond = (a, b) => {
  
}

module.exports = (req, res) => {
  if (typeof req.body.latLocation !== 'number' || typeof req.body.lngLocation !== 'number' ||
  typeof req.body.filterByTags !== 'string' || typeof req.body.isLoc !== 'boolean' ||
  typeof req.body.orderBy !== 'string' ||
  typeof req.body.minAge !== 'string' || typeof req.body.maxAge !== 'string' ||
  typeof req.body.minPop !== 'string' || typeof req.body.maxPop !== 'string' ||
  typeof req.body.dist !== 'string') {
    return res.json({
      success: false,
      error: 'Invalid fields'
    })
  }

  req.body.minAge = parseInt(req.body.minAge)
  req.body.maxAge = parseInt(req.body.maxAge)
  req.body.minPop = parseInt(req.body.minPop)
  req.body.maxPop = parseInt(req.body.maxPop)
  req.body.dist = parseInt(req.body.dist)

  if (req.body.minAge < 18 || req.body.maxAge > 100 ||
  req.body.minPop < 0 || req.body.maxPop > 100 ||
  req.body.dist > 100000 || req.body.dist < 0) {
    return res.json({
      success: false,
      error: 'Invalid fields'
    })
  }

  if (req.body.filterByTags !== '') {
    let tags = req.body.filterByTags.split(' ')
    req.body.filterByTags = tags.filter((elem, key) => {
      if (elem[0] === '#' && elem.length <= 20) {
        tags.forEach((element, index) => {
          if (element === elem && index !== key) elem = null
        })
        return elem
      }
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
          let element = params[i]
          if ((profile.concernUser === user.userId && profile.performUser === element.id) ||
          (profile.concernUser === element.id && profile.performUser === user.userId)) {
            params.splice(i, 1)
          }
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
    let max = {
      popularity: 1,
      nbTags: 1,
      dist: 1
    }

    async.filter(params, (element, callback) => {
      // Update current data
      delete element.password
      delete element.role
      delete element.mail
      delete element.userId
      element.birthday = getAge(element.birthday)
      element.dist = getDist({
        lat: element.lat,
        lng: element.lng
      }, {
        lat: user.lat,
        lng: user.lng
      }) / 1000

      // Check filter
      if (element.birthday > req.body.maxAge || element.birthday < req.body.minAge ||
      element.popularity > req.body.maxPop || element.popularity < req.body.minPop ||
      element.dist >= req.body.dist || element.popularity < req.body.minPop ||
      typeof element.lng !== 'number' || typeof element.lat !== 'number') {
        return callback(null, !element)
      }

      // Count same tags as user
      element.nbTags = 0
      user.tags.split(' ').forEach(elmtUser => {
        element.tags.split(' ').forEach(elmtFind => {
          if (elmtFind === elmtUser) element.nbTags++
        })
      })

      // Search by location
      if (req.body.isLoc === true && getDist({
        lat: element.lat,
        lng: element.lng
      }, {
        lat: req.body.latLocation,
        lng: req.body.lngLocation
      }) > 50000.00) {
        return callback(null, !element)
      }

      // Search by tags
      if (req.body.filterByTags.length !== 0) {
        let userTags = element.tags.split(' ')
        let find = false

        for (let i = 0; i < req.body.filterByTags.length; i++) {
          let element1 = req.body.filterByTags[i]

          for (var y = 0; y < userTags.length; y++) {
            let element2 = userTags[y]

            if (element1 === element2) {
              find = true
            }
          }
          if (find === false) {
            return callback(null, !element)
          } else {
            find = false
          }
        }
      }
      if (element.dist > max.dist) max.dist = element.dist
      if (element.popularity > max.popularity) max.popularity = element.popularity
      if (element.nbTags > max.nbTags) max.nbTags = element.nbTags
      return callback(null, element)
    }, (err, results) => {
      if (err) cb(err, null)
      cb(null, results, user, max)
    })
  }, (params, user, max, cb) => {    
    params.forEach(elmt => {
      let pctPop = elmt.popularity * 100 / max.popularity
      let pctNbtags = elmt.nbTags * 100 / max.nbTags
      let pctDist = 100 - (elmt.dist * 100 / max.dist)
      elmt.score = parseInt((pctPop + 2 * pctNbtags + 3 * pctDist) / 6, 10)
    })
    cb(null, params, user)
  }], (err, params, user) => {
    if (err) {
      console.log(err)
      return error(res, 'Internal server error', 500)
    }
    res.json({
      success: true,
      results: params,
      user: user
    })
  })
}
