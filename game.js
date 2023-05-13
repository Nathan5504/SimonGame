var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"] ;
var userClickedPattern = [];
var started = false ;
var level = 0;
$(document).keypress(function() {
    if (!started) {
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
}
})

$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound($(this).attr("id"))
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);
  } );


function checkAnswer(currenLevel) {
    if (gamePattern[currenLevel] === userClickedPattern[currenLevel] ) {
        console.log("success")
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1500);
        }
    }   else {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong")
        $('body,html').addClass("game-over")
        setTimeout(function(){
            $('body,html').removeClass("game-over")
        }, 300 );        
        startOver();
        console.log("wrong")
    }

  }


function startOver() {
    gamePattern = []
    level = 0
    started = false
  

}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level: " + level);
    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColour = buttonColors[randomNumber];

gamePattern.push(randomChosenColour);


$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
playSound(randomChosenColour);

}




function playSound(name) {
    var audio = new Audio("./sounds/" + name  +  ".mp3");
audio.play();

}

function animatePress(currentColor) {
    $("#" +currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" +currentColor ).removeClass("pressed")
    }, 100 )
}


