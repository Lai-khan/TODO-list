var mysql = require('mysql');
const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PWRD,
  database : process.env.DB_NAME,
  connectionLimit : 50
});
// const db = mysql.createConnection({
//   host     : db_config.host,
//   user     : db_config.user,
//   password : db_config.password,
//   database : db_config.database,
//   // multipleStatements: true
// });
db.connect();

var pool = mysql.createPool(db);
// Get Connection in Pool
pool.getConnection(function(err,connection){
  if(!err){
    //connected!
  }
  // 커넥션을 풀에 반환
  connection.release();
});

module.exports = db;
