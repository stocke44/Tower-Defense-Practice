'use strict'
window.onload = startUp;
var towerGame;


function startUp(){
    // resize();
    towerGame = new Game();
    window.setTimeout(animate,100);
}

function animate(){
    towerGame.run();
    window.requestAnimationFrame(animate);

}

class Game {
    constructor(){
        this.isRunning = true;
        this.placingTower = false;
        this.currentTower = 0;
        this.towerType = 0;
        this.gameTime = 0;
        this.towers = [];
        this.enemies = [];
        this.bullets = [];
        this.bankValue = 500;
        this.cnv = document.createElement("canvas");

        this.cnv.width = 900;
        this.cnv.height = 750;
        document.getElementById('can-div').appendChild(this.cnv);
        this.context = this.cnv.getContext("2d");

        this.lastTime = Date.now();
        this.tileDivs = this.createTileDivs(); 
        this.callBacks(this.tileDivs);
        this.cnv.addEventListener('mousemove',this.handleCNVMouseMoved);
        this.cnv.addEventListener('mouseover',this.handleCNVMouseOver);
        this.cnv.addEventListener('click', this.handleCNVMouseClicked);
    }
    run() { // called from draw()
        let gt = this.updateGameTime();
        this.updateInfoElements(gt);
        this.removeBullets();
        if (this.isRunning) {
          this.render();
        }
        for (let i = 0; i < this.towers.length; i++) {
          this.towers[i].run();
        }
        for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].run();
        }
        for (let i = 0; i < this.bullets.length; i++) {
    
          this.bullets[i].run();
        }
    }
    
    render() { // draw game stuff
    this.context.clearRect(0,0,this.cnv.width, this.cnv.height);
    }
    
    removeBullets(){
    if(this.bullets.length < 1) return;
    for(let i = this.bullets.length-1; i >= 0; i--){

        if( this.bullets[i].loc.x < 0 ||
            this.bullets[i].loc.x > this.cnv.width ||
            this.bullets[i].loc.y < 0 ||
            this.bullets[i].loc.y > this.cnv.height ){
                this.bullets.splice(i, 1);
            }

        }
    }
    updateInfoElements(time){

    let infoElements = document.getElementById('status').getElementsByClassName('status-tiles');
    for(let i = 0; i < infoElements.length; i++){
        let info = infoElements[i];
        // change the html content after condition--use indexOf
        if(info.innerHTML.indexOf('Money') != -1){
        info.innerHTML = 'Money <br/>' + this.bankValue;
        }else if(info.innerHTML.indexOf('Time') != -1){
        info.innerHTML = 'Time <br/>' + time;
            }
        }
    }
    
    updateGameTime(){
    var millis = Date.now();
    if(millis - this.lastTime >= 1000) {
        this.gameTime++;
        this.lastTime = millis;
    }
    return this.gameTime;
    }

    createTileDivs(){
        var tiles =[];
        for(var i=0; i<4;i++){
            var objects = document.createElement('div');
            var ships = "images/ship"+(i+1)+"s.png"// adds ship which are the towers into the array
            var projectile = "images/bullet.png"// adds bullets for respective ship into array
            
            objects.cnvShipImg = new Image();
            objects.cnvShipImg.src=ships;

            objects.cnvBulletImg = new Image();
            objects.cnvBulletImg.src= projectile;
            
            document.getElementById('tower-select').appendChild(objects);
            
            objects.cost = 100* i +50;
            objects.id = "shipImgDiv"+i;
            tiles.push(objects);
            var tileImagePath = "images/ship"+(i+1)+"s.png";
            var tileImg = new Image();
            tileImg.src = tileImagePath;
            objects.appendChild(tileImg);
            
            objects.children[0].className = "selectDisplay";            
        }
        
        return tiles;
    }
    
    getBankValue(){
        return this.bankValue;
      }

    canAddTower() {
    // add conditions before allowing user to place turret
    if(towerGame.placingTower)
        return true;
    return(false);
    }
    
    createTower(turret) { // menu turret div
    // create a new tower object and add to array list
    // the menu tower div contains the parameters for the tower
    var tower = new Tower( turret.cost, turret.cnvShipImg, turret.cnvBulletImg);
    if(tower)
        this.towers.push(tower); // add tower to the end of the array of towers
    else {
        alert('failed to make tower');
    }
    }

    placeTower() {
    //  place tower into play area at location of mouse
    towerGame.towers[towerGame.towers.length-1].loc = vector2d(this.cnv.mouseX, this.cnv.mouseY);

    //  tower needs to know if it is placed
    towerGame.towers[towerGame.towers.length-1].placed = true;

    //  only one tower placed at a time
    towerGame.placingTower = false;
    }


    callBacks(tiles){
        
        for(var i=0;i<tiles.length;i++)
        {
            var callBackTiles = tiles[i];
            callBackTiles.addEventListener('click',this.tileClicked);
        }
    }

    tileClicked() {
        //if user clicks tile and not placing tile change placing to true
        // can add Tower checks cost and other conditions
        if (towerGame.getBankValue() > 100) {
          towerGame.createTower(this);
          towerGame.placingTower = true;
        }
    }

    handleCNVMouseOver() {
        if(towerGame.towers.length < 1) return;
        towerGame.towers[towerGame.towers.length-1].visible = true;
    }
    
    handleCNVMouseMoved(event) {
    // add some properties to the canvas to track the mouse.
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
    if(towerGame.towers.length < 1) return;
    if(!towerGame.towers[towerGame.towers.length-1].placed &&
        towerGame.placingTower === true ){
        //follow mouse
        towerGame.towers[towerGame.towers.length-1].loc.x = this.mouseX;
        towerGame.towers[towerGame.towers.length-1].loc.y = this.mouseY;
        }
    }
    
    handleCNVMouseClicked() {
        if(towerGame.canAddTower()){
            towerGame.placeTower();
        }
    }


};