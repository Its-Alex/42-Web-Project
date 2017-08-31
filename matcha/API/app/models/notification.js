const db = require('../db.js')

module.exports = {
  getNotifications: (user) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT \
                  user1.name AS performName, \
                  user2.name AS concernName, \
                  notifications.performUser, \
                  notifications.concernUser, \
                  notifications.notification AS type, \
                  notifications.seen, \
                  notifications.date \
                  FROM notifications \
                  INNER JOIN users as user1 on user1.id = notifications.performUser \
                  INNER JOIN users as user2 on user2.id = notifications.concernUser \
                  WHERE performUser = ? OR concernUser = ? ORDER BY date DESC',
        [user, user], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      })
    })
  },
  addNotification: (perform, concern, notification) => {
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
