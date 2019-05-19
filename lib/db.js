var mysql = require('mysql');
var db_config = require('./db_config.json');
var db = mysql.createConnection({
  host     : db_config.host,
  user     : db_config.user,
  password : db_config.password,
  database : db_config.database,
  // multipleStatements: true
});
db.connect();

module.exports = db;
