const express = require('express');
const router = express.Router();

const middle = require('../middlewares.js');

router.get('/', (req, res) => {
  res.json({
    success: true,
    version: 0.1,
    message: 'Matcha API'
  });
});

// All roots
router.get('/users', require('../controllers/users.js'));
router.use('/user', middle('USER'), require('./user.js'));

module.exports = router;
