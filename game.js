var buttonColours = ["red","blue","green","yellow"];
var gamepatter = [];
var userClickedPattern = [];
var level = 0;


$(window).keypress(function(){
    if(level == 0){
        nextSequence();
    }
}
)

function checkanswer(currentLevel){
    if(JSON.stringify(gamepatter) === JSON.stringify(userClickedPattern)){
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
        $('h1').text("Level " + level);
        console.log("success");
    }else if(JSON.stringify(gamepatter[userClickedPattern.length - 1]) === JSON.stringify(userClickedPattern[userClickedPattern.length - 1])){
        console.log("success for one");
    }else{
        $('h1').text("GAME OVER, SELECT TO RESTART");
        changebackground();
        gamepatter = [];
        userClickedPattern = [];
        level = 0;
        console.log("wrong");
    }
}

function nextSequence(){
    level++;
    $('h1').text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomnumber];
    console.log(randomChosenColour);
    gamepatter.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkanswer(level);
})

function playSound(name){
    var audio = new Audio('sounds/' +name +'.mp3')
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () { 
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function changebackground(){
    $("*").addClass("game-over");
    setTimeout(function () { 
        $("*").removeClass("game-over");
    }, 100)
}