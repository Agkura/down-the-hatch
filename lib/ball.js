class Ball{ // make static or js object
  constructor(width){
    this.width = width;
    this.radius = Math.floor(width * 0.02 / 10) * 10;
  }
  createBall(){
    let ball = new createjs.Shape()
    let container = new createjs.Container();
    ball.graphics.beginFill("#ff0000").drawCircle(0, 0, this.radius, this.radius)
    container.addChild(ball);
    container.x = this.width/2;
    ball.setBounds(-this.radius/2,-this.radius/2, this.radius, this.radius);
    container.setBounds(-this.radius/2,-this.radius/2, this.radius, this.radius);
    return container;
  }
}

module.exports = Ball;
