const model = require('../models/signup.js');
const validator = require('validator');
const uuid = require('uuid');

module.exports = (body) => {
  console.log(uuid.v4());
  return new Promise((resolve, reject) => {
    if (validator.isEmail(body.mail) === false) {
      return reject('Mail invalid');
    } else {
      body.mail = body.mail.toLowerCase();
    }
    if (body.password !== body.validPwd) {
      return reject('Password does not match');
    }
    body.id = uuid();
    model.checkIfUserExist('alex').then((results) => {
      console.log(results);
      return resolve();
    }).catch((err) => {
      return reject(err);
    });
  });
};
