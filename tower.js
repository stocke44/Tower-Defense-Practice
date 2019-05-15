'use strict'
window.onload = startUp;
var towerGame;
const frameRate = 30;
var canvas, ctx, ball;

function startUp(){
    canvas = document.getElementById('tower-defense');
    // ctx = canvas.getContext('2d');
    // ball= new Ball();
    // resize();
    towerGame = new Game();
    window.setTimeout(animate,100);
}

function animate(){
    towerGame.run();
    window.requestAnimationFrame(animate);
    // ctx.clearRect(0,0,document.body.clientWidth,document.body.clientHeight) // erases the trail of pixels that would be left behind by the render function only displaying one singular ball moving across the screen.
    // ball.update();
}

// towerGame.towers[towerGame.towers.length-1].placed = true;
// towerGame.placingTower = false;

class Game {
    constructor(){
        this.towers =[];
        this.enemies = [];
        this.bullets = [];

        this.cnv = document.createElement("canvas");
        console.log(this.cnv);
        console.log(this.cnv.getContext);
        if(!this.cnv || !this.cnv.getContext)
            throw "no valid canvas found!";
        this.cnv.width = 900;
        this.cnv.height = 750;
        document.getElementById('can-div').appendChild(this.cnv);
        this.context = this.cnv.getContext("2d");
        if(!this.context)
            throw "no valid context found!";
        this.tileDivs = this.createTileDivs(); 

    }
    run(){};

    render(){};

    updateStatusTiles(time){};
    
    updateTime(){};

    hideImgElement(){ this.style.display ="none"};

    createTileDivs(){
        var tiles =[];
        for(var i=0; i<4;i++){
            var objects = document.createElement('div');
            var ships = "images/ship"+(i+1)+"s.png"// adds ship which are the towers into the array
            var projectile = "images/bullet.png"// adds bullets for respective ship into array
            

            objects.cnvShipImg = new Image();
            objects.cnvShipImg.addEventListener('load',this.hideImgElement,false);
            objects.cnvShipImg.addEventListener('error',function(){console.log(ships + "failed to load");},false);
            objects.cnvShipImg.src=ships;


            objects.cnvBulletImg = new Image();
            objects.cnvBulletImg.addEventListener('load',this.hideImgElement,false);
            objects.cnvBulletImg.addEventListener('error',function(){console.log(projectile + "failed to load");},false);
            objects.cnvBulletImg.src= projectile;
            
            document.getElementById('tower-select').appendChild(objects);
            
            objects.cost = 100*1 +50;
            objects.id = "shipImgDiv"+i;
            tiles.push(objects);
            var tileImagePath = "images/ship"+(i+1)+"s.png";
            var tileImg = new Image();
            tileImg.addEventListener('error',function(){console.log(tileImagePath + "failed to load");},false);
            tileImg.src = tileImagePath;
            objects.appendChild(tileImg);
            
            objects.children[0].className = "selectDisplay";            
        }
        return tiles;
    };



};





// function Ball(){
//     this.x = Math.random()*window.innerWidth;// position on the x-axis
//     this.y = Math.random()*window.innerHeight;//position on the y-axis
//     this.dx = Math.random()*6-3;// change in acceleration
//     this.dy = Math.random()*6-3;// change in time
//     this.rad = Math.random()*10+15;// size of the circle

//     this.update = function(){
//         this.x += this.dx;//updates position on x-axis in relation to accerlation
//         this.y += this.dy;// updates position on y-axis in relation to time
//         this.render();
//     }

//     this.render = function(){
//         ctx.strokeStyle = 'rgba(2,2,2,1)';
//         ctx.fillStyle = 'rgba(155,100,20,.8)';
//         ctx.beginPath();
//         ctx.arc(this.x,this.y,this.rad,Math.PI*2,0,false);
//         ctx.stroke();
//         ctx.fill();
//     }


// }

// window.addEventListener('resize', resize);
// function resize() {
//    canvas.width = document.body.clientWidth;
//    canvas.height = document.body.clientHeight;
// }




