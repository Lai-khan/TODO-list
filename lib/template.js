module.exports = {
  htmlIndex:function(title, list) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" name="viewport" content="width=device-width" initial-scale="1.0">
        <title>TODO List - ${title}</title>
        <link rel="stylesheet" href="/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
      </head>
      <body>
        <div id="header">
          <div id="h-1">
            <h1><a href="/">TODO LIST</a></h1>
            <center>
              <p>Welcome to my TODO List Website</p>
              <a href="/create">Create New</a>
            </center>
          </div>
        </div>
      ${list}
      </body>
    </html>
    `;
  },
  htmlCU:function(title, header, footer) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" name="viewport" content="width=device-width" initial-scale="1.0">
        <title>TODO List - ${title}</title>
        <link rel="stylesheet" href="/css/style_cu.css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      </head>
      <body>
      <div id="header">
        <div id="h-1">
          <h1><a href="/">TODO LIST</a></h1>
          <div id="center"><a href="/create">Create New</a></div>
        </div>
      </div>
      ${header}
      ${footer}
      <script type="text/javascript" src="/js/script_cu.js"></script>
      </body>
    </html>
    `;
  },
  htmlView:function(title, footer, list) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" name="viewport" content="width=device-width" initial-scale="1.0">
        <title>TODO List - ${title}</title>
        <link rel="stylesheet" href="/css/style_view.css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      </head>
      <body>
        <div id="header">
          <div id="h-1">
            <h1><a href="/">TODO LIST</a></h1>
            <div id="center"><a href="/create">Create New</a></div>
          </div>
        </div>
      ${list}
      ${footer}
      <script type="text/javascript" src="/js/script_view.js"></script>
      </body>
    </html>
    `;
  },
  List:function(todolist) {
    var list = `<div class="container">`;
    var i=0;
    while(i < todolist.length) {
      list = list + `
      <a href="/page/${todolist[i].title}">
        <div class="box">
          <div class="icon">${i+1}</div>
          <div class="content">
            <h1>${todolist[i].title}</h1>
          </div>
        </div>
      </a>
      `;
      i = i+1;
    }
    list = list + '</div>';
    return list;
  },View:function(title, taskList) {
    var list = `
    <div id="article">
      <div class="header">
        <h1>${title}</h1>
      </div>
      <form action="/checked_process" method="post">
        <h3>TODO list</h3>
        <ul class="todo-list">
    `;
    var i=0;
    while(i < taskList.length) {
      if(taskList[i].checked === 0) {
        list = list + `
        <li>
          <input type="hidden" name="checklist" value="0">
          <label>${taskList[i].task}</label>
        </li>
        `
      } else {
        list = list + `
        <li class="checked">
        <input type="hidden" name="checklist" value="1">
          <label>${taskList[i].task}</label>
        </li>
        `
      }
      i = i+1;
    }
    list = list + `
        </ul>
        <input type="hidden" name="id" value="${title}">
        <input id="save" type="submit" value="저장" onclick='btn_click("save")'>
      </form>
    </div>
    `;
    return list;
  }
}
