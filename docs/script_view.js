// 해당 항목에 대한 완료 처리
$("li").click(function() {
  if($(this).hasClass("checked")) {
     $(this).removeClass("checked");
     $(this).children().first().val(0);
  } else {
     $(this).addClass("checked");
     $(this).children().first().val(1);
  }
});
