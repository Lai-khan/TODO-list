var express = require('express')
var app = express()
var db = require('./lib/db.js');
var bodyParser = require('body-parser');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
require('date-utils');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  // index 페이지
  db.query(`SELECT * FROM todolist`, function(error, todolist) {
    if(error) throw error;
    else {
      var title = 'Welcome';
      var list = template.List(todolist);
      var html = template.htmlIndex(title, list);
      res.send(html);
    }
  });
});

app.get('/page/:pageId', function(req, res, next) {
  // view 페이지
  db.query(`SELECT * FROM todolist, task WHERE todolist.id=task.todo_id AND todolist.title=?`, [req.params.pageId], function(error, task) {
    if(error) next(error);
    else {
      var title = req.params.pageId;
      var footer = `
      <div class="footer">
        <a href="/update/${title}">수정</a>
        <form action="/delete_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <input type="submit" value="삭제" onclick='btn_click("delete")'>
        </form>
      </div>
      `
      var list = template.View(title, task);
      var html = template.htmlView(title, footer, list);
      res.send(html);
    }
  });
});

app.get('/create', function(req, res, next) {
  // create 페이지
  var title = 'Create';
  var header = `
  <div id="article">
    <form name="create" onsubmit="return check()" action="/create_process" method="post">
      <div class="header">
        <h1>TODO List</h1>
        <h3>Title</h3>
        <input name="title" id="title" type="text">
      </div>
      <div class="addlist">
        <h3>Add list</h3>
        <input type="text" id="addlist">
        <button type="button" class="addbtn">Add</button>
        <p class="help">입력하고 Add를 누르면 추가됩니다.</p>
      </div>
      <h3>TODO list</h3>
      <ul class="todo-list">
      `;
  var footer = `
      </ul>
      <label class="container">선택 시 마감기한을 설정할 수 있습니다.
        <input type="hidden" name="deadline" value="0"> 
        <input type="checkbox">
        <div class="checkmark"></div>
      </label>
      <input type="date" id="due" name="dueDate">
      <div class="footer">
        <input type="submit" value="완료">
      </div>
    </form>
  </div>
  `;
  var html = template.htmlCU(title, header, footer, "");
  res.send(html);
});

app.post('/create_process', function(req, res, next) {
  // create 처리
  var post = req.body;
  var title = post.title;
  var check = post.checklist; // 0 or 1
  var list = post.list;  // ["str", "str", "str"...]
  var deadline = post.deadline; // 0 or 1
  var dueDate = post.dueDate;
  if(deadline == 1) {
    // 마감기한이 설정 O
    db.query(`INSERT INTO todolist (title, create_date, checked, deadline) 
    VALUES (?, NOW(), 1, ?)`, [title, dueDate], function(error, result) {
      if(error) next(error);
      else {
        if(check.length == 1) { // 항목이 1개면
          if(check == 1) { // if list checked
            db.query(`INSERT INTO task (todo_id, task, checked) 
            VALUES (?, ?, 1)`, [result.insertId, list], function(error2, result2) {
              if(error2) next(error2);
            });
          } else {
            db.query(`INSERT INTO task (todo_id, task, checked) 
            VALUES (?, ?, 0)`, [result.insertId, list], function(error2, result2) {
              if(error2) next(error2);
            });
          }
        }
        else {
          var i=0;
          while(i < list.length) {
            if(check[i] == 1) { // if list checked
              db.query(`INSERT INTO task (todo_id, task, checked) 
              VALUES (?, ?, 1)`, [result.insertId, list[i]], function(error2, result2) {
                if(error2) next(error2);
              });
            } else {
              db.query(`INSERT INTO task (todo_id, task, checked) 
              VALUES (?, ?, 0)`, [result.insertId, list[i]], function(error2, result2) {
                if(error2) next(error2);
              });
            }
            i = i+1;
          }
        }
        res.redirect(`/page/${title}`);
      }
    });
  } else {
    // 마감기한 체크 X
    db.query(`INSERT INTO todolist (title, create_date, checked) 
    VALUES (?, NOW(), ?)`, [title, 0], function(error, result) {
      if(error) next(error);
      else {
        if(check.length == 1) { // 항목이 1개면
          if(check == 1) { // if list checked
            db.query(`INSERT INTO task (todo_id, task, checked) 
            VALUES (?, ?, 1)`, [result.insertId, list], function(error2, result2) {
              if(error2) next(error2);
            });
          } else {
            db.query(`INSERT INTO task (todo_id, task, checked) 
            VALUES (?, ?, 0)`, [result.insertId, list], function(error2, result2) {
              if(error2) next(error2);
            });
          }
        }
        else {
          var i=0;
          while(i < list.length) {
            if(check[i] == 1) { // if list checked
              db.query(`INSERT INTO task (todo_id, task, checked) 
              VALUES (?, ?, 1)`, [result.insertId, list[i]], function(error2, result2) {
                if(error2) next(error2);
              });
            } else {
              db.query(`INSERT INTO task (todo_id, task, checked) 
              VALUES (?, ?, 0)`, [result.insertId, list[i]], function(error2, result2) {
                if(error2) next(error2);
              });
            }
            i = i+1;
          }
        }
        res.redirect(`/page/${title}`);
      }
    });
  }
});

