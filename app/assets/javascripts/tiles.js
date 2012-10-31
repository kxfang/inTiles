$(document).ready(function() {

  var rows = 5;
  var cols = 5;

  $.getJSON("/api/li-connections", function(json) {
    $(".content").html("connections loaded");
    generateTiles();
  });
  
  function generateTiles() {
    $('.tile-box').each(function(index, tilesDiv) {
      console.log('generating tiles for index: ' + index);
      for (var r = 0; r < rows; r++) {
        var row = $('' + $('#rowTpl').html()).appendTo(tilesDiv);
        console.log($('#rowTpl').html());
        for (var c = 0; c < cols; c++) {
          row.append($('#textTileTpl').html());
        }
      }
    });
  }
});



