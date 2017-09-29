const model = require('../../models/profile.js')

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
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
  var profile = {id: req.user.id}

  if (req.body.birthday === undefined || req.body.bio === undefined ||
  req.body.genre === undefined || req.body.type === undefined ||
  req.body.tags === undefined || req.body.firstName === undefined ||
  req.body.lastName === undefined) {
    return error(res, 'Body error', 200)
  }

  if (req.body.birthday === '' || req.body.bio === '' ||
  req.body.location === '' || req.body.genre === '' ||
  req.body.type === '' || req.body.tags === '' || req.body.firstName === '' ||
  req.body.lastName === '') {
    return error(res, 'Empty field(s)', 200)
  }

  if (!req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return error(res, 'Birthday not well formated', 200)
  } else {
    let birth = req.body.birthday.split('-')
    if (parseInt(birth[0], 10) > new Date().getFullYear()) {
      return error(res, 'Birthday invalid', 200)
    }
    profile.birthday = req.body.birthday
  }

  if (req.body.firstName > 36 || !req.body.firstName.match(/[a-zA-Z]/)) {
    return error(res, 'First name invalid', 200)
  } else {
    profile.firstName = req.body.firstName
  }

  if (req.body.lastName > 36 || !req.body.lastName.match(/[a-zA-Z]/)) {
    return error(res, 'Last name invalid', 200)
  } else {
    profile.lastName = req.body.lastName
  }

  if (req.body.bio.length > 120) {
    return error(res, 'Bio too long max size 120 characters', 200)
  } else {
    profile.bio = req.body.bio
  }

  if (req.body.genre.length === 1 && (req.body.genre === 'M' ||
  req.body.genre === 'F' || req.body.genre === 'B')) {
    profile.genre = req.body.genre
  } else {
    return error(res, 'Bad genre', 200)
  }

  if (req.body.type.length === 1 && (req.body.type === 'M' ||
  req.body.type === 'F' || req.body.type === 'B')) {
    profile.type = req.body.type
  } else {
    return error(res, 'Bad type', 200)
  }

  if (getAge(req.body.birthday) < 18 || getAge(req.body.birthday) > 99) {
    return error(res, 'Bad age', 200)
  }

  // if (req.body.tags !== undefined) {
  //   let tags = req.body.tags.split(' ')
  //   profile.tags = tags.filter((elem, key) => {
  //     if (elem[0] === '#' && elem.length <= 20) {
  //       tags.forEach((element, index) => {
  //         if (element === elem && index !== key) elem = null
  //       })
  //       return elem
  //     }
  //   }).join(' ')
  // }

  if (req.body.tags !== undefined) {
    let tags = req.body.tags.split(' ')
    tags.forEach((element, elemKey) => {
      if (element[0] !== '#' || element.length > 20) {
        return error(res, 'Tags must be formatted as follows: #word', 400)
      }
      tags.forEach((elemCheck, index) => {
        if (element === elemCheck && index !== elemKey) delete tags[index]
      }, this)
    }, this)
    profile.tags = tags.join(' ')
  } else {
    profile.tags = ''
  }

  profile.popularity = 50
  model.createProfile(profile).then(() => {
    res.status(201)
    res.json({
      success: true
    })
  }).catch((err) => {
    console.log(new Error(err))
    return error(res, 'Internal server error', 500)
  })
}
