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

    //Keep the same speed across any window size
    this.fallRate = Math.floor(this.stage.canvas.height * 0.008);
    this.stepRate = Math.floor(this.stage.canvas.width * 0.008);

    this.start = this.start.bind(this);
    this.generateWall = this.generateWall.bind(this);
  }

  start(){

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
    if (this.collideRightWall() || (this.collideBrickSlide() && (key.isPressed("d") || key.isPressed(39))))
      { this.ball.x -= this.stepRate }
    if (this.collideLeftWall() || (this.collideBrickSlide() && (key.isPressed("a") || key.isPressed(37))))
      { this.ball.x += this.stepRate }

    this.stage.update();


    if (createjs.Ticker.getTicks() % 50 === 0) {
      this.generateWall();
    }
    this.stage.update();

    this.moveWall();
    this.stage.update();

    if (this.ball.y > this.canvas.height - this.lineHeight)
      {this.ball.y -= this.fallRate };
    this.stage.update();
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
    if (this.ball.y + this.ball._bounds.height >= this.yLine  && this.ball.y + this.ball._bounds.height <= this.yLine + this.lineHeight){
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
        container.y -= this.fallRate
        if (container.y < -500) {
          this.stage.removeChild(container);
          this.walls.shift();
        }

        if (container.parent != null &&( this.ball.y < container.y )&& setXCross) {
          this.setXLines(container);
          this.yLine = container.y;
          setXCross = false;
        }
      })
    }
  }


  setXLines(container){
    this.xLine = container.children.map( el => [el.x, el.x + el._bounds.width]);
  }

}

module.exports = Game;
