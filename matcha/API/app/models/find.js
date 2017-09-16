const db = require('../db.js')

module.exports = {
  getResults: (userProfile, params) => {
    return new Promise((resolve, reject) => {
      let query ='SELECT * from profiles \
INNER JOIN users ON profiles.userId = users.id \
WHERE users.id != ? AND popularity > ? AND popularity < ?'

      if (userProfile.type === 'M') {
        if (userProfile.genre === 'M') {
          query += ` AND profiles.genre = 'M' AND (profiles.type = 'M' OR profiles.type = 'B')`
        } else {
          query += ` AND profiles.genre = 'M' AND (profiles.type = 'F' OR profiles.type = 'B')`
        }
      } else if (userProfile.type === 'F') {
        if (userProfile.genre === 'F') {
          query += ` AND profiles.genre = 'F' AND (profiles.type = 'F' OR profiles.type = 'B')`
        } else {
          query += ` AND profiles.genre = 'F' AND (profiles.type = 'M' OR profiles.type = 'B')`
        }
      } else if (userProfile.type === 'B') {
        query += ` AND (profiles.type = 'B' OR profiles.type = ?)`
        params.push(userProfile.genre)
      }
      db.get().then(db => {
        db.query(query, params, (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}