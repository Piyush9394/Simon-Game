var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var speed = 900;

$(document).ready(function () {
  // Start or restart game when button is clicked
  $("#start-btn").on("click", function () {
    if (!started) {
      startGame();
    }
  });

  // Button press listener
  $(".btn").on("click", function () {
    if (!started) return;

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function startGame() {
  started = true;
  level = 0;
  gamePattern = [];
  speed = 900;
  userClickedPattern = [];
  $("#start-btn").hide();
  nextSequence();
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  // Update title with level
  $("#level-title").text("Level " + level);

  // Adjust speed as game progresses
  if (level > 5) speed = 700;
  if (level > 10) speed = 500;
  if (level > 15) speed = 300;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, speed);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#start-btn").text("Restart Game").show();
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch((e) => console.log("Sound error:", e));
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  started = false;
}
