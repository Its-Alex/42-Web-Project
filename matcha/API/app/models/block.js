const db = require('../db.js')

module.exports = {
  userIsBlocked: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM blocks WHERE performUser = ? AND concernUser = ?',
        [perform, concern], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  blockUser: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('INSERT INTO blocks (performUser, concernUser, date) VALUES (?, ?, ?)',
        [perform, concern, Date.now()], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  getAllBlockedBy: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM blocks WHERE performUser = ? OR concernUser = ?', [id, id], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  checkForNotif: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM blocks INNER JOIN users on blocks.concernUser = users.id WHERE (blocks.concernUser = ? AND blocks.performUser = ?) OR (blocks.concernUser = ? AND blocks.performUser = ?)',
        [perform, concern, concern, perform], (err, res) => {
          if (err) return console.log(err)
          if (res.length !== 0) resolve(false)
          resolve(true)
        })
      }).catch(err => reject(err))
    })
  }
}
