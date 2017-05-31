const db = require('../db.js');

module.exports = {
  checkIfUserExist: () => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users', {}, (err, results) => {
          // db.end();
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(results);
          return resolve();
        });
      }).catch((err) => {
        if (err) {
          return reject(err);
        }
      });
    });
  }
};
