var mysql = require('mysql');
var db_config = require('./db_config.json');
const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PWRD,
  database : process.env.DB_NAME
});
// const db = mysql.createConnection({
//   host     : db_config.host,
//   user     : db_config.user,
//   password : db_config.password,
//   database : db_config.database,
//   // multipleStatements: true
// });
db.connect();

module.exports = db;
