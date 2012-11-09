$(document).ready(function() {

  var rows = 5;
  var cols = 10;
  
  var clickedArray = [];
  var timedFlips = [];
  
  showLoadingModal();
  
  $.getJSON("/api/bg-image-url", function(json) {
    $('#tile-box').css('background-image', 'url(' + json.image + ')');
    console.log($("#tile-box"));
  });

  $.getJSON("/api/li-connections?count=" + rows * cols / 2, function(json) {
    $(".content").html("content loaded");
    hideLoadingModal();
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
      
      if (!$(this).hasClass('flipped')) {
        console.log("clicked: " + $(this).data('id'));
      
        $(this).addClass('flipped');
        console.log($(this).attr('class'));
        clickedArray.push($(this));
        timedFlips.push(setTimeout(unflipAndShift, 2000));
        if (clickedArray.length > 2) {
          unflipAndShift();
        }
        
        if (clickedArray.length == 2 && clickedArray[0].data('id') == clickedArray[1].data('id')) {
          match();
        }
      }
/*
      if (!(clickedArray[0] == null || clickedArray[1] == null) && 
        clickedArray[0].data("id") == clickedArray[1].data("id") &&
        clickedArray[0].prop("class") != clickedArray[1].prop("class")) {
        console.log("ELIMINATE: " + clickedArray[0].data("id"));
        clickedArray = [null, null];
      }
*/
      
    }
    
    function unflipAndShift() {
      console.log('unflipping');
      var tile = clickedArray.shift();
      tile.removeClass('flipped');
      
      var timedFlip = timedFlips.shift();
      clearTimeout(timedFlip);
    }
    
    function match() {
    
      function hideTiles() {
        tilesToHide[0].find('.back').fadeOut(1000);
        tilesToHide[1].find('.back').fadeOut(1000);
      }
      var tilesToHide = clickedArray;
      setTimeout(hideTiles, 500);
      
      clickedArray = [];
      clearTimeout(timedFlips[0]);
      clearTimeout(timedFlips[1]);
      timedFlips = [];
    }
    
  }
  
  function showLoadingModal() {      
    $('#loading-modal').modal('show');
  }
  
  function hideLoadingModal() {
    $('#loading-modal').modal('hide');
  }
});



