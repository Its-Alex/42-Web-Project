const express = require('express');
const router = express.Router();

const signup = require('../controllers/signup.js');

router.post('/', (req, res) => {
  console.log(req.body);
  signup().then(() => {
    res.json({
      success: true
    });
  }).catch((err) => {
    console.error(err);
    res.json({
      success: false,
      message: err
    });
  });
});

module.exports = router;
