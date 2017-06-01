const express = require('express');
const router = express.Router();

// const middle = require('../middlewares.js');
const signup = require('../controllers/user/signup.js');

// User root
router.post('/signin', require('../controllers/user/signin.js'));
router.post('/signup', (req, res) => {
  signup(req.body).then(() => {
    res.json({
      success: true
    });
  }).catch((err) => {
    console.error(err);
    res.json({
      success: false,
      message: err.message
    });
  });
});

module.exports = router;
