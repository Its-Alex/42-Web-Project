const model = require('../../models/user.js')

module.exports = (req, res) => {
  // model.getUserById(req.params.id).then((results) => {
  //   delete results[0].id
  //   delete results[0].password
  //   res.status(200)
  //   res.json({
  //     success: true,
  //     message: results[0]
  //   })
  // }).catch((err) => {
  //   console.log(err)
  //   res.status(404)
  //   res.json({
  //     success: false,
  //     message: 'No users'
  //   })
  // })
}
