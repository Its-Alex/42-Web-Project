const express = require('express');
const router = express.Router();

const signin = require('../controllers/signin.js');

router.post('/', (req, res) => {
  signin(req.body, req.headers['x-forwarded-for']).then(() => {
    res.json({
      success: true
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      message: err
    });
  });
});

module.exports = router;
