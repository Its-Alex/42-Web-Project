const db = require('./db.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3004 })

let conUserList = []

let broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data))
    } else {
      console.log(client.id + ' was unable to receive data')
    }
  })
}

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
                if (ws === elem) {
                  elem.id = res[0].id
                  conUserList.push(res[0].id)
                  broadcast({
                    method: 'conUserList',
                    conUserList
                  })
                }
                ws.send(`{"Connected": "true"}`)
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
            if (client.id === data.to && ws.id !== data.to) {
              client.send(JSON.stringify({
                method: 'notification',
                type: 'view',
                user: ws.id
              }))
            }
          })
          db.get().then(db => {
            db.query('INSERT INTO notifications (performUser, concernUser, notification, date) VALUES (?, ?, ?, ?)', [
              ws.id,
              data.to,
              'view',
              Date.now()
            ], (err, res) => {
              if (err) return console.log(err)
            })
          }).catch(err => console.log(err))
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
    delete conUserList.splice(conUserList.indexOf(ws.id), 1)
    broadcast({
      method: 'conUserList',
      conUserList
    })
    db.get().then((db) => {
      db.query('UPDATE profiles SET lastConnect = ? WHERE profiles.userId = ?', [Date.now(), ws.id], (err, res) => {
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
  wss.clients.forEach(client => {
    if (client.isAlive === false || client.id === undefined) return client.terminate()
    client.isAlive = false
    client.ping('', false, true)
  })
}, 30000)

module.exports = {
  broadcast,
  sendToId: (id, data) => {
    wss.clients.forEach(ws => {
      if (ws.id !== id) return
      ws.send(JSON.stringify(data))
    })
  }
}
