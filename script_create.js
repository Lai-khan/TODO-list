// 항목 추가 버튼
$("#add_btn").click(function() {
  $("ul").append('<li><input type="text" placeholder="Write down what to do."></li>');
});

// 체크박스를 체크하면 마감기한이 나타난다.
$('input[type="checkbox"]').click(function() {
  if ($('input:checkbox[name="deadline"]').is(":checked") == true) {
    $('input[type="date"]').css("visibility", "visible");
  }
  else {
    $('input[type="date"]').css("visibility", "hidden");
  }
});
