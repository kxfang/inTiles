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
        var tileContent;
        var total = rows * cols;
        
        var tile;
                
        if ((isText && text_index < data.names.length) || pic_index == data.pictures.length) {
          tileContent = Mustache.render($('#textTileTpl').html(), data.names[text_index]);
          tile = $(Mustache.render($('#tileTpl').html(), data.names[text_index]));
          text_index++;
        }
        else {
          tileContent = Mustache.render($('#imgTileTpl').html(), data.pictures[pic_index]);
          tile = $(Mustache.render($('#tileTpl').html(), data.pictures[pic_index]));
          pic_index++;
        }
        tile.find('.back').append(tileContent);
        row.append(tile);
      }
    }
    
    $('.tile').click(onClick);
    
    function onClick(e) {
      console.log("clicked: " + $(this).data('id'));
      
      clickedArray = clickedArray.slice(1, 2);
      clickedArray.push($(this));
      if (!(clickedArray[0] == null || clickedArray[1] == null) && 
        clickedArray[0].data("id") == clickedArray[1].data("id") &&
        clickedArray[0].prop("class") != clickedArray[1].prop("class")) {
        console.log("ELIMINATE: " + clickedArray[0].data("id"));
        clickedArray = [null, null];
      }
      
      $(this).toggleClass('flipped');
    }
  }
});

