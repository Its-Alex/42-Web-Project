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
  console.log(ws);
  ws.on('message', function incoming (message) {
    console.log('received: %s', message);
  });
  ws.send('something');
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

<<<<<<< HEAD:matcha/app/index.js
process.on('SIGINT', function() {
=======
// End cnnection to database when exit
process.on('SIGINT', () => {
  console.log('Stop sever');
>>>>>>> refs/remotes/origin/master:matcha/API/app/index.js
  db.end();
  process.exit();
});
