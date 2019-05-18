module.exports = {
  HTML:function(title, header, footer, list) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" name="viewport" content="width=device-width" initial-scale="1.0">
        <title>TODO List - ${title}</title>
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
      </head>
      <body>
      ${header}
      ${list}
      ${footer}
      </body>
    </html>
    `;
  },
  List:function(fileList) {
    var list = `<div class="container">`;
    var i=0;
    while(i < fileList.length) {
      list = list + `
      <a href="/?id=${fileList[i]}">
        <div class="box">
          <div class="icon">1</div>
          <div class="content">
            <h1>${fileList[i]}</h1>
          </div>
        </div>
      </a>
      `
      i = i+1;
    }
    list = list + '</div>';
    return list;
  },
  View:function(title, taskList) {
    var list = `
    <div id="article">
      <div class="header">
        <h1>${title}</h1>
      </div>
      <h3>TODO list</h3>
      <ul class="todo-list">
    `;
    var i=0;
    while(i < taskList.length) {
      list = list + `
      <li>
        <label>${taskList[i]}</label>
      </li>
      `
      i = i+1;
    }
    list = list + `
      </ul>
    </div>
    `;
    return list;
  }
}
