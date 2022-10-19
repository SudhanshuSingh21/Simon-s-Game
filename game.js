var buttonColors= ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level= 0;
var started =false;

//T0 make the sequence of the random colors
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

//To store the values  of button clicks
$(".btn").on("click", function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//play sound on clicking the different colour butttons
function playsound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//To add animation on the buttons
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() //this function is used to set time limit in adding and removing elements.
  {
    $("#"+currentColour).removeClass("pressed");
  },100);
}

//To check the sequence of the clicked buttons.
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("Success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function()
      {
        nextSequence();
      },1000);
    }
  }

  else
  {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function()
    {
        $("body").removeClass("game-over");
    },200);
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    restart();
    console.log("Wrong "+userClickedPattern+" "+gamePattern);
  }
}

//To restart the game.
function restart()
{
  started=false;
  level=0;
  gamePattern=[];
}

$(document).on("keypress",function(event){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    //event.preventDefault();
  }
});
