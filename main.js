var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if(pathname === '/') {
    if(queryData.id === undefined) {
      // index 페이지
      var title = 'Welcome';
      var template = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" name="viewport" content="width=device-width" initial-scale="1.0">
          <title>TODO List - ${title}</title>
          <link rel="stylesheet" href="style.css">
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        </head>
        <body>
          <div id="header">
            <div id="h-1">
              <h1><a href="/">TODO LIST</a></h1>
              <center>
                <p>Welcome to my TODO List Website</p>
                <a href="create_update.html">Create New</a>
              </center>
            </div>
          </div>
          <div class="container">
            <a href="/?id=Shopping">
              <div class="box">
                <div class="icon">1</div>
                <div class="content">
                  <h1>Shopping List</h1>
                </div>
              </div>
            </a>
            <a href="/?id=Study">
            <div class="box">
              <div class="icon">2</div>
              <div class="content">
                <h1>Study</h1>
              </div>
            </div>
            </a>
            <a href="/?id=Meeting">
            <div class="box">
              <div class="icon">3</div>
              <div class="content">
                <h1>Meeting</h1>
              </div>
            </div>
            </a>
            <a href="/?id=Task">
            <div class="box">
              <div class="icon">4</div>
              <div class="content">
                <h1>Task</h1>
              </div>
            </div>
            </a>
            <a href="/?id=Travel Plan">
            <div class="box">
              <div class="icon">5</div>
              <div class="content">
                <h1>Travel Plan</h1>
              </div>
            </div>
            </a>
          </div>
        </body>
      </html>
      `;
      response.writeHead(200);
      response.end(template);
    } else {
      // view 페이지
    }
  // } else if(pathname === '/create') {
  //   // TODO 새로 만들 때
  // } else if (pathname === '/create_process') {
  //   // create 처리
  // } else if (pathname === '/update') {
  //   // TODO 항목(제목, 내용) 수정할 때
  // } else if (pathname === '/update_process') {
  //   // update 처리
  // } else if (pathname === '/delete_process') {
  //   // delete 처리
  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);
