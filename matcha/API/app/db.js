const mysql = require('mysql')
const execSQL = require('exec-sql')

execSQL.connect({
  host: 'sql.itsalex.fr',
  user: 'matcha',
  password: '123456',
  database: 'matcha'
})

execSQL.executeFile('./config/matcha.sql', (err) => {
  if (err) console.log(err)
  execSQL.disconnect()
})

var error
var db

let connect = () => {
  db = mysql.createConnection({
    host: 'sql.itsalex.fr',
    user: 'matcha',
    password: '123456',
    database: 'matcha',
    debug: false
  })
  db.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      error = err.stack
    }
    if (db.threadId !== null) {
      // console.log('Connected as id ' + db.threadId)
    } else {
      // console.log('Connection to database failed!')
      process.exit(1)
    }
  })
  db.on('error', err => {
    console.log(err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      db = connect()
    }
  })
  return db
}

module.exports = {
  connect,
  get: () => {
    return new Promise((resolve, reject) => {
      if (error === undefined) {
        return resolve(db)
      } else {
        return reject(error)
      }
    })
  },
  end: () => {
    db.end((err) => {
      if (err) {
        console.log('Database end error : ' + err)
      }
    })
  }
}
