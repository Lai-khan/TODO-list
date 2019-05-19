var mysql = require('mysql');
const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PWRD,
  database : process.env.DB_NAME,
  PORT : process.env.PORT || 3000,
  connectionLimit : 100
});
db.connect();

var pool = mysql.createPool(db);

pool.getConnection(function(err, connection) {
  connection.query("SELECT * FROM todolist", function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`SELECT * FROM todolist, task WHERE todolist.id=task.todo_id AND todolist.title=?`, [req.params.pageId], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO todolist (title, create_date, checked, deadline) 
  VALUES (?, NOW(), 1, ?)`, [title, dueDate], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 1)`, [result.insertId, list], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 0)`, [result.insertId, list], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 1)`, function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO todolist (title, create_date, checked) 
  VALUES (?, NOW(), ?)`, [title, 0], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 1)`, [result.insertId, list], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 0)`, [result.insertId, list], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 1)`, [result.insertId, list[i]], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, 0)`, [result.insertId, list[i]], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`SELECT * FROM todolist WHERE todolist.title=?`, [req.params.pageId], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`SELECT task.task, task.checked FROM task, todolist WHERE task.todo_id=todolist.id 
  AND todolist.title=?`, [req.params.pageId], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`UPDATE todolist SET title=?, checked=?, deadline=? WHERE id=?`, 
  [title, deadline, dueDate, old_id], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`DELETE FROM task WHERE todo_id=?`, [old_id], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, ?)`, [old_id, list[0], check[0]], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, ?)`, [old_id, list[i], check[i]], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`UPDATE todolist SET title=?, checked=? WHERE id=?`, 
  [title, deadline, old_id], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`DELETE FROM task WHERE todo_id=?`, [old_id], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, ?)`, [old_id, list, check], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO task (todo_id, task, checked) 
  VALUES (?, ?, ?)`, [old_id, list[i], check[i]], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`SELECT * from todolist, task 
  WHERE todolist.id=task.todo_id AND todolist.title=?`, 
  [title], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`UPDATE task SET checked=? 
  WHERE task.todo_id=? AND task.task=?`, 
  [list[i], result[i].todo_id, result[i].task], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`SELECT * from todolist, task 
  WHERE todolist.id=task.todo_id AND todolist.title=?`, 
  [title], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`DELETE FROM todolist WHERE todolist.title=?`, 
  [title], function(err, rows) {
    connection.release()
  });
});

pool.getConnection(function(err, connection) {
  connection.query(`DELETE FROM task WHERE task.todo_id=?`, [result[0].todo_id], function(err, rows) {
    connection.release()
  });
});

function keepAlive(){
  pool.getConnection(function(err, connection){
    if(err) { return; }
    connection.ping();
    connection.release();
  });
}
setInterval(keepAlive, 60*1000);

module.exports = db;


      // const db = mysql.createConnection({
      //   host     : db_config.host,
      //   user     : db_config.user,
      //   password : db_config.password,
      //   database : db_config.database,
      //   // multipleStatements: true
      // });