const model = require('../../models/user.js')

module.exports = (req, res) => {
  model.getUsers().then((results) => {
    results.forEach((elem, index) => {
      if (elem.role === 'ADMIN') {
        results.splice(index, 1)
      } else {
        delete results[index].id
        delete results[index].password
      }
    }, this)
  }).catch((err) => {
    console.log(err)
    res.status(404)
    res.json({
      success: false,
      message: 'No users'
    })
  })
}
