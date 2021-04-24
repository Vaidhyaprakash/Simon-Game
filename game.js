var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStart = false;
var level = 0;
$(document).keypress(function() {
  if (gameStart === false) {
    nextSequence();
    $("#level-title").text("Level " + level);
    gameStart = true;
  }
});


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("div#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}
$("div.btn").click(function(event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("div#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("div#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern.length === userClickedPattern.length) {
    var str1=gamePattern.join();
    var str2=userClickedPattern.join();
    if(str1===str2){
      setTimeout(function() {
        nextSequence();
      }, 1000);userClickedPattern=[];}
    else {
      wrong();
    }
  }
  else{
    if(gamePattern[currentLevel]!=userClickedPattern[currentLevel]){
      wrong();
    }
  }
}
function wrong(){
  gamePattern=[];
  gameStart = false;
  level=0;
  userClickedPattern=[];
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
}
