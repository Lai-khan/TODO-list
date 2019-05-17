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

// 동적 객체와 상관없이 이벤트 처리를 위한 함수
$('.todo-list').on('click', function(e) {
  if (e.target) {
    if($(e.target).is("li")) {
      // 해당 항목에 대한 완료 처리
      if($(e.target).hasClass("checked")) {
         $(e.target).removeClass("checked");
      } else {
         $(e.target).addClass("checked");
      }
    }
    else if ($(e.target).hasClass("edit")) {
      //수정 버튼 누르면 해당 항목 수정 가능
      if($(e.target).parent("li").hasClass("editMode")) {
        $(e.target).prev().prev().text($(e.target).prev().val());
        $(e.target).parent().removeClass("editMode");
      } else {
        $(e.target).prev().val($(e.target).prev().prev().text());
        $(e.target).parent().addClass("editMode");
      }
    }
    else if ($(e.target).hasClass("delete")) {
      // 삭제 버튼 누르면 해당 항목 삭제
      e.target.parentNode.remove();
    }
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
