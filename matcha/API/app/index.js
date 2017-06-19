const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3002 })
const db = require('./db.js')
const port = 3005

db.connect()

wss.on('connection', function connection (ws) {
  console.log(ws)

  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })
  ws.on('close', (event) => {
    db.get().then((db) => {
      db.query('UPDATE profils JOIN users on profils.userId = users.id SET profils.lastConnect = ? where users.id = ?')
    }).catch((err) => {
      console.log(new Error(err))
    })
  })
  ws.send('Salut')
})

app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())
app.enable('trust proxy')

// Global api route
app.use('/', require('./routes/index.js'))

// 404 not found api response
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'URL not found'
  })
})

// Start web server
app.listen(port, () => {
  console.log('Start at ' + port)
})

// End connecton with database
process.on('SIGINT', () => {
  db.end()
  process.exit()
})
