const Game = require('./game');
const Ball = require('./ball');



document.addEventListener("DOMContentLoaded", function(){
  const hatch = document.getElementById("hatch");
  hatch.height = Math.floor(window.innerHeight * 0.8);
  hatch.width = Math.floor(window.innerWidth * 0.8 / 10) * 10;
  const ctx = hatch.getContext('2d');
  const ball = new Ball(hatch.width).createBall();
  const game = new Game(hatch, ball);
  createjs.Ticker.on("tick", game.start);
  createjs.Ticker.on("tick", game.moveBall);
  createjs.Ticker.setFPS(60);
})
