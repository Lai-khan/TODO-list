// 항목 추가 버튼
$(".addbtn").click(function() {
  var value = $('#addlist').val();
  if(value === '') {
    alert("Write Something!");
  }
  else {
    // 입력한 내용 리스트에 추가
    var txt = `<li><input type="hidden" name="checklist" value="0"><label>${value}</label><input name="list" type="text" value="${value}"><button type="button" class="edit">Edit</button><button type="button" class="delete">Delete</button></li>`;
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
         $(e.target).children().first().val(0);
      } else {
         $(e.target).addClass("checked");
         $(e.target).children().first().val(1);
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
    else if($(e.target).val() === "완료") {
      alert("완료버튼");
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

// submit 하기 전에 체크
$("#done").on('click', function(create) {
  // e.preventDefault();
  if(title.value === "") {
    // Title 입력 안 했을 때
    alert("제목을 입력하세요.");
    title.focus();
    return false;
  } else if(!$("li").length) {
    // 항목이 하나도 없을 때
    alert("항목을 입력하세요.");
    return false;
  } else if($("li").length) {
    // li 항목이 있을 때
    var inputVal = $(".todo-list input[type=text]");
    for(var i=0; i<inputVal.length; i++) {
      if($(inputVal[i]).prev().text() === "") {
        alert("항목에 입력된 값이 없습니다.");
        return false;
      } else if($(inputVal[i]).parent("li").hasClass("editMode")) {
        // 항목중에 Editmode가 끝나지 않은 것이 있을 때
        alert("Edit이 완료되지 않았습니다.");
        $(inputVal).focus();
        return false;
      }
    }
    if($('input:checkbox').is(":checked")) {
      if(date.value === "") {
        alert("마감기한을 입력하세요.");
        date.focus();
        return false;
      }
    }
  }
  create.submit();
});
