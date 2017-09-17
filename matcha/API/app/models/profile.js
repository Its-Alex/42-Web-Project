const db = require('../db.js')

module.exports = {
  getProfiles: () => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM profiles', [], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getProfileById: id => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM profiles WHERE userId = ?', [id], (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      }).catch((err) =>reject(err))
    })
  },
  getProfileByToken: token => {
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
  createProfile: profile => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO profiles (userId, birthday, firstName, lastName, bio, genre, type, popularity, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
          profile.id,
          profile.birthday,
          profile.firstName,
          profile.lastName,
          profile.bio,
          profile.genre,
          profile.type,
          profile.popularity,
          profile.tags], (err, results) => {
            if (err) {
              return reject(err)
            }
            return resolve()
          })
      }).catch((err) => reject(err))
    })
  },
  updateProfile: profile => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('UPDATE profiles SET birthday = ?, bio = ?, firstName = ?, lastName = ?, genre = ?, type = ?, tags = ?, location = ?, lat = ?, lng = ? WHERE userId = ?', [
          profile.birthday,
          profile.bio,
          profile.firstName,
          profile.lastName,
          profile.genre,
          profile.type,
          profile.tags,
          profile.location,
          profile.lat,
          profile.lng,
          profile.id
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
