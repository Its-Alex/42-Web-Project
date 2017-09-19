const db = require('../db.js')

module.exports = {
  checkHash: (id, hash) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM forgetPwds WHERE userId = ? AND hash = ?',
        [id, hash], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  updatePwd: (id, password) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('UPDATE users SET users.password = ? WHERE id = ?',
        [password, id], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  delHash: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('DELETE FROM forgetPwds WHERE userId = ?',
        [id], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}
