const Game = require('./game');
const Ball = require('./ball');



document.addEventListener("DOMContentLoaded", function(){
  const hatch = document.getElementById("hatch");
  hatch.height = 500;
  hatch.width = 800;

  const ball = new Ball(hatch.width).createBall();
  const game = new Game(hatch, ball);

  //set score
  let score = document.getElementsByClassName("score-text")[0];


  //get modals for pause
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  //Set listener for pause
  let beginGame = createjs.Ticker.on("tick", game.start);

  //get buttons
  const reset = document.getElementById("restart");
  const hardReset = () => {
    game.reset();
    createjs.Ticker.off("tick", beginGame);
    createjs.Ticker.paused = false;
    beginGame = createjs.Ticker.on("tick", game.start);
    modal.style.display = "none";
  }
  reset.onclick = hardReset;

  //allow reset by key on pause
  key("r", () => {
    if (createjs.Ticker.paused) {
      game.reset();
      createjs.Ticker.off("tick", beginGame);
      createjs.Ticker.paused = false;
      beginGame = createjs.Ticker.on("tick", game.start);
      modal.style.display = "none";
    }
  })

  //pause and how modal on certain keys
  key('up, space, w, esc', () => {
    createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
    if (createjs.Ticker.paused) {
      createjs.Ticker.off("tick", beginGame);
      score.innerHTML = createjs.Ticker.getTicks();
      modal.style.display = "block";
    } else {
      beginGame = createjs.Ticker.on("tick", beginGame);
      modal.style.display = "none";
    }
  });

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
  createjs.Ticker.setFPS(60);
})
