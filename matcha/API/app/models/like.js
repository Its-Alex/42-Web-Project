const db = require('../db.js')

module.exports = {
  addLike: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('INSERT INTO likes (performUser, concernUser) VALUES (?, ?)',
        [perform, concern], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  removeLike: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('DELETE FROM likes WHERE performUser = ? AND concernUser = ?',
        [perform, concern], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  getLike: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM likes WHERE performUser = ? AND concernUser = ?',
        [perform, concern], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}
