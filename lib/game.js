const Ball = require('./ball');
const Wall = require('./wall');



class Game{
  constructor(canvas, ball){
    this.stage = new createjs.Stage(canvas);
    this.ball = ball;
    this.stage.addChild(this.ball);
    this.start = this.start.bind(this);
    this.moveBall = this.moveBall.bind(this);
  }

  start(event){
    this.ball.y += 5;
    this.ball.rotation+= 5;
    if (this.ball.y > this.stage.canvas.height) {this.ball.y = 0};
    this.stage.update(event);
  }

  moveBall(event){
    if (key.isPressed("d") || key.isPressed(39)){this.ball.x += 10;}
    if (key.isPressed("a") || key.isPressed(37)){this.ball.x -= 10;}
    if(this.ball.x + (this.ball.graphics.command.w) >= this.stage.canvas.width) { this.ball.x -= 10 }
    if(this.ball.x <= 0) { this.ball.x = 0 }
    this.stage.update(event);
  }
}

module.exports = Game;
