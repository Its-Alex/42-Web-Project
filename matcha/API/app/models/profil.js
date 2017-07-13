const db = require('../db.js')

module.exports = {
  getProfils: () => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM profils', [], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getProfilById: id => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM profils WHERE userId = ?', [id], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getProfilByToken: token => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('', [token], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  createProfil: profil => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO profils (userId, birthday, bio, genre, type, popularity, tags) VALUES (?, ?, ?, ?, ?, ?, ?)', [
          profil.id,
          profil.birthday,
          profil.bio,
          profil.genre,
          profil.type,
          profil.popularity,
          profil.tags], (err, results) => {
            if (err) {
              return reject(err)
            }
            return resolve()
          })
      }).catch((err) => reject(err))
    })
  },
  updateProfil: profil => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('UPDATE profils SET birthday = ?, bio = ?, genre = ?, type = ?, tags = ?, location = ? WHERE userId = ?', [
          profil.birthday,
          profil.bio,
          profil.genre,
          profil.type,
          profil.tags,
          profil.location,
          profil.id
        ], (err, results) => {
          if (err) return reject(err)
          return resolve()
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}
