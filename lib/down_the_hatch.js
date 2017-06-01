const Game = require('./game');
const Ball = require('./ball');



document.addEventListener("DOMContentLoaded", function(){
  const hatch = document.getElementById("hatch");
  hatch.height = Math.floor(window.innerHeight * 0.8);
  hatch.width = Math.floor(window.innerWidth * 0.8 / 10) * 10;

  const ball = new Ball(hatch.width).createBall();
  const game = new Game(hatch, ball);

  //Set listener for pause
  let beginGame = createjs.Ticker.on("tick", game.start);

  key('up', () => {
    createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
    if (createjs.Ticker.paused) {
      createjs.Ticker.off("tick", beginGame);
      console.log("turn off");
    } else {
      beginGame = createjs.Ticker.on("tick", beginGame);
      console.log("turn on");
    }
  });

  createjs.Ticker.setFPS(60);
})
