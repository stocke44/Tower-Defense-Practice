'use strict'

class Bullet{

  constructor(location, bImg, angle){
    this.loc = location;
    this.speed = 12;
    this.angle = angle;
    this.img = bImg;
  }

  run(){
    this.render();
    this.update();
  }
  render(){
  
    var ctx = towerGame.context;
    ctx.save();//saves the refrence point for the ship so that shooting the bullet does not affect the position of the ship otherwise it jitters on the screen
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);

    ctx.restore();
  }

  update(){
    this.loc.y += Math.sin(this.angle)*this.speed;
    this.loc.x += Math.cos(this.angle)*this.speed;

  }};