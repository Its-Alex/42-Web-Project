const db = require('../db.js')

module.exports = {
  addOneForget: (mail, hash) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('INSERT INTO forgetPwds (userId, hash) VALUES (?, ?)', [mail, hash], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}
