const model = require('../models/signin.js');

module.exports = () => {
  return new Promise((resolve, reject) => {
    model.checkIfUserExist().then(() => {});
    return resolve();
  }).catch((err) => {
    console.log(err);
    return err;
  });
};
