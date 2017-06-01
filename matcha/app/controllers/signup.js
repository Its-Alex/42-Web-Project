const model = require('../models/signup.js');
const valid = require('validator');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = (body) => {
  return new Promise((resolve, reject) => {
    if (body.name === undefined || body.mail === undefined || body.password === undefined || body.validPwd === undefined) {
      return reject('Invalid body');
    }
    if (valid.isEmpty(body.name) || valid.isEmpty(body.mail) || valid.isEmpty(body.password) || valid.isEmpty(body.validPwd)) {
      return reject('Empty field(s)');
    }
    if (body.password !== body.validPwd) {
      return reject('Password does not match');
    }
    if (body.name.length > 36 || !body.name.match(/^([a-zA-Z0-9]+)$/)) {
      return reject('Invalid name');
    }
    if (!valid.isEmail(body.mail)) {
      return reject('Invalid mail');
    } else {
      body.mail = body.mail.toLowerCase();
    }
    if (!body.password.match(/^([a-zA-Z0-9!@#$%^&*()\\\/]+)$/)) {
      return reject('Invalid password');
    } else {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    body.id = uuid();
    model.checkIfUserExist('alex').then((results) => {
      if (!results) {
        model.insertUser(body).then(() => {
          return resolve();
        }).catch((err) => {
          return reject(err);
        });
      } else {
        return reject('Mail is already taken');
      }
      return resolve();
    }).catch((err) => {
      return reject(err);
    });
  });
};
