var buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;

function nextSequence() {
  userPattern = [];
  var randomNumber = Math.floor(Math.random() * Math.floor(4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  console.log(gamePattern);
}

function playSound(name) {
  var colourAudio = new Audio("sounds/" + name + ".mp3");
  colourAudio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkPattern(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    // Next sequence once user finishes pattern
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    restartGame();
  }
}

function restartGame(){
  level = 0;
  gamePattern = [];
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkPattern(userPattern.length - 1);
});

$(document).keypress(function(e) {
  e.preventDefault();
  if (level === 0) {
    nextSequence();
  }
});
