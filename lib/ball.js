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
