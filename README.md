## Down the Hatch
[live](http://matthew-moon.com/down-the-hatch)

Down the Hatch is a Javascript recreation of the Texas Instruments graphing calculator classic, *Falldown*, which itself is possibly an homage to *Fall Down 2600* by Atari.

### *Instructions*
The goal is to simply move left or right and drop through a series of breaks that appear on rising platforms.  The frequency of the rising walls increase over time.  Avoid hitting the ceiling for as long as possible.

![demo gif](./assets/demo.gif)

### *Build*
The entirety of the project was built with ES6 Vanilla flavored JavaScript, `easel.js` library from the [CreateJS](http://createjs.com/) suite, `keymaster.js` compliments of [madrobby](https://github.com/madrobby/keymaster), CSS3 and HTML5.

#### *Implementation*
The primary engine for the game relies on EaselJS and the `ticker` method: `createjs.Ticker.setFPS(65)`.

The `block` class creates a row or "wall" of blocks with a randomly set number of missing blocks to create the walls of the maze.

```ruby
for(let i = 0; i < this.numBlocks; i++){
  if (randomizer[Math.floor(Math.random() * randomizer.length)] && container.children.length != (this.numBlocks - 1)){
    let xPos = this.width * i;
    container.addChild(this.createBlock(xPos));
  }
}
```
Every wall is kept in a container that defines its bounds for collision detection against the ball.  And, of course, the walls are set to generate from the bottom of the canvas and move up at a set rate.

If a collision is ever made, we reverse the trajectory of the ball (or stop the movement) to match the wall moving upwards (or stop against the let or right edge).

```ruby
if (this.collideLeftWall() || (this.collideBrick() && (key.isPressed("a") || key.isPressed(37))))
  { this.ball.x += this.stepRate }
this.stage.update();
```

`EaselJS` was a nice wrapper library for `canvas`, but ultimately not necessary in making this sort of game.  The Canvas suite is great for meeting more graphics intensive needs but using it here proved to be fairly more cumbersome than it could have been without.



### *v2 tbd*
- [ ] Persistent High Scores: Node.js server to allow persistent scores.
- [ ] Mobile: The next logical step would be to bake-in a mobile-intuitive version allowing touch/slide for navigation as well as taps for pause and restart.
- [ ] Advanced difficulty: leave behind a 'brick' path disallowing the option to go back once started in a particular direction.
- [ ] Game Type Option: Allow wrap-around on platforms as toggle before game start, letting you leave from one end and enter the opposite.
