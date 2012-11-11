$(document).ready(function() {

  var rows = 5;
  var cols = 10;
  
  var clickedArray = [];
  var timedFlips = [];
  
  var time = 0;
  var timeTicker;
  
  var completed = 0;
  
  $('#restart-btn').click(onRestart);
  
  startGame();
  
  function startGame() {  
    showLoadingModal();
    $.getJSON("/api/bg-image-url", function(json) {
      $('#tile-box').css('background-image', 'url(' + json.image + ')');
      $('#bg-name').html(json.name);
      console.log($("#tile-box"));
    });
  
    $.getJSON("/api/li-connections?count=" + rows * cols / 2, function(json) {
      $('#loading-header h3').html("Press start to begin!");
      $('#loading-body p').html("Done!");
      $('#start-button').attr("disabled", false).click(onStartButton);
      generateTiles(json);
    });
  }
  
  function resetState() {
    completed = 0;
    time = 0;
    clickedArray = [];
    timedFlips = [];
    $('.tile').remove();
    $('#start-button').attr("disabled", true);
  }
  
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
      
      completed++;
      
      if (completed == rows * cols / 2) {
        onComplete();
      }
    }
    
  }
  
  function showLoadingModal() {      
    $('#loading-modal').modal('show');
  }
  
  function hideLoadingModal() {
    $('#loading-modal').modal('hide');
  }
  
  function onStartButton() {
    hideLoadingModal();
    showTiles();
    tick();
  }
  
  function tick() {
    timeTicker = setTimeout(tick, 1000);
    $('#time').html(time);
    time++;
  }
  
  function showTiles() {
    $('.tile').css('opacity', 1.0);
  }
  
  function onComplete() {
    clearTimeout(timeTicker);
    slidePanel();
  }
  
  function onRestart() {
    resetPanel();
    resetState();
    startGame();
  }
  
  function slidePanel() {
    $('.slider').animate({left: '-100%'}, 1000);
    $('#time-result').html(time);
  }
  
  function resetPanel() {
    $('.slider').animate({left: '0%'}, 1000);
  }
});



