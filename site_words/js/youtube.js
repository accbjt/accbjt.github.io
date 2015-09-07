var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videos = [];
var players;
var videoThumbnails = [];

function youtubeSetup(i){
  function onYouTubeIframeAPIReady(i) {
    players = new YT.Player('videoPlayer', {
      height: '390',
      width: '640',
      videoId: videos[i].videoId,
      events: {
       'onReady': onPlayerReady,
               // 'onStateChange': onPlayerStateChange
             }
           });
  };
  onYouTubeIframeAPIReady(i);
  function onPlayerReady(event) {
    console.log('onplayerready')
    playPauseVideo();
  }
};

function chosenVideoToPlay(){
  $('.player img').on('click', function(e) {
    window.location = "youtube.html#"+e.currentTarget.dataset.id;
  });
};
var playerState;
var iframeId

function close(){
  $('.close').on('click', function(){
    $('iframe').remove();
      $('.player table').remove();
      videos = [];
      videoThumbnails = [];
      playerState = undefined;
      resetPlayer();
  });
};

var setTimerSeconds = 10;
var seconds=0;

function timer(){
  if(seconds === 0){
    seconds = setTimerSeconds
    console.log('seconds = '+seconds)
  };
  seconds=seconds-1;
  console.log('seconds = '+seconds)

  if (seconds <= 0){  
     console.log('clear');
     seconds === null;
     return;
  }else{
    setTimeout(timer, 1000);
  }
};

function playPauseVideo(){
  var count = 0
  if(playerState === undefined){
    playerState = 'play'
    var duration = players.getDuration();
    players.unMute();
    // $('.fullscreen-pause').css('z-index', '1');
    // checkPlayerState();
  }

  // function checkPlayerState(){
  //   if(players.getPlayerState() !== 0 ){
  //     setTimeout(function(){
  //      // checkPlayerState();
  //      // console.log('check');
  //       if(players.getPlayerState() === 1 && count === 0){
  //         $('.fullscreen-pause').css('z-index', '1')
  //         count = 1
  //       }
  //    },1000)
  //   }else{
  //     console.log('stopped')
  //     $('iframe').remove();
  //     $('.player table').remove();
  //     videos = [];
  //     videoThumbnails = [];
  //     playerState = undefined;
  //     resetPlayer();
  //   }
  // };

  function play(){
    $('.fullscreen-pause').bind('click', function(){
      playerState = 'pause'
      players.pauseVideo();
      $(this).unbind('click');
      console.log('pause')
      $(this).addClass('fullscreen-play');
      $(this).removeClass('fullscreen-pause');
      pause();
    });
  };

  function pause(){
     $('.fullscreen-play').bind('click', function(){
      playerState = 'play'
      players.playVideo();
      $(this).unbind('click');
      console.log('play')
      $(this).addClass('fullscreen-pause');
      $(this).removeClass('fullscreen-play');
      play();
    });
  };
  play();
}