// 항목 li 옆에 내용 삭제 버튼 붙이기
$("li").each( function() {
  $(this).append("<span>×</span>");
  $("span").addClass("close");
});

// 삭제 버튼 누르면 해당 항목 삭제
$(".close").click(function() {
  $(this).parent("li").remove();
});

// 해당 항목에 대한 완료 처리
$("li").click(function() {
   $(this).toggleClass("checked");
});
