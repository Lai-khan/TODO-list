var express = require('express')
var app = express()
var db = require('./lib/db.js');
var bodyParser = require('body-parser');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
require('date-utils');
var todo = require('./lib/todo.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  // index 페이지
  todo.home(req, res);
});

app.get('/page/:pageId', function(req, res, next) {
  // view 페이지
  todo.page(req, res, next);
});

app.get('/create', function(req, res, next) {
  // create 페이지
  todo.create(req, res, next);
});

app.post('/create_process', function(req, res, next) {
  // create 처리
  todo.create_process(req, res, next);
});

app.get('/update/:pageId', function(req, res, next) {
  // update 페이지
  todo.update(req, res, next);
});

app.post('/update_process', function(req, res, next) {
  // update 처리
  todo.update_process(req, res, next);
});

app.post('/checked_process', function(req, res, next) {
  todo.checked_process(req, res, next);
});

app.post('/delete_process', function(req, res, next) {
  todo.delete_process(req, res, next);
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