app.get('/update/:pageId', function(req, res, next) {
  // update 페이지
  db.query(`SELECT * FROM todolist WHERE todolist.title=?`, [req.params.pageId],
  function(error, result) {
    if(error) next(error);
    else {
      db.query(`SELECT task.task, task.checked FROM task, todolist WHERE task.todo_id=todolist.id 
      AND todolist.title=?`, [req.params.pageId],
      function(error2, task) {
        if(error2) next(error2);
        else {
          var title = req.params.pageId;
          var header = `
          <div id="article">
            <form name="update" onsubmit="return check()" action="/update_process" method="post">
              <div class="header">
                <h1>TODO List</h1>
                <h3>Title</h3>
                <input name="old_id" type="hidden" value=${result[0].id}>
                <input name="title" id="title" type="text" value=${title}>
              </div>
              <div class="addlist">
                <h3>Add list</h3>
                <input type="text" id="addlist">
                <button type="button" class="addbtn">Add</button>
                <p class="help">입력하고 Add를 누르면 추가됩니다.</p>
              </div>
              <h3>TODO list</h3>
              <ul class="todo-list">
          `;
          var footer = "";
          if(result[0].checked == 1) {
            footer = `
              </ul>
                <label class="container">선택 시 마감기한을 설정할 수 있습니다.
                  <input type="hidden" name="deadline" value="1"> 
                  <input type="checkbox">
                  <div class="checkmark"></div>
                </label>
                <input type="date" id="due" name="dueDate" value=${result[0].deadline}>
                <div class="footer">
                  <input type="submit" value="완료">
                </div>
              </form>
            </div>
            `;
          } else {
            footer = `
              </ul>
                <label class="container">선택 시 마감기한을 설정할 수 있습니다.
                  <input type="hidden" name="deadline" value="0"> 
                  <input type="checkbox">
                  <div class="checkmark"></div>
                </label>
                <input type="date" id="due" name="dueDate">
                <div class="footer">
                  <input type="submit" value="완료">
                </div>
              </form>
            </div>
            `;
          }
          var list = template.updateList(task);
          var html = template.htmlCU(title, header, list, footer);
          res.send(html);
        }
      });
    }
  });
});

