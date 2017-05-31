const model = require('../models/signin.js');

module.exports = () => {
  return new Promise((resolve, reject) => {
    return resolve(model.checkIfUserExist);
  }).catch((err) => {
    console.log(err);
    return reject(err);
  });
};