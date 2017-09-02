const db = require('./db.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3004 })

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (err) {
        return console.log('Receive invalid WS data')
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
              if (err) return console.log(err)
              if (res.length === 0) return console.log('User not found')
              wss.clients.forEach((elem) => {
                if (ws === elem) elem.id = res[0].id
                ws.send('Connected')
              })
            })
          }).catch((err) => console.log(err))
        }
        break
      case 'sendChat':
        if (data.to && typeof data.to === 'string') {
          if (data.msg && typeof data.msg === 'string') {
            wss.clients.forEach(client => {
              if (client.id === undefined) return
              if (client.id === data.to) {
                db.get().then((db) => {
                  db.query('INSERT INTO chats (sender, receiver, text, date) VALUES (?, ?, ?, ?)', [
                    ws.id,
                    client.id,
                    data.msg,
                    Date.now()
                  ], (err, res) => {
                    if (err) return console.log(err)
                    client.send(JSON.stringify({
                      method: 'chat',
                      type: 'receive',
                      from: ws.id,
                      for: client.id
                    }))
                  })
                }).catch((err) => console.log(err))
              }
            })
          }
        }
        break
      case 'viewProfile':
        if (data.to && typeof data.to === 'string') {
          wss.clients.forEach(client => {
            if (client.id === data.to && client.id !== data.to) {
              db.get().then(db => {
                db.query('INSERT INTO notifications (performUser, concernUser, notification, date)', [
                  ws.id,
                  client.id,
                  'view',
                  Date.now()
                ], (err, res) => {
                  if (err) return console.log(err)
                  client.send(JSON.stringify({
                    method: 'notification',
                    type: 'view',
                    user: ws.id
                  }))
                })
              }).catch(err => console.log(err))
            }
          })
        }
        break
      default:
        console.log('Receive invalid WS method')
        break
    }
  })

  /**
   * Function to know if socket is not broken
   */
  ws.on('pong', (event) => {
    ws.isAlive = true
  })

  /**
   * Handle WebSocket errors
   */
  ws.on('error', (error) => {
    console.log(error)
  })

  /**
   * Update last time connected in database
   */
  ws.on('close', (event) => {
    db.get().then((db) => {
      db.query('UPDATE profils SET lastConnect = ? WHERE profils.userId = ?', [Date.now(), ws.id], (err, res) => {
        if (err) return console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  })
})

/**
 * Update all connections and close those that are broken
 */
setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false || ws.id === undefined) return ws.terminate()
    ws.isAlive = false
    ws.ping('', false, true)
  })
}, 10000)

module.exports = {
  sendToId: (id, data) => {
    wss.clients.forEach(ws => {
      if (ws.id !== id) return
      ws.send(JSON.stringify(data))
    })
  }
}
