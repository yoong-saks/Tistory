var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var done = false;
var volumeGauge = document.getElementById('volume-gauge');

// Function to create <iframe> after downloading API code (with youtube player)
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '800', //changeable-video height
        width: '1000', //changeable-video width
        videoId: 'IUT1qAhMY4w', //change-video ID
        playerVars: {
            'rel': 0, //Whether to display related videos (0: not displayed)
            'controls': 0 //Hide player controls (0: hidden, 1: displayed)
        },
        events: {
            'onReady': onPlayerReady, //function name that works when onReady
            'onStateChange': onPlayerStateChange //function name that works when in onStateChange state
        }
    });
}

// The API will call the function below when the video player is ready.
function onPlayerReady(event) {
  var volumeGauge = document.getElementById('volume-gauge'); // get the volume gauge element
  volumeGauge.addEventListener('input', function() {
      var volume = parseInt(volumeGauge.value);
      player.setVolume(volume);
      localStorage.setItem('playerVolume', volume); // save the volume value in localStorage
  });

  var savedVolume = localStorage.getItem('playerVolume'); // retrieve the saved volume value from localStorage
  if (savedVolume) {
      player.setVolume(parseInt(savedVolume)); // set the volume to the saved value
      volumeGauge.value = savedVolume; // set the gauge value to the saved value
  } else {
      volumeGauge.value = player.getVolume(); // set the gauge value to the current volume
  }

  var state = localStorage.getItem('playerState'); // retrieve the player state from localStorage
  if (state == 'paused') {
      event.target.pauseVideo(); // pause the video if the player state is 'paused'
      updatePlayPauseIcon('fa-play');
  } else {
      event.target.playVideo();
      updatePlayPauseIcon('fa-pause');
  }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
    if (event.data == YT.PlayerState.PAUSED) {
      done = false;
          updatePlayPauseIcon('fa-play'); // set the font awesome icon to 'fa-play' if the video is paused or ended
      } else {
        done = false;
          updatePlayPauseIcon('fa-pause'); // set the font awesome icon to 'fa-pause' if the video is playing
      }
}

function playPauseVideo() {
    var state = player.getPlayerState();
    if (state == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        localStorage.setItem('playerState', 'paused'); // save the player state as 'paused' in localStorage
    } else {
        player.playVideo();
        localStorage.setItem('playerState', 'playing'); // save the player state as 'playing' in localStorage
    }
}

// Function to update the font awesome icon
function updatePlayPauseIcon(iconClass) {
    var playPauseIcon = document.getElementById('playPauseIcon');
    playPauseIcon.className = 'fas fa-solid ' + iconClass;
}






const hiddenElement = document.querySelector('.player-popup');
const playercover = document.querySelector('.player-cover');
// Show the hidden element when it is clicked
hiddenElement.addEventListener('click', () => {
  hiddenElement.style.bottom = '10px';
  playercover.style.marginTop = '-70px';
});

// Hide the hidden element when the page is refreshed
window.addEventListener('beforeunload', () => {
  hiddenElement.style.bottom = '-250px';
  playercover.style.marginTop = '0px';
});

// Hide the hidden element when the user clicks outside of it
window.addEventListener('click', (event) => {
  if (!hiddenElement.contains(event.target)) {
    hiddenElement.style.bottom = '-250px';
    playercover.style.marginTop = '0px';
  }
});


    
    (function($) {
      const imgwidth = 400;
      const slidebywidth = [];
      for (let i =0; i < 5; i++) {
        slidebywidth.push(i*imgwidth+'px');
      }
      $(".slide_number").css("right",slidebywidth[0]);
      function sliderMoving(){
        const thumb3All = document.querySelectorAll(".thumb_summary .post_index")
        $(".thumb_summary .post_index:eq(0)").fadeIn();
        let previous_slide = 0;
        let you=1;
        let setTime=1000;
        let i = 0;
        let intervalId1, intervalId2;
        intervalId1 = setInterval(()=>{
          i+=5
        },100)
        intervalId2 = setInterval(()=>{
          if(i>=300){
            for (var erse = 0; erse < 5; erse++) {
              $(".thumb_summary .post_index:eq("+(erse)+")").removeClass("summary_hover");
              $(".thumb_summary .post_index:eq("+(erse)+")").removeClass("summary_none");
            }
            you++;
            i=0;
            previous_slide = 0;
            if(you>thumb3All.length){
              you=1;
            }
            if(you==1){
              thumb3All.forEach((e,i)=>{
                $(".thumb_summary .post_index:eq(4)").fadeOut(function() {
                  $(".thumb_summary .post_index:eq("+(you-1)+")").fadeIn();
                });
              })
            }
            if(you>1){
              $(".thumb_summary .post_index:eq("+(you-2)+")").fadeOut(function() {
                $(".thumb_summary .post_index:eq("+(you-1)+")").fadeIn();
              });
            }
            $(".slide_number").css("right",slidebywidth[you-1]);
          }
          function updateSlide(slideIndex) {
            i=-2147483647;
            for (erse = 0; erse < 5; erse++) {
              document.querySelectorAll(".thumb_summary .post_index")[erse].style = "";
            }
            if (previous_slide == 0) {
              $(".thumb_summary .post_index:eq("+(you-1)+")").addClass("summary_none");
            } else {
              $(".thumb_summary .post_index:eq("+(previous_slide-1)+")").removeClass("summary_hover").addClass("summary_none");
            }
            previous_slide = slideIndex;
            you = slideIndex;
            $(".thumb_summary .post_index:eq("+(you-1)+")").removeClass("summary_none").addClass("summary_hover");
          }
          const mainListItems = document.querySelectorAll("._mainlist li");
          mainListItems.forEach((item, index) => {
            item.addEventListener('mouseover', (e) => {
              updateSlide(index + 1);
              $(".slide_number").css("right",slidebywidth[you-1]);
            });
          });
          document.querySelector("._mainlist").addEventListener('mouseout', (e) => {
            i=0;
          })
        },setTime)
      }
      if ($("._maincover").length ) sliderMoving();
    })(jQuery);