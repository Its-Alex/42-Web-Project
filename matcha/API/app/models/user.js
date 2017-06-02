const db = require('../db.js');

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users', (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        })
      }).catch((err) => {
        if (err){
          reject(err);
        }
      });
    });
  },
  getUser: (mail) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('SELECT * FROM users WHERE mail = ?', [mail], (err, results) => {
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
  },
  insertToken: (userId, token) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO tokens (userId, token, date) VALUES (?, ?, ?)', [userId, token, new Date().getTime()], (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }).catch((err) => {
        return reject(err);
      });
    });
  },
  insertUser: (body) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.query('INSERT INTO users (id, name, mail, password, date) VALUES (?, ?, ?, ?, ?)', [
          body.id,
          body.name,
          body.mail,
          body.password,
          new Date().getTime()], (err, results) => {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
      });
    });
  }
};
