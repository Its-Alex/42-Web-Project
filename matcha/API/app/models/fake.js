const db = require('../db.js')

module.exports = {
  userIsReported: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM fakes WHERE performUser = ? AND concernUser = ?',
        [perform, concern], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  reportUser: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('INSERT INTO fakes (performUser, concernUser, date) VALUES (?, ?, ?)',
        [perform, concern, Date.now()], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}