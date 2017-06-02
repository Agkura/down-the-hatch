/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Ball{ // make static or js object
  constructor(width){
    this.width = width;
    this.radius = 5;
    console.log(this.radius);
    console.log(width * 0.02 / 10);
  }
  createBall(){
    let ball = new createjs.Shape()
    let container = new createjs.Container();
    ball.graphics.beginFill("#000000").drawCircle(0, 0, this.radius, this.radius)
    container.addChild(ball);
    container.x = this.width/2;
    container.y = 0;
    // ball.setBounds(-this.radius/2,-this.radius/2, this.radius, this.radius);
    container.setBounds(-this.radius/2,-this.radius/2, this.radius, this.radius);
    return container;
  }
}

module.exports = Ball;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(0);
const Block = __webpack_require__(2);

class Game{
  constructor(canvas, ball){
    this.canvas = canvas;
    this.stage = new createjs.Stage(canvas);
    this.ball = ball;
    this.stage.addChild(this.ball);
    this.xLine = [];
    this.walls = [];
    this.lineHeight;
    this.yLine;
    this.generationRate = 40;
    this.score = 0;

    //Keep the same speed across any window size
    this.fallRate = Math.floor(this.stage.canvas.height * 0.01);
    this.stepRate = Math.floor(this.stage.canvas.width * 0.015);

    this.start = this.start.bind(this);
    this.generateWall = this.generateWall.bind(this);
    this.increaseFrequency = this.increaseFrequency.bind(this);
  }


  start(){
    this.checkGameOver();
    this.ball.y += this.fallRate;
    //Ball would cross through a block in the line
    if (this.collideBrick()){
      this.ball.y -= this.fallRate * 2
    }
    this.stage.update();

    if (key.isPressed("d") || key.isPressed(39))
      {this.ball.x += this.stepRate;}
    if (key.isPressed("a") || key.isPressed(37))
      {this.ball.x -= this.stepRate;}

    //differentiate from hitting left-side of block vs the right side of the block
    if (this.collideRightWall() || (this.collideBrick() && (key.isPressed("d") || key.isPressed(39))))
      { this.ball.x -= this.stepRate }

    this.stage.update();
    if (this.collideLeftWall() || (this.collideBrick() && (key.isPressed("a") || key.isPressed(37))))
      { this.ball.x += this.stepRate }

    this.stage.update();


    if (createjs.Ticker.getTicks(true) % this.generationRate === 0) {
      this.generateWall();
    }
    this.stage.update();

    this.moveWall();
    this.stage.update();

    if (this.ball.y > this.canvas.height - this.lineHeight)
      {this.ball.y -= this.fallRate };

    this.stage.update();
    this.increaseFrequency();
  }


  generateWall(){
    let wall = new Block(this.canvas.width, this.canvas.height).createLine();
    this.lineHeight = wall.children[0]._bounds.height;
    this.walls.push(wall);
    this.stage.addChild(wall);
    this.stage.update();
  }

  collideRightWall(){
    if (this.ball.x >= this.canvas.width + this.ball._bounds.x){
      return true;
    }
    return false;
  }


  collideLeftWall(){
    if (this.ball.x <= -this.ball._bounds.x){
      return true;
    }
    return false;
  }

  collideXRange(){
    let xCross = false;
    this.xLine.forEach( array => {
      if ( (this.ball.x + this.ball._bounds.x >= array[0] || (this.ball.x - this.ball._bounds.x >= array[0]) )&& (this.ball.x + this.ball._bounds.x <= array[1] || (this.ball.x - this.ball._bounds.x <=array[1]) ) ) { xCross = true}
    })
    return xCross
  }

  collideBrick(){
    if ( ((this.ball.y + this.ball._bounds.height >= this.yLine)  || (this.ball.y >= this.yLine)) && ((this.ball.y + this.ball._bounds.height <= this.yLine + this.lineHeight) || (this.ball.y  <= this.yLine + this.lineHeight))){
      if (this.collideXRange()){
        return true;
      }
    }
    return false;
  }

  collideBrickSlide(){
    if (this.ball.y > this.yLine && this.ball.y < this.yLine + this.lineHeight){
      if (this.collideXRange()){
        return true;
      }
    }
    return false;
  }

  moveWall(){
    let setXCross = true;
    if (!(this.ball.y <= 0)){
      this.walls.forEach( (container, idx) => {
        if (container.parent != null &&( this.ball.y < container.y )&& setXCross) {
          this.setXLines(container);
          this.yLine = container.y;
          setXCross = false;
        }

        container.y -= this.fallRate
        if (container.y < -100) {
          this.stage.removeChild(container);
          this.walls.shift();
          this.score += Math.floor(this.generationRate) ;
        }
      })
    }
  }

  setXLines(container){
    this.xLine = container.children.map( el => [el.x, el.x + el._bounds.width]);
  }

  increaseFrequency(){
    if (this.score > 1000 ) { this.generationRate = 35}
    if (this.score > 2000 ) { this.generationRate = 30}
    if (this.score > 3000 ) { this.generationRate = 35}
    if (this.score > 4000 ) { this.generationRate = 20}
    if (this.score > 5000 ) { this.generationRate = 10}
  }

  reset(){
    this.stage.removeAllChildren();
    this.ball = new Ball(this.canvas.width).createBall();
    this.stage.addChild(this.ball);
    this.xLine = [];
    this.yLine = undefined;
    this.score = 0;
    this.generationRate = 40;
  }

  checkGameOver(){
    if (this.ball.y <= this.ball._bounds.width && this.yLine <= this.ball.y + this.ball._bounds.width) {
      this.reset();
      let modal = document.getElementById("modal");
      window.toggleOff();
      createjs.Ticker.removeAllEventListeners();
      createjs.Ticker.paused = true;
    }
  }

  getScore(){
    return this.score;
  }

  gameOver(){
    return Boolean(this.stage.children.length <= 1 && this.yLine === undefined );
  }

}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Block{
  constructor(width, height){
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.width = Math.floor(width * 0.04);
    this.height = Math.floor(width * 0.02);
    this.numBlocks = Math.floor(this.canvasWidth/this.width);

    this.createBlock = this.createBlock.bind(this);
    this.createLine = this.createLine.bind(this);
  }

  createBlock(xPos){
    let block = new createjs.Shape();
    block.graphics.beginFill("#000000").drawRoundRect(0,0, this.width, this.height, 3);
    block.setBounds(-(this.width/2),-(this.height/2),this.width, this.height);
    block.x = xPos;
    //
    // block.y = this.canvasHeight - this.height;
    return block;
  }

  createLine(){ //static or line class
    let container = new createjs.Container();
    const randomizer = [true,false,true, true, true, true, true];
    for(let i = 0; i < this.numBlocks; i++){
      if (randomizer[Math.floor(Math.random() * randomizer.length)] && container.children.length != (this.numBlocks - 1)){
        let xPos = this.width * i;
        container.addChild(this.createBlock(xPos));
      }
    }
    container.setBounds(null, null, null, this.height)
    container.y = this.canvasHeight;
    return container;
  }

  randomizer(){
    let random = [];
    for(let i = 0; i<this.numBlocks;i++){ random.push(i) }
    return
  }

}

module.exports = Block;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const Ball = __webpack_require__(0);



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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map