const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const db = require('./db.js');
const port = 3001;

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3002 });

app.disable('x-powered-by');
app.use(bodyParser.json());
db.connect();

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log('received: %s', message);
  });
  ws.on('close', (event) => {
    console.log('Websocket closed');
  });
  ws.send('Salut');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Global api route
app.use('/', require('./routes/index.js'));

// 404 not found api response
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found'
  });
});

// Start web server
app.listen(port, () => {
  console.log('Start at ' + port);
});

// End connecton with database
process.on('SIGINT', () => {
  db.end();
  process.exit();
});