app.post('/update_process', function(req, res, next) {
  // update 처리
  var post = req.body;
  var title = post.title;
  var old_id = post.old_id;
  var check = post.checklist; // 0 or 1
  var list = post.list;  // ["str", "str", "str"...]
  var deadline = post.deadline; // 0 or 1
  var dueDate = new Date(post.dueDate);
  dueDate.toYMD('YYYY-MM-DD');
  console.log(check);
  if(deadline == 1) {
    // 마감기한이 체크 O
    db.query(`UPDATE todolist SET title=?, checked=?, deadline=? WHERE id=?`, 
    [title, deadline, dueDate, old_id], function(error, result) {
      if(error) next(error);
      else {
        db.query(`DELETE FROM task WHERE todo_id=?`, [old_id], 
        function(error1, result1) {
          if(error1) next(error1);
          else {
            if(check.length == 1) { // 항목이 1개면
              db.query(`INSERT INTO task (todo_id, task, checked) 
              VALUES (?, ?, ?)`, [old_id, list[0], check[0]], function(error2, result2) {
                if(error2) next(error2);
              });
            }
            else {
              var i=0;
              while(i < list.length) {
                db.query(`INSERT INTO task (todo_id, task, checked) 
                VALUES (?, ?, ?)`, [old_id, list[i], check[i]], function(error2, result2) {
                  if(error2) next(error2);
                });
                i = i+1;
              }
            }
            res.redirect(`/page/${title}`);
          }
        });
      }
    });
  } else {
    // 마감기한이 체크 X
    db.query(`UPDATE todolist SET title=?, checked=? WHERE id=?`, 
    [title, deadline, old_id], function(error, result) {
      if(error) next(error);
      else {
        db.query(`DELETE FROM task WHERE todo_id=?`, [old_id], 
        function(error1, result1) {
          if(error1) next(error1);
          else {
            if(check.length == 1) { // 항목이 1개면
              db.query(`INSERT INTO task (todo_id, task, checked) 
              VALUES (?, ?, ?)`, [old_id, list, check], function(error2, result2) {
                if(error2) next(error2);
              });
            }
            else {
              var i=0;
              while(i < list.length) {
                db.query(`INSERT INTO task (todo_id, task, checked) 
                VALUES (?, ?, ?)`, [old_id, list[i], check[i]], function(error2, result2) {
                  if(error2) next(error2);
                });
                i = i+1;
              }
            }
            res.redirect(`/page/${title}`);
          }
        });
      }
    });
  }

  /*
  if(deadline == 1) {
    // 마감기한이 설정 O
    console.log(1);
    db.query(`UPDATE todolist SET title=?, checked=1, deadline=? WHERE todolist.title=?`, 
    [title, dueDate, old_title], function(error, result) {
      if(error) next(error);
      else {
        console.log(2);
        db.query(`DELETE FROM task WHERE task.todo_id=?`, [old_id], 
        function(error1, result2) {
          if(error1) next(error1);
          else {
            console.log(3);
            if(check.length == 1) { // 항목이 1개면
              if(check[i] == 1) { // if list checked
                db.query(`INSERT INTO task (todo_id, task, checked) 
                VALUES (?, ?, 1)`, [result.insertId, list], function(error2, result2) {
                  if(error2) next(error2);
                  console.log(4);
                });
              } else {
                db.query(`INSERT INTO task (todo_id, task, checked) 
                VALUES (?, ?, 0)`, [result.insertId, list], function(error2, result2) {
                  if(error2) next(error2);
                  console.log(5);
                });
              }
            }
            else {
              console.log(6);
              var i=0;
              while(i < list.length) {
                if(check[i] == 1) { // if list checked
                  db.query(`INSERT INTO task (todo_id, task, checked) 
                  VALUES (?, ?, 1)`, [result.insertId, list[i]], function(error2, result2) {
                    if(error2) next(error2);
                    console.log(7);
                  });
                } else {
                  db.query(`INSERT INTO task (todo_id, task, checked) 
                  VALUES (?, ?, 0)`, [result.insertId, list[i]], function(error2, result2) {
                    if(error2) next(error2);
                    console.log(8);
                  });
                }
                i = i+1;
              }
            }
            res.redirect(`/page/${title}`);
          }
        });
      }
    });
  } else {
    // 마감기한 체크 X
    db.query(`UPDATE todolist SET title=?, checked=0, WHERE todolist.title=?`, 
    [title, old_title], function(error, result) {
      if(error) next(error);
      else {
        db.query(`DELETE FROM task WHERE task.todo_id=?`, [old_id], 
        function(error1, result2) {
          if(error1) next(error1)
          else {
            if(check.length == 1) { // 항목이 1개면
              if(check[i] == 1) { // if list checked
                db.query(`INSERT INTO task (todo_id, task, checked) 
                VALUES (?, ?, 1)`, [result.insertId, list], function(error2, result2) {
                  if(error2) next(error2);
                });
              } else {
                db.query(`INSERT INTO task (todo_id, task, checked) 
                VALUES (?, ?, 0)`, [result.insertId, list], function(error2, result2) {
                  if(error2) next(error2);
                });
              }
            }
            else {
              var i=0;
              while(i < list.length) {
                if(check[i] == 1) { // if list checked
                  db.query(`INSERT INTO task (todo_id, task, checked) 
                  VALUES (?, ?, 1)`, [result.insertId, list[i]], function(error2, result2) {
                    if(error2) next(error2);
                  });
                } else {
                  db.query(`INSERT INTO task (todo_id, task, checked) 
                  VALUES (?, ?, 0)`, [result.insertId, list[i]], function(error2, result2) {
                    if(error2) next(error2);
                  });
                }
                i = i+1;
              }
            }
            res.redirect(`/page/${title}`);
          }
        });
      }
    });
  }*/
});

