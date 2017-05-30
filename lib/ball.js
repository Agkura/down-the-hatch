class Ball{
  constructor(width){
    this.radius = Math.floor(width * 0.05 / 10) * 10;
  }
  createBall(){
    let ball = new createjs.Shape()
    ball.graphics.beginFill("#000000").drawRect(0,0,this.radius,this.radius)
    ball.regX = this.radius/2;
    ball.regY = this.radius/2;
    console.log(ball);
    return ball;
  }
}

module.exports = Ball;
