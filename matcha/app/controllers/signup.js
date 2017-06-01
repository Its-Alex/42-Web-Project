const model = require('../models/signup.js');
const validator = require('validator');
const uuid = require('uuid/V4');

module.exports = (body) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmail(req.body.mail) === false) {
      return reject('Mail invalid');
    } else {
      req.body.mail = req.body.mail.toLowerCase();
    }
    if (req.body.password)
    if (req.body.password !== req.body.password1) {
      return reject('Password does not match');
    }
    req.body.id = uuid();
    model.checkIfUserExist('alex').then((results) => {
      console.log(results);
      return resolve();
    }).catch((err) => {
      return reject(err);
    });
  });
};
