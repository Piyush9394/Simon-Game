var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var speed = 800;

$(document).ready(function () {
  // Start or restart the game
  $("#start-btn").on("click", function () {
    if (!started) {
      startGame();
    }
  });

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
  userClickedPattern = [];
  speed = 900;
  $("#start-btn").hide();
  nextSequence();
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  if (level > 5) speed = 600;
  if (level > 10) speed = 500;
  if (level > 15) speed = 300;

  $("#level-title").text("Level " + level);

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
    $("#start-btn").text("Restart Game").show();

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch(e => console.log("Sound failed:", e));
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
