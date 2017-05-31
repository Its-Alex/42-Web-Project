const db = require('../db.js');

module.exports = {
  checkIfUserExist: (mail) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users WHERE mail = ?', {mail}, (err, results) => {
          db.end();
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      }).catch((err) => {
        if (err) {
          return reject(err);
        }
      });
    });
  }
};
