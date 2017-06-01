const express = require('express');
const router = express.Router();

const signin = require('../../controllers/user/signin.js');

router.post('/', (req, res) => {
  signin(req.body).then((token) => {
    res.json({
      success: true,
      token
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      message: err.message
    });
  });
});

module.exports = router;
