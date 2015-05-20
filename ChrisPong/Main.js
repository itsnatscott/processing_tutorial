// 

var canvas; // Will be linked to the canvas in our index.html page
var stage; // is the equivelance of stage in AS3; We'll ass "children" to it

// Graphics
// [Background]

var bg; // The background graphic

// [Title View]

var main; // The Main Background
var startB; // The Start button in the main menu
var creditsB; // The credits button in the main menu

// [Credits]

var credits; // The Credits screen

// [Game View]


var player; // The player paddle graphic
var ball; // The ball graphic
var cpu; // The CPU paddle
var win; // The winning popup
var lose; // The Losing popup

// [Score]

var playerScore; // The main player score
var cpuScore; // The CPU score
var cpuSpeed=4; // The speed of the CPU paddle; the faster it is the harder the game is

// Variables

var xSpeed = 5;
var ySpeed = 5;

// Ticker

var tkr = new Object;

// Preloader
var preloader; // Will contain the PreloadJS object
var manifest;  // Will hold the list of files we need to load
var totalLoaded = 0; // This variable will hold the number of files already loaded

var TitleView = new Container();



function Main() {

  /* Link Canvas */

  canvas = document.getElementById('PongStage');
  stage = new Stage(canvas);

  stage.mouseEventsEnabled = true;

  /* Set The Flash Plugin for browsers that don't support SoundJS */
  // SoundJS.FlashPlugin.BASE_PATH = "assets/";
  // if (!SoundJS.checkPlugin(true)) {
  //   alert("Error!");
  //   return;
  // }

  // Manifest variable holds an array of files that will be loaded. It holds audio in two formats, various accept each audio file type

  manifest = [
              {src:"bg.png", id:"bg"},
              {src:"main.png", id:"main"},
              {src:"startB.png", id:"startB"},
              {src:"creditsB.png", id:"creditsB"},
              {src:"credits.png", id:"credits"},
              {src:"creditsB.png", id:"creditsB"},
              {src:"paddle.png", id:"cpu"},
              {src:"paddle.png", id:"player"},
              {src:"ball.png", id:"ball"},
              {src:"win.png", id:"win"},
              {src:"lose.png", id:"lose"},
              {src:"lose.png", id:"lose"}
              // {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
              // {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
              // {src:"hit.mp3|hit.ogg", id:"hit"},
              // {src:"wall.mp3|wall.ogg", id:"wall"}
  ]; 


  // Here we configure the preloader object using PreloadJS

  preloader = new PreloadJS(); 
  preloader.installPlugin(SoundJS);
  preloader.onProgress = handleProgress;
  preloader.onComplete = handleComplete;
  preloader.onFileLoad = handleFileLoad;
  preloader.loadManifest(manifest);

  // Add Ticker object to the stage and set the frame rate to 30FPS

  Ticker.setFPS(30);
    Ticker.addListener(stage);
}

function handleProgress(event) {
  // use event.loaded to get the percentage of the loading
}

function handleComplete(event) {
  // triggered when all loading is complete
}

function handleFileLoad(event) {
  // triggered when an individual file completes loading
  switch(event.type) {
    case PreloadJS.IMAGE:
    // image loaded
      var img = new Image();
        img.src = event.src;
        img.onload = handleLoadComplete;
        window[event.id] = new Bitmap(img);
    break;

    case preloadJS.SOUND:
    // sound loaded
    handleLoadComplete();
    break;
  }
}

function handleLoadComplete(event) {

  totalLoaded++;

  if(manifest.length==totalLoaded) {
    addTitleView();
  }
}

function addTitleView() {

  // console.log("Add title View")
  startB.x = 240 - 31.5;
  startB.y = 200;
  startB.name = 'startB';

  creditsB.x = 241 - 42;
  creditsB.y = 230;
  creditsB.name = 'creditsB';

  TitleView.addChild(main, startB, creditsB);
  stage.addChild(bg, TitleView);
  stage.update();

  //Button Listeners

  startB.onPress = tweenTitleView;
  creditsB.onPress = showCredits;
}

