const bodyParser = require('body-parser');
const express = require('express');
const db =require('./db.js');
const app = express();
const port = 3000;

app.disable('x-powered-by');
app.use(bodyParser.json());
db.connect();

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

process.on('SIGINT', function() {
  console.log("Stop sever");
  db.end();
  process.exit();
});
