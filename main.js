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
      <title>TODO List</title>
      <link rel="stylesheet" href="style.css">
      <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    </head>
    <body>
      <div id="header">
        <div id="h-1">
          <div id="notice">notification</div>
          <h1><a href="index.html">TODO LIST</a></h1>
          <center>
            <p>Welcome to my TODO List Website</p>
            <a href="create.html">Create New</a>
          </center>
        </div>
      </div>
      <div class="container">
        <div class="box">
          <div class="content">
            <h2>Today1</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today2</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today3</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today4</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today5</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today6</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today7</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today8</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today9</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="content">
            <h2>Today10</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
  response.end(template);
});
app.listen(3000);
