const model = require('../../models/profil.js')
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
    return error(res, 'Wrong password', 400)
  }

  console.log(req.body)

  var profil = {id: req.user.id}

  if (req.body.birthday !== undefined && req.body.birthday !== '' && req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    let birth = req.body.birthday.split('-')
    if (birth[0] > new Date().getFullYear()) {
      return error(res, 'Birthday invalid', 400)
    }
    profil.birthday = req.body.birthday
  } else {
    return error(res, 'Birthday invalid', 400)
  }

  if (req.body.bio !== undefined && req.body.bio !== '' && req.body.bio.length < 120) {
    profil.bio = req.body.bio
  } else {
    return error(res, 'Bio invalid', 400)
  }

  if (req.body.genre !== undefined && req.body.genre.length === 1 && (req.body.genre === 'M' ||
  req.body.genre === 'F' || req.body.genre === 'B')) {
    profil.genre = req.body.genre
  }

  if (req.body.type !== undefined && req.body.type.length === 1 && (req.body.type === 'M' ||
  req.body.type === 'F' || req.body.type === 'B')) {
    profil.type = req.body.type
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
    profil.tags = tags.join(' ')
  }

  if (req.body.location !== undefined && req.body.location.match(/[a-zA-Z0-9,]/)) {
    profil.location = req.body.location
  } else {
    return error(res, 'Invalid location', 400)
  }

  model.updateProfil(profil).then(() => {
    res.status(200)
    res.json({
      success: true,
      profil: profil
    })
  }).catch((err) => {
    console.log(err)
    res.status(500)
    res.json({
      success: false,
      err: 'Internal server error'
    })
  })
}
