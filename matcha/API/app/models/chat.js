const db = require('../db.js')

module.exports = {
  getChatPeople: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT name, performUser, concernUser FROM likes INNER JOIN users ON likes.concernUser = users.id WHERE performUser = ? OR concernUser = ?', [id, id], (err, res) => {
          if (err) return reject(err)
          if (res.length === 0) return reject(new Error('No user found!'))
          let people = []
          res.forEach(first => {
            res.forEach((second, index) => {
              if (first.performUser === id && first.performUser === second.concernUser) {
                if (first.concernUser === second.performUser) {
                  people.push({
                    id: first.concernUser,
                    name: first.name
                  })
                }
              }
            })
          })
          return resolve(people)
        })
      }).catch(err => reject(err))
    })
  },
  getChatWith: (performId, concernId) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM chats WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY date ASC',
        [performId, concernId, concernId, performId], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}
