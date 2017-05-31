var mysql      = require('mysql');

var error;
var db;

module.exports = {
  connect: () => {
    db = mysql.createConnection({
      host: 'sql.itsalex.fr',
      user: 'matcha',
      password: '123456',
      database: 'matcha',
      debug: true
    });
    db.connect((err) => {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        error = err.stack;
      }
      console.log('Connected as id ' + db.threadId);
    });
  },
  get: () => {
    return new Promise((resolve, reject) => {
      if (error === undefined) {
        return resolve(db);
      } else {
        return reject(error);
      }
    });
  }
};
