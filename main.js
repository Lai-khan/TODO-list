var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  if(_url == '/') {
    title = 'Welcome';
  }
  if(_url == '/fabicon.ico') {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
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
  response.end(template);
});
app.listen(3000);
