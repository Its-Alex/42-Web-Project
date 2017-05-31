const express = require('express');
const router = express.Router();

// const middle = require('../middlewares.js');

router.get('/', (req, res) => {
  res.json({
    success: true,
    version: 0.1,
    message: "Matcha API"
  });
});

router.use('/signin', require('./signin.js'));
// router.use('/signup', require('./signup.js'))
// router.use('/tokens', require('./tokens.js'))

module.exports = router;