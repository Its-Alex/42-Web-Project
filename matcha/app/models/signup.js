const db = require('../db.js');

module.exports = {
  checkIfUserExist: (mail) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users WHERE mail = ?', {mail}, (err, results) => {
          if (err) {
            return reject(err);
          }
          if (results.length > 0) {
            return resolve(true);
          } else {
            return resolve(false);
          }
        });
      }).catch((err) => {
        if (err) {
          return reject(err);
        }
      });
    });
  }
};
