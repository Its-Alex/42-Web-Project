const db = require('./db.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3002 })
const clients = {}

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (data) {
    if (typeof data === 'string') data = JSON.parse(data)
    else {
      ws.send('Bad request')
      return
    }

    if (data.method === undefined) return
    if (data.method === 'connect') {
      if (data.token && typeof data.token === 'string') {
        db.get().then((db) => {
          db.query('SELECT users.id FROM users JOIN tokens ON users.id = tokens.user WHERE tokens.token = ?', [data.token], (err, res) => {
            if (err) return console.log(new Error(err))
            clients[res[0].id] = ws
          })
        }).catch((err) => {
          console.log(new Error(err))
        })
      }
    }
  })

  ws.on('pong', (event) => {
    this.isAlive = true
  })

  ws.on('error', (event) => {
    Object.keys(clients).map((key, index) => {
      if (clients[key] === ws) {
        db.get().then((db) => {
          db.query('UPDATE profils SET lastConnect = ? WHERE profils.userId = ?', [new Date().getTime(), key], (err, res) => {
            if (err) return console.log(new Error(err))
          })
        }).catch((err) => {
          console.log(new Error(err))
        })
        delete clients[key]
      }
    })
  })

  ws.on('close', (event) => {
    Object.keys(clients).map((key, index) => {
      if (clients[key] === ws) {
        db.get().then((db) => {
          db.query('UPDATE profils SET lastConnect = ? WHERE profils.userId = ?', [new Date().getTime(), key], (err, res) => {
            if (err) return console.log(new Error(err))
          })
        }).catch((err) => {
          console.log(new Error(err))
        })
        clients[key].terminate()
        delete clients[key]
      }
    })
  })
})

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate()

    ws.isAlive = false
    ws.ping('', false, true)
  })
}, 30000)
