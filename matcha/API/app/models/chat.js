const db = require('../db.js')

module.exports = {
  getChatPeople: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT name, performUser, concernUser FROM likes INNER JOIN users ON likes.performUser = users.id WHERE performUser = ? OR concernUser = ?', [id, id], (err, res) => {
          if (err) reject(err)
          let people = []
          console.log(res)
          res.forEach(first => {
            res.forEach((second, index) => {
              if (first.performUser === id && first.performUser === second.concernUser) {
                if (first.concernUser === second.performUser) {
                  people.push({
                    id: first.concernUser,
                    name: first.name
                  })
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
