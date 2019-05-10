

window.onload = startUp;
var canvas, ctx, ball;

function startUp(){
    canvas = document.getElementById('tower-defense');
    ctx = canvas.getContext('2d');
    ball= new Ball();
    canvas.style.width = window.innerWidth;
    canvas.style.height = `window.innerHeight`;
    canvas.style.border = 'solid black 2px'
    canvas.style.backgroundColor = 'green'

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    ball.update();
}


function Ball(){
    this.x = Math.random()*window.innerWidth;
    this.y = Math.random()*window.innerHeight;
    this.dx = Math.random()*6-3;
    this.dy = Math.random()*6-3;
    this.rad = Math.random()*10+15;

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
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
