// 항목 li 옆에 내용 삭제 버튼 붙이기
$("li").each( function() {
  $(this).append("<span class=\"update\">Edit<span>");
  $(this).append("<span class=\"close\">×</span>");
});

// 삭제 버튼 누르면 해당 항목 삭제
$(".close").click(function() {
  $(this).parent("li").remove();
});

// 해당 항목에 대한 완료 처리
$("li").click(function() {
   $(this).toggleClass("checked");
});

// 수정 버튼 누르면 li 태그 input 태그로 바꾸기
$(".update").click(function() {

});

// TODO 항목 우선순위 조절
// $( function() {
//     $( "#sortable" ).sortable({
//       revert: true
//     });
//     $( "ul, li" ).disableSelection();
// });
