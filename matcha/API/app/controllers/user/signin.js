const model = require('../../models/user.js');
const valid = require('validator');
const bcrypt = require('bcryptjs');

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&|`;
  var token = '';

  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * 63))];
  }
  return (token);
}

module.exports = (body) => {
  return new Promise((resolve, reject) => {
    if (!valid.isEmail(body.mail)) {
      return reject(new Error('Invalid mail'));
    } else {
      body.mail = body.mail.toLowerCase();
    }
    if (!body.password.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/)) {
      return reject(new Error('Invalid password'));
    }

    model.getUser(body.mail).then((user) => {
      if (user[0] === undefined) {
        return reject(new Error('User not found'));
      }
      if (!bcrypt.compareSync(body.password, user[0].password)) {
        return reject(new Error('Invalid password'));
      }
      var token = genToken();
      model.insertToken(user[0].id, token).then(() => {
        return resolve(token);
      }).catch((err) => {
        return reject(err);
      });
    }).catch((err) => {
      return reject(err);
    });
  });
};
