const express = require('express');
const router = express.Router();
const user = express.Router();

// const middle = require('../middlewares.js');

router.get('/', (req, res) => {
  res.json({
    success: true,
    version: 0.1,
    message: 'Matcha API'
  });
});

// User Subroot
user.use('/signin', require('./signin.js'));
user.use('/signup', require('./signup.js'));

router.use('/user', user);

module.exports = router;
