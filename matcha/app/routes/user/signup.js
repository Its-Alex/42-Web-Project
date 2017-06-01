const express = require('express');
const router = express.Router();

const signup = require('../../controllers/user/signup.js');

router.post('/', (req, res) => {
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
