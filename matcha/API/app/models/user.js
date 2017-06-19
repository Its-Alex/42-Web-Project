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
        db.query('SELECT * FROM users INNER JOIN tokens ON users.id = tokens.user WHERE tokens.token = ?', [token], (err, results) => {
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
        db.query('INSERT INTO tokens (user, token, date) VALUES (?, ?, ?)', [userId, token, new Date().getTime()], (err, results) => {
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
        db.query('UPDATE users SET name = ?, mail = ?, password = ?, role = ?, state = ? where id = ?', [
          body.name,
          body.mail,
          body.password,
          body.role,
          body.state,
          body.id
        ], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) => {
        return reject(err)
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('DELETE users, tokens, profils FROM users INNER JOIN profils ON users.id = profils.userId INNER JOIN tokens ON users.id = tokens.user WHERE users.id = ?', [id], (err, results) => {
          if (err) return reject(err)
          db.query('DELETE FROM users WHERE id = ?', [id], (err, res) => {
            if (err) return reject(err)
            if (res.affectedRows !== 0) return resolve(res)
            return resolve(results)
          })
        })
      }).catch((err) => {
        return reject(err)
      })
    })
  }
}
