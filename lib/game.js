const Ball = require('./ball');
const Block = require('./block');

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
    if (this.score > 5000 ) { this.generationRate = 35}
    if (this.score > 6000 ) { this.generationRate = 20}
    if (this.score > 7000 ) { this.generationRate = 10}
  }

  reset(){
    this.stage.removeAllChildren();
    this.ball = new Ball(this.canvas.width).createBall();
    this.stage.addChild(this.ball);
    this.xLine = [];
    this.yLine = undefined;
    this.score = 0;
  }

  checkGameOver(){
    if (this.ball.y <= this.ball._bounds.width && this.yLine <= this.ball.y + this.ball._bounds.width) {
      this.reset();
      let modal = document.getElementById("modal");
      modal.style.display = "block";
      createjs.Ticker.removeAllEventListeners();
      createjs.Ticker.paused = true;
    }
  }

  getScore(){
    return this.score;
  }

}

module.exports = Game;
