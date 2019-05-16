// 항목 추가 버튼
$(".addbtn").click(function() {
  var value = document.getElementById("inputvalue").value;
  if(value == '') {
    alert("Write Something!");
  }
  else {
    // 입력한 내용 리스트에 추가 &
    // 항목 li 옆에 내용 삭제 버튼 붙이기
    var txt = "<li>"+value+"<span>×</span></li>";
    $("ul").append(txt);
    $("span").addClass("close");
  }
  document.getElementById("inputvalue").value = "";

  // 삭제 버튼 누르면 해당 항목 삭제
  $(".close").click(function() {
    $(this).parent("li").remove();
  });
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
