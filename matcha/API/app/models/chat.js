const db = require('../db.js')
const modelBlock = require('./block.js')

module.exports = {
  getChatPeople: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT name, performUser, concernUser FROM likes INNER JOIN users ON likes.concernUser = users.id WHERE performUser = ? OR concernUser = ?', [id, id], (err, res) => {
          if (err) reject(err)
          if (res.length === 0) return null
          let people = []
          res.forEach(first => {
            res.forEach((second, index) => {
              if (first.performUser === id && first.performUser === second.concernUser) {
                if (first.concernUser === second.performUser) {
                  people.push({
                    id: first.concernUser,
                    name: first.name,
                    chat: []
                  })
                  db.query('SELECT * FROM chats WHERE receiver = ? OR sender = ? ORDER BY date ASC', [
                    id,
                    id
                  ], (err, res) => {
                    if (err) reject(err)
                    res.forEach(elem => {
                      people.forEach((user, index) => {
                        if (user.id === elem.sender || user.id === elem.receiver) {
                          people[index].chat.push({
                            text: elem.text,
                            date: elem.date
                          })
                        }
                      })
                    }, this)
                    resolve(people)
                  })
                }
              }
            })
          })
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