app.post('/checked_process', function(req, res, next) {
  var post = req.body;
  var title = post.id;
  var list = post.checklist;
  db.query(`SELECT * from todolist, task 
  WHERE todolist.id=task.todo_id AND todolist.title=?`, 
  [title], function(error, result) {
    if(error) next(error)
    else {
      var i=0;
      while(i<result.length) {
        db.query(`UPDATE task SET checked=? 
        WHERE task.todo_id=? AND task.task=?`, 
        [list[i], result[i].todo_id, result[i].task], 
        function(error2, result2) {
          if(error2) next(error2)
        });
        i = i+1;
      }
      res.redirect(`/page/${title}`);
    }
  });
});

app.post('/delete_process', function(req, res, next) {
  var post = req.body;
  var title = post.id;
  db.query(`SELECT * from todolist, task 
  WHERE todolist.id=task.todo_id AND todolist.title=?`, 
  [title], function(error, result) {
    if(error) next(error);
    else {
      db.query(`DELETE FROM task WHERE task.todo_id=?`, [result[0].todo_id],
      function(error2, result2) {
        if(error2) next(error2);
        else {
          db.query(`DELETE FROM todolist WHERE todolist.title=?`, 
          [title], function(error3,  result3) {
            if(error3) next(error3);
            else {
              res.redirect('/');
            }
          });
        }
      });
    }
  });
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});









/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if(pathname === '/') {
    if(queryData.id === undefined) {
      // index 페이지
      fs.readdir('./data', function(error, fileList) {
        var title = 'Welcome';
        var header = `
        <div id="header">
          <div id="h-1">
            <h1><a href="/">TODO LIST</a></h1>
            <center>
              <p>Welcome to my TODO List Website</p>
              <a href="/create">Create New</a>
            </center>
          </div>
        </div>
        `;
        var list = template.List(fileList);
        var html = template.htmlIndex(title, header, '', list);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      // view 페이지
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, list) {
        var title = queryData.id;
        var header = `
        <div id="header">
          <div id="h-1">
            <h1><a href="/">TODO LIST</a></h1>
            <div id="center"><a href="/create">Create New</a></div>
          </div>
        </div>
        `;
        var footer = `
        <div class="footer">
          <form action="checked_process" method="post">
            <input type="hidden" name="id" value="${list}">
            <input type="submit" value="저장">
          </form>
          <a href="/update">수정</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="삭제">
          </form>
        </div>
        `
        var array = list.toString().split(',');
        var list = template.View(title, array);
        var html = template.htmlView(title, header, footer, list);
        response.writeHead(200);
        response.end(html);
      });
    }
  } else if(pathname === '/create') {
    // TODO 새로 만들 때
    var title = 'Create';
    var header = `
    <div id="header">
      <div id="h-1">
        <h1><a href="/">TODO LIST</a></h1>
        <div id="center"><a href="/create">Create New</a></div>
      </div>
    </div>
    <div id="article">
      <form name="create" action="create_process" method="post">
        <div class="header">
          <h1>TODO List</h1>
          <h3>Title</h3>
          <input name="title" id="title" type="text">
        </div>
        <div class="addlist">
          <h3>Add list</h3>
          <input type="text" id="addlist">
          <button class="addbtn">Add</button>
          <p class="help">입력하고 Add를 누르면 추가됩니다.</p>
        </div>
        <h3>TODO list</h3>
        <ul class="todo-list">
        `
    var body = `
        <li>
          <label>Study</label>
          <input name="list" type="text">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </li>
        <li class="checked">
          <label>Book</label>
          <input name="list" type="text">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </li>
        `;
    var footer = `
        </ul>
        <label class="container">선택 시 마감기한을 설정할 수 있습니다.
          <input name="deadline" type="checkbox">
          <div class="checkmark"></div>
        </label>
        <input type="date" name="dueDate">
        <div class="footer">
          <input type="submit" value="완료">
        </div>
      </form>
    </div>
    `;
    var html = template.htmlCU(title, header, footer, body);
    response.writeHead(200);
    response.end(html);
  } else if (pathname === '/create_process') {
    // create 처리
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var list = post.list;
      var deadline = post.deadline;
      var dueDate = post.date;
      fs.writeFile(`data/${title}`, list, function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  // } else if (pathname === '/update') {
  //   // TODO 항목(제목, 내용) 수정할 때
  // } else if (pathname === '/update_process') {
  //   // update 처리
  // } else if (pathname === '/checked_process') {
  //   // 할 일 완료 처리
  } else if (pathname === '/delete_process') {
    // delete 처리
    var body = '';
    request.on('data', function(data){
          body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function(error){
        response.writeHead(302, {Location: `/`});
        response.end();
      })
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);
*/