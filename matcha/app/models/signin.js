const db = require('../db.js');

module.exports = {
  checkIfUserExist: () => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users', {}, (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }).catch((err) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },
  insertUser: (user) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO users (id, name, mail, password, date) VALUES (?, ?, ?, ?, ?)', user, (err, results) => {
          console.log(results);
          return resolve();
        });
      }).catch((err) => {
        if (err) {
          return reject (err);
        }
      });
    });
  }
};
