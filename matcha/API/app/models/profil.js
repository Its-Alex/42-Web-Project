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
  }
}
