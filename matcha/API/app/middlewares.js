const db = require('./db.js')

module.exports = (role) => {
  return (req, res, next) => {
    var auth = req.get('Authorization')

    if (auth === undefined) {
      res.status(400)
      res.json({
        success: false,
        message: 'Need Authorization in header'
      })
      return
    }
    auth = auth.split(' ')
    if (auth[0] !== 'Bearer' || auth[1].length !== 128) {
      res.status(400)
      res.json({
        success: false,
        message: 'Wrong authorization header'
      })
      return
    }
    db.get().then((db) => {
      db.query('SELECT * FROM users INNER JOIN tokens ON users.id = tokens.userId WHERE tokens.token = ?', [auth[1]], (err, results) => {
        if (err) {
          console.log(err)
          res.status(500)
          res.json({
            success: false,
            message: 'Server error'
          })
        }
        if (results[0].role === role || results[0].role === 'ADMIN') {
          req.user = {
            token: auth[1],
            id: results[0].userId,
            mail: results[0].mail,
            role: results[0].role
          }
          next()
        } else {
          res.status(404)
          res.json({
            success: false,
            message: 'Unauthorized'
          })
        }
      })
    })
  }
}
