const db = require('./db.js')

module.exports = (role) => {
  return (req, res, next) => {
    var auth = req.get('Authorization')

    if (auth === undefined) {
      res.status(401)
      res.json({
        success: false,
        msg: 'Need Authorization in header'
      })
      return
    }
    auth = auth.split(' ')
    if (auth[0] !== 'Bearer' || auth[1].length !== 128 || auth.length !== 2) {
      res.status(401)
      res.json({
        success: false,
        msg: 'Wrong authorization header'
      })
      return
    }
    db.get().then((db) => {
      db.query('SELECT * FROM users INNER JOIN tokens ON users.id = tokens.user WHERE tokens.token = ?', [auth[1]], (err, results) => {
        if (err) {
          console.log(err)
          res.status(500)
          res.json({
            success: false,
            msg: 'Server error'
          })
        }
        if (results === undefined || results.length !== 1) {
          res.status(401)
          res.json({
            success: false,
            msg: 'False token'
          })
          return
        }
        if (results[0].role === role || results[0].role === 'ADMIN') {
          req.user = {
            token: auth[1],
            id: results[0].id,
            name: results[0].name,
            password: results[0].password,
            mail: results[0].mail,
            role: results[0].role,
          }
          next()
        } else {
          res.status(404)
          res.json({
            success: false,
            msg: 'Unauthorized'
          })
        }
      })
    })
  }
}
