$(document).ready(function() {

  var rows = 6;
  var cols = 9;

  $.getJSON("/api/li-connections", function(json) {
    $(".content").html("content loaded");
    generateTiles(json);
  });
  
  function generateTiles(data) {
    var tilesDiv = $('#tile-box');
    var index = 0;
    
    for (var r = 0; r < rows; r++) {
      console.log(r);
      var row = $('' + $('#rowTpl').html()).appendTo(tilesDiv);
      for (var c = 0; c < cols; c++) {
        console.log(data.connections[index].firstName);
        var textTpl = Mustache.render($('#textTileTpl').html(), data.connections[index]);
        row.append(textTpl);
        index++;
      }
    }

  }
});



