$(document).ready(function() {

  var rows = 6;
  var cols = 9;
  
  var clickedArray = [null, null];

  $.getJSON("/api/li-connections?count=27", function(json) {
    $(".content").html("content loaded");
    generateTiles(json);
  });
  
  function generateTiles(data) {
    var tilesDiv = $('#tile-box');
    
    var text_index = 0;
    var pic_index = 0;
    
    for (var r = 0; r < rows; r++) {
      console.log(r);
      var row = $('' + $('#rowTpl').html()).appendTo(tilesDiv);
      for (var c = 0; c < cols; c++) {
        var isText = Math.floor((Math.random()*10)+1)%2 == 0;
        var tile;
        var total = rows * cols;
                
        if ((isText && text_index < data.names.length) || pic_index == data.pictures.length) {
          tile = Mustache.render($('#textTileTpl').html(), data.names[text_index]);
          text_index++;
        }
        else {
          tile = Mustache.render($('#imgTileTpl').html(), data.pictures[pic_index]);
          pic_index++;
        }
        row.append(tile);
      }
    }
    
    $('.tile').click(function(e) {
    //flip clickedArray[0]
      clickedArray = clickedArray.slice(1, 2);
      clickedArray.push($(this));
      if (!(clickedArray[0] == null || clickedArray[1] == null) && 
        clickedArray[0].data("id") == clickedArray[1].data("id") &&
        clickedArray[0].prop("class") != clickedArray[1].prop("class")) {
        console.log("ELIMINATE: " + clickedArray[0].data("id"));
        clickedArray = [null, null];
      }
/*       console.log(clickedArray); */
    });
  }
});



