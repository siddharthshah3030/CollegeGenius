$("head").append('<link rel="stylesheet" type="text/css" href="css/ycp.css">');

$("#unix").ycp({
  apikey: "AIzaSyBuSpHfoiCBKlKvVnFg7l0JvHCb8a7fZh4",
  playlist: 7,
  autoplay: true,
  related: true
});

$(".demo").ycp({
  apikey: "AIzaSyBuSpHfoiCBKlKvVnFg7l0JvHCb8a7fZh4"
});
$(document).ready(function() {
  $(".dropdown-submenu a.test").on("click", function(e) {
    $(this)
      .next("ul")
      .toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});
