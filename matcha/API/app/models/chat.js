const db = require('../db.js')

module.exports = {
  getChatPeople: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM likes WHERE performUser = ? OR concernUser = ?', [id, id], (err, res) => {
          if (err) reject(err)
          let people = []
          res.forEach(first => {
            res.forEach((second, index) => {
              if (first.performUser === id && first.performUser === second.concernUser) {
                if (first.concernUser === second.performUser) {
                  people.push(first.concernUser)
                  res.splice(index, 1)
                }
              }
            }, this)
          }, this)
          resolve(people)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}
