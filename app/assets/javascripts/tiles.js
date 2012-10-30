$(document).ready(function() {

  $.getJSON("/api/li-connections", function(json) {
    $(".content").html("connections loaded");
    console.log(json);
  });
});

