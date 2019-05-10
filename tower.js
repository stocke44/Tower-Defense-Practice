

window.onload = startUp;
var canvas, ctx, ball;

function startUp(){
    canvas = document.getElementById('tower-defense');
    ctx = canvas.getContext('2d');
    ball= new Ball();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.height);
    console.log(canvas.width);
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    canvas.style.border = 'solid black 2px'
    canvas.style.backgroundColor = 'green'

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    ball.update();
}


function Ball(){
    this.x = Math.random()*window.innerWidth;// position on the x-axis
    this.y = Math.random()*window.innerHeight;//position on the y-axis
    this.dx = Math.random()*6-3;// change in acceleration
    this.dy = Math.random()*6-3;// change in time
    this.rad = Math.random()*10+15;// size of the circle

    this.update = function(){
        this.x += this.dx;//updates position on x-axis in relation to accerlation
        this.y += this.dy;// updates position on y-axis in relation to time
        this.render();
    }

    this.render = function(){
        ctx.strokeStyle = 'rgba(2,2,2,1)';
        ctx.fillStyle = 'rgba(155,100,20,.8)';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.rad,Math.PI*2,0,false);
        ctx.stroke();
        ctx.fill();
    }

}
