const db = require('../db.js')

module.exports = {
  addPop: (id, pop) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM profiles WHERE userId = ?',
        [id], (err, user) => {
          if (err) reject(err)
          if (user.length === 0) return reject(new Error('No user found'))
          let popularity = user[0].popularity + pop
          if (popularity > 100) resolve()
          db.query('UPDATE profiles SET popularity = ? WHERE userId = ?',
          [popularity, id], (err, res) => {
            if (err) reject(err)
            resolve()
          })
        })
      })
    })
  },
  removePop: (id, pop) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM profiles WHERE userId = ?',
        [id], (err, user) => {
          if (err) reject(err)
          if (user.length === 0) return reject(new Error('No user found'))
          let popularity = user[0].popularity - pop
          if (popularity < 0) resolve()
          db.query('UPDATE profiles SET popularity = ? WHERE userId = ?',
          [popularity, id], (err, res) => {
            if (err) reject(err)
            resolve()
          })
        })
      })
    })
  }
}
