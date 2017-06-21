const db = require('./db.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3002 })

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (err) {
        return console.log(new Error('Receive invalid WS data'))
      }
    } else {
      ws.send('Bad request')
      return
    }

    if (data.method === undefined) return
    switch (data.method) {
      case 'connect':
        if (data.token && typeof data.token === 'string') {
          db.get().then((db) => {
            db.query('SELECT users.id FROM users JOIN tokens ON users.id = tokens.user WHERE tokens.token = ?', [data.token], (err, res) => {
              if (err) return console.log(new Error(err))
              if (res.length === 0) return console.log(new Error('User not found'))
              wss.clients.forEach((elem) => {
                if (ws === elem) elem.id = res[0].id
              })
            })
          }).catch((err) => {
            return console.log(new Error(err))
          })
        }
        break
      case 'send':
        if (data.to && typeof data.to === 'string') {
          if (data.msg && typeof data.msg === 'string') {
            wss.clients.forEach(function (client) {
              if (client.id === undefined) return
              if (client.id === data.to) {
                client.send(data.msg)
                db.get().then((db) => {
                  db.query('INSERT INTO chats (sender, receiver, text, date) VALUES (?, ?, ?, ?)', [ws.id, client.id, data.msg, new Date().getTime()], (err, res) => {
                    if (err) return console.log(new Error(err))
                  })
                }).catch((err) => {
                  console.log(new Error(err))
                })
              }
            })
          }
        }
        break
      default:
        console.log(new Error('Receive invalid WS method'))
        break
    }
  })

  ws.on('pong', (event) => {
    ws.isAlive = true
  })

  ws.on('error', (error) => {
    console.log(new Error(error))
  })

  ws.on('close', (event) => {
    db.get().then((db) => {
      db.query('UPDATE profils SET lastConnect = ? WHERE profils.userId = ?', [new Date().getTime(), ws.id], (err, res) => {
        if (err) return console.log(new Error(err))
      })
    }).catch((err) => {
      console.log(new Error(err))
    })
  })
})

setInterval(() => {
  wss.clients.forEach(function (ws) {
    if (ws.isAlive === false) return ws.terminate()
    ws.isAlive = false
    ws.ping('', false, true)
  })
}, 30000)
