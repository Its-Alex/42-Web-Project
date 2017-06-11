const db = require('../db.js')

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users', (err, results) => {
          if (err) {
            return reject(err)
          }
          return resolve(results)
        })
      }).catch((err) => {
        if (err) {
          reject(err)
        }
      })
    })
  },
  getUserByMail: (mail) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users WHERE mail = ?', [mail], (err, results) => {
          if (err) {
            return reject(err)
          }
          return resolve(results)
        })
      }).catch((err) => {
        if (err) {
          return reject(err)
        }
      })
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
          if (err) {
            return reject(err)
          }
          return resolve(results)
        })
      }).catch((err) => {
        if (err) {
          return reject(err)
        }
      })
    })
  },
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users INNER JOIN tokens ON users.id = tokens.userId WHERE tokens.token = ?', [token], (err, results) => {
          if (err) {
            return reject(err)
          }
          return resolve(results)
        })
      }).catch((err) => {
        if (err) {
          return reject(err)
        }
      })
    })
  },
  insertToken: (userId, token) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO tokens (userId, token, date) VALUES (?, ?, ?)', [userId, token, new Date().getTime()], (err, results) => {
          if (err) {
            return reject(err)
          }
          return resolve()
        })
      }).catch((err) => {
        return reject(err)
      })
    })
  },
  insertUser: (body) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO users (id, name, mail, password, date) VALUES (?, ?, ?, ?, ?)', [
          body.id,
          body.name,
          body.mail,
          body.password,
          new Date().getTime()], (err, results) => {
            if (err) {
              return reject(err)
            }
            return resolve()
          })
      }).catch((err) => {
        return reject(err)
      })
    })
  },
  updateUser: (body) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('UPDATE users SET name = ?, mail = ?, password = ?, role = ? where id = ?', [
          body.name,
          body.mail,
          body.password,
          body.role,
          body.id
        ], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) => {
        return reject(err)
      })
    })
  }
}
