const express = require('express');
const router = express.Router();

// const middle = require('../middlewares.js');
const signup = require('../controllers/user/signup.js');

// User root
router.get('/', require('../controllers/user/getUser.js'));
router.post('/signin', require('../controllers/user/signin.js'));
router.post('/signup', require('../controllers/user/signup.js'));

module.exports = router;
