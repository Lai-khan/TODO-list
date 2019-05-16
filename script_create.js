// 항목 추가 버튼
$(".addbtn").click(function() {
  var value = document.getElementById("inputvalue").value;
  if(value == '') {
    alert("Write Something!");
  }
  else {
    var txt = "<li>"+value+"<span>×</span></li>";
    $("ul").append(txt);
    $("span").addClass("close");
  }
  document.getElementById("inputvalue").value = "";

  $(".close").click(function() {
    $(this).parent("li").remove();
  });
});

// 항목 li 옆에 내용 삭제 버튼 붙이기
$("li").each( function() {
  $(this).append("<span>×</span>");
  $("span").addClass("close");
});

// 삭제 버튼 누르면 해당 항목 삭제
$(".close").click(function() {
  $(this).parent("li").remove();
});

// 체크박스를 체크하면 마감기한이 나타난다.
$(".container").click(function() {
  if ($('input:checkbox').is(":checked") == true) {
    $('input[type="date"]').css("visibility", "visible");
  }
  else {
    $('input[type="date"]').css("visibility", "hidden");
  }
});
