var gamePattern =[];
var buttonColours =["red", "blue", "green", "yellow"];
var userClickedPattern =[];
var level = 0;
var started = false;

$(document).keydown(function(e){
    if (!started) {

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").on("click",function(e){
    var userChosenColour = $(this).attr("id"); //get id of button that is clicked
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //for flashing
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed"); //add pressed class when button is pressed
    setTimeout(function(){          //remove added class after 100 milliseconds
        $("#"+currentColour).removeClass("pressed")},100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();},1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
     }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}