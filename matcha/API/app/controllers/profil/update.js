const model = require('../../models/profil.js')
const bcrypt = require('bcryptjs')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  if (!bcrypt.compareSync(req.body.password, req.user.password)) {
    res.status(400)
    return res.json({
      success: false,
      error: 'Wrong password'
    })
  }

  var profil = {id: req.user.id}

  if (req.body.birthday !== undefined && req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    let birth = req.body.birthday.split('-')
    if (birth[0] > new Date().getFullYear()) {
      return error(res, 'Birthday invalid', 400)
    }
    profil.birthday = req.body.birthday
  }

  if (req.body.bio !== undefined && req.body.bio.length < 120) {
    profil.bio = req.body.bio
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
    let tags = req.body.tags.split(' ')
    tags.forEach((element) => {
      if (element[0] !== '#' || element.length > 20) {
        return error(res, 'Tags must be formatted as follows: #word', 400)
      }
    }, this)
    profil.tags = req.body.tags
  }

  if (req.body.location !== undefined && req.body.location.match(/[a-zA-Z0-9,]/)) {
    profil.location = req.body.location
  }

  res.send()
}
