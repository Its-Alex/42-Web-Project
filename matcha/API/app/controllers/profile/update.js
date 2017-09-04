const model = require('../../models/profile.js')
const bcrypt = require('bcryptjs')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  if (!bcrypt.compareSync(req.body.password, req.user.password)) {
    return error(res, 'Password invalid', 400)
  }

  var profile = {id: req.user.id}

  if (req.body.birthday !== undefined && req.body.birthday !== '' && req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    let birth = req.body.birthday.split('-')
    if (birth[0] > new Date().getFullYear()) {
      return error(res, 'Birthday invalid', 400)
    }
    profile.birthday = req.body.birthday
  } else {
    return error(res, 'Birthday invalid', 400)
  }

  if (req.body.bio !== undefined && req.body.bio !== '' && req.body.bio.length < 120) {
    profile.bio = req.body.bio
  } else {
    return error(res, 'Bio invalid', 400)
  }

  if (req.body.firstName === undefined || req.body.firstName === '' ||
    req.body.firstName > 36 || !req.body.firstName.match(/[a-zA-Z]/)) {
    return error(res, 'First name invalid', 400)
  } else {
    profile.firstName = req.body.firstName
  }

  if (req.body.lastName === undefined || req.body.lastName === '' ||
    req.body.lastName > 36 || !req.body.lastName.match(/[a-zA-Z]/)) {
    return error(res, 'Last name invalid', 400)
  } else {
    profile.lastName = req.body.lastName
  }

  if (req.body.genre !== undefined && req.body.genre.length === 1 && (req.body.genre === 'M' ||
  req.body.genre === 'F' || req.body.genre === 'B')) {
    profile.genre = req.body.genre
  }

  if (req.body.type !== undefined && req.body.type.length === 1 && (req.body.type === 'M' ||
  req.body.type === 'F' || req.body.type === 'B')) {
    profile.type = req.body.type
  }

  if (req.body.tags !== undefined) {
    let err = 'no'
    let tags = req.body.tags.split(' ')
    tags.forEach((element, elemKey) => {
      if (element[0] !== '#' || element.length > 20) {
        error(res, 'Tags must be formatted as follows: #word', 400)
        err = 'yes'
      }
      tags.forEach((elemCheck, index) => {
        if (element === elemCheck && index !== elemKey) delete tags[index]
      }, this)
    }, this)
    if (err === 'yes') return
    profile.tags = tags.join(' ')
  }

  if (req.body.location !== undefined && req.body.location.match(/[a-zA-Z0-9,]/)) {
    profile.location = req.body.location
  } else {
    return error(res, 'Invalid location', 400)
  }

  model.updateProfile(profile).then(() => {
    res.status(200)
    res.json({
      success: true,
      profile: profile
    })
  }).catch((err) => {
    console.log(err)
    error(res, 'Internal server error', 500)
  })
}
