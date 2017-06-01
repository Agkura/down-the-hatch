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
    block.graphics.beginFill("#000000").drawRect(0,0, this.width, this.height);
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
