const model = require('../../models/profil.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  var profil = {id: req.user.id}

  if (req.body.birthday === undefined || req.body.bio === undefined ||
  req.body.genre === undefined || req.body.type === undefined ||
  req.body.tags === undefined) {
    return error(res, 'Body error', 400)
  }

  if (req.body.birthday === '' || req.body.bio === '' ||
  req.body.location === '' || req.body.genre === '' ||
  req.body.type === '' || req.body.tags === '') {
    return error(res, 'Empty field(s)', 400)
  }

  if (!req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return error(res, 'Birthday not well formated', 400)
  } else {
    let birth = req.body.birthday.split('-')
    if (birth[0] > new Date().getFullYear()) {
      return error(res, 'Birthday invalid', 400)
    }
    profil.birthday = req.body.birthday
    profil.age = parseInt(new Date().getFullYear()) - parseInt(birth[0])
  }

  if (req.body.bio.length > 120) {
    return error(res, 'Bio too long max size 120 characters', 400)
  } else {
    profil.bio = req.body.bio
  }

  if (req.body.genre.length === 1 && (req.body.genre === 'M' ||
  req.body.genre === 'F' || req.body.genre === 'B')) {
    profil.genre = req.body.genre
  } else {
    return error(res, 'Bad genre', 400)
  }

  if (req.body.type.length === 1 && (req.body.type === 'M' ||
  req.body.type === 'F' || req.body.type === 'B')) {
    profil.type = req.body.type
  } else {
    return error(res, 'Bad type', 400)
  }

  let tags = req.body.tags.split(' ')
  tags.forEach((element) => {
    if (element[0] !== '#' || element.length > 20) {
      return error(res, 'Tags must be formatted as follows: #word', 400)
    }
  }, this)
  profil.tags = req.body.tags

  profil.popularity = 0
  model.createProfil(profil).then(() => {
    res.status(201)
    res.json({
      success: true
    })
  }).catch((err) => {
    console.log(new Error(err))
    return error(res, 'Internal server error', 500)
  })
}
