const Game = require('./game');
const Ball = require('./ball');



document.addEventListener("DOMContentLoaded", function(){
  const hatch = document.getElementById("hatch");
  hatch.height = 230;
  hatch.width = 350;

  const ball = new Ball(hatch.width).createBall();
  const game = new Game(hatch, ball);

  createjs.Ticker.setFPS(65);

  //get panels
  const left = document.getElementsByClassName("left")[0];
  const right = document.getElementsByClassName("right")[0];
  const background = document.getElementsByClassName("background-fill")[0];

  //set score
  let score = document.getElementsByClassName("score")[0];

  //get modal options
  let paused = document.getElementsByClassName("paused")[0];
  let newGame = document.getElementsByClassName("new-game")[0];
  let gameOver = document.getElementsByClassName("game-over")[0];

  //get modals for pause
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  //Set listener for pause
  // let beginGame = createjs.Ticker.on("tick", game.start);

  //get buttons
  const reset = document.getElementById("restart");
  const resume = document.getElementById("continue");

  const hardReset = () => {
    createjs.Ticker.reset();
    game.reset();
    createjs.Ticker.paused = false;
    beginGame = createjs.Ticker.on("tick", game.start);
    toggleOn();
  }
  reset.onclick = hardReset;

  const resumeGame = () => {
    createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
    if (createjs.Ticker.paused) {
      createjs.Ticker.off("tick", beginGame);
    } else {
      beginGame = createjs.Ticker.on("tick", beginGame);
    }
    toggleOff();
  }
  resume.onclick = resumeGame;

  //allow reset by keypress on pause
  key("r", () => {
    if (createjs.Ticker.paused) { hardReset();}
  });



  //pause and show modal on certain keys
  key('up, space, w, esc', (event) => {
    createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
    if (createjs.Ticker.paused) {
      createjs.Ticker.off("tick", beginGame);
      toggleOff();
    } else {
      beginGame = createjs.Ticker.on("tick", beginGame);
      toggleOn();
    }
  });

  const toggleOn = () => {
    modal.style.display = "none";
    left.style.backgroundColor = "black";
    left.style.opacity = 0.3;
    left.style.zIndex = 1;
    right.style.backgroundColor = "black";
    right.style.opacity = 0.3;
    right.style.zIndex = 0;
    background.style.backgroundColor = "white";
    gameOver.style.display = "none";
    paused.style.display = "none";
    newGame.style.display = "none";
}

  const toggleOff = () => {
    modal.style.display = "block";
    left.style.backgroundColor = "white";
    left.style.opacity = 1;
    left.style.zIndex = 10;
    right.style.backgroundColor = "white";
    right.style.opacity = 1;
    right.style.zIndex = 10;
    background.style.backgroundColor = "grey";
    background.style.opacity = 0.3;
    if (game.gameOver()){
      gameOver.style.display = "block";
    } else {
      paused.style.display = "block";
    }
  }
  window.toggleOff = toggleOff;

  //allow user to escape modal and continue game on outside click
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
        if (createjs.Ticker.paused) {
          createjs.Ticker.off("tick", beginGame);
        } else {
          beginGame = createjs.Ticker.on("tick", beginGame);
        }
    }
  }
})
