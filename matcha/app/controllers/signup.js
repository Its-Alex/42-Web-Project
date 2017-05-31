const model = require('../models/signup.js');

module.exports = () => {
  return new Promise((resolve, reject) => {
    model.checkIfUserExist('alex').then((results) => {
      console.log('Results :');
      console.log(results);
      return resolve();
    }).catch((err) => {
      return reject(err);
    });
  });
};