function showCredits() {
  // Show Credits

  credits.x = 480;

  stage.appChild(credits);
  stage.update();
  Tween.get(credits).to({x:0}, 300);
  credits.onPress = hideCredits;
}

// Hide Credits

function hideCredits(e) {
  Tween.get(credits).to({x:400}, 300).call(rmvCredits);
}

// Remove Credits

function rmvCredits() {
  stage.removeChild(credits);
}

// Tween Title View

function tweenTitleView() {
  // Start game

  Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}

function addGameView() {
  // Destroy Menu & Credits screen

  stage.removeChild(TitleView);
  TitleView = null;
  credits = null;

  // Add Game View

  player.x = 2;
  player.y = 160 - 37.5;
  cpu.x = 480 -25;
  cpu.y = 160 - 37.5;
  ball.x = 240 - 15;
  ball.y = 160 - 15;

  // Score

  playerScore = new Text('0', 'bold 20px Arial', '#ff0000');
  playerScore.x = 211;
  playerScore.y = 20;

  cpuScore = new Text('0', 'bold 20px Arial', '#ff0000');
  cpuScore.x = 262;
  cpuScore.y = 20;

  stage.addChild(playerScore, cpuScore, player, cpu, ball);
  stage.update();

  // Start Listener

  bg.onPress = startGame;
}

function startGame(e) {
  bg.onPress = null;
  stage.onMouseMove = movePaddle;

  Ticker.addListener(tkr, false);
  tkr.tick = update;
}

function movePaddle(e) {
  // Mouse Movement
  player.y = e.stageY;
}

/* reset */

function reset() {
  ball.x = 240 - 15;
  ball.y = 160 - 15;
  player.y = 160 - 37.5;
  cpu.y = 160 - 37.5;

  stage.onMouseMove = null;
  Ticker.removeListener(tkr);
  bg.onPress = startGame;

}

function alert(e) {
  Ticker.removeListener(tkr);
  stage.onMouseMove = null;
  bg.onPress = null

  if(e == 'win') {
    win.x = 140;
    win.y = -90;

    stage.addChild(win);
    Tween.get(win).to({y: 115}, 300);
  }
  else {
    lose.x = 140;
    lose.y = -90;

    stage.addChild(lose);
    Tween.get(lose).to({y: 115}, 300);
  }
}

function update() {
  // Ball Movement
  ball.x = ball.x + xSpeed;
  ball.y = ball.y +ySpeed;

  // CPU Movement
  if((cpu.y+32) < (ball.y-14)) {
    cpu.y = cpu.y + cpuSpeed;
  }
  else if((cpu.y+32) > (ball.y+14)) {
    cpu.y = cpu.y - cpuSpeed;
  }

  // Wall Collision

  if((ball.y) < 0) { ySpeed = -ySpeed; SoundJS.play('wall'); }; // up
  if((ball.y + (30)) > 320) { ySpeed = -ySpeed; SoundJS.play('wall');}; // down

  /* CPU Score */

  if((ball.x) < 0) {
    xSpeed = -xSpeed;
    cpuScore.text = parseInt(cpuScore.text + 1);
    reset();
    SoundJS.play('enemyScore');
  }

  /* Player Score */

  if((ball.x + (30)) > 480) {
    xSpeed = -xSpeed;
    playerScore.text = parseInt(playerScore.text + 1);
    reset();
    SoundJS.play('playerScore');
  }

  /* CPU Collision */

  if(ball.x + 30 > cpu.x &&  ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75) {
    xSpeed *= -1;
    SoundJS.play('hit');
  }

  /* Player Collision */

  if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75) {
    xSpeed *= -1;
    SoundJS.play('hit');
  }

  /* Stop Paddle from going out of canvas */

  if(player.y >= 249) {
    player.y = 249;
  }

  /* Check for win */

  if(playerScore.text == '3') {
    alert('win');
  }

  /* Check for game over */

  if(cpuScore.text == '3') {
    alert('lose');
  }
}
















