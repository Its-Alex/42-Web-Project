const db = require('../db.js')

module.exports = {
  addNotificaton: (perform, concern, notification) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('INSERT INTO notifications (performUser, concernUser, notification, date) VALUES (?, ?, ?, ?)',
        [perform, concern, notification, Date.now()], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  removeNotifications: (perform, concern) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('DELETE FROM notifications WHERE (performUser = ? AND concernUser = ?) OR (performUser = ? AND concernUser = ?)',
        [perform, concern, concern, perform], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}
