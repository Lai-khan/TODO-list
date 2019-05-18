var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('template.js');

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
        var template = template.HTML(title, header, '', list);
        response.writeHead(200);
        response.end(template);
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
        var template = template.HTML(title, header, footer, list);
        response.writeHead(200);
        response.end(template);
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
    var template = template.HTML(title, header, footer, body);
    response.writeHead(200);
    response.end(template);
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
