// 항목 추가 버튼
$(".addbtn").click(function() {
  var value = $('#addlist').val();
  if(value === '') {
    alert("Write Something!");
  }
  else {
    // 입력한 내용 리스트에 추가
    var txt = "<li><label>"+value+"</label><input type=\"text\"><button class=\"edit\">Edit</button><button class=\"delete\">Delete</button></li>";
    $("ul").append(txt);
  }
  document.getElementById("addlist").value = "";
});

// 해당 항목에 대한 완료 처리
$("li").click(function() {
  if($(this).hasClass("checked")) {
     $(this).removeClass("checked");
  } else {
     $(this).addClass("checked");
  }
});

// 삭제 버튼 누르면 해당 항목 삭제
$(".delete").click(function() {
  $(this).parent("li").remove();
});

// 수정 버튼 누르면 해당 항목 수정 가능
$(".edit").click(function(e) {
  e.stopPropagation();
  var label = $(this).parent("li").children("label");
  var input = $(this).parent("li").children("input");
  if($(this).parent("li").hasClass("editMode")) {
    // $(this).parent("li").children("label").text() = $(this).parent("li").children("input").val();
    label.innerText = input.value;
    $(this).parent().removeClass("editMode");
  } else {
    // $(this).parent("li").children("input").val() = $(this).parent("li").children("label").text();
    input.value = label.innerText;
    $(this).parent().addClass("editMode");
  }
});

// 체크박스를 체크하면 마감기한이 나타난다.
$(".container").click(function() {
  if ($('input:checkbox').is(":checked")) {
    $('input[type="date"]').css("visibility", "visible");
  }
  else {
    $('input[type="date"]').css("visibility", "hidden");
  }
});

// $('li').on('click', function (e) {
//   if (e.target) {
//     console.log(e);
//     console.log("edit btn clicked");
//   }
// });
