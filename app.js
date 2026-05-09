const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x:20,
  y:200,
  width:20,
  height:100,
  speed:6
};

const enemy = {
  x:860,
  y:200,
  width:20,
  height:100,
  speed:4
};

const ball = {
  x:450,
  y:250,
  radius:12,
  speedX:5,
  speedY:4
};

const keys = {};

document.addEventListener("keydown",(e)=>{
  keys[e.key]=true;
});

document.addEventListener("keyup",(e)=>{
  keys[e.key]=false;
});

function movePlayer(){

  if(keys["ArrowUp"]){
    player.y -= player.speed;
  }

  if(keys["ArrowDown"]){
    player.y += player.speed;
  }

  if(player.y < 0){
    player.y = 0;
  }

  if(player.y + player.height > canvas.height){
    player.y = canvas.height - player.height;
  }
}

function moveEnemy(){

  if(ball.y < enemy.y + enemy.height/2){
    enemy.y -= enemy.speed;
  }else{
    enemy.y += enemy.speed;
  }
}

function moveBall(){

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if(ball.y < 0 || ball.y > canvas.height){
    ball.speedY *= -1;
  }

  if(
    ball.x - ball.radius < player.x + player.width &&
    ball.y > player.y &&
    ball.y < player.y + player.height
  ){
    ball.speedX *= -1;
  }

  if(
    ball.x + ball.radius > enemy.x &&
    ball.y > enemy.y &&
    ball.y < enemy.y + enemy.height
  ){
    ball.speedX *= -1;
  }

  if(ball.x < 0 || ball.x > canvas.width){
    ball.x = 450;
    ball.y = 250;
  }
}

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "lime";
  ctx.fillRect(player.x,player.y,player.width,player.height);

  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  ctx.fillText("Peter Pan",20,30);
  ctx.fillText("Pirate Captain",700,30);
}

function gameLoop(){

  movePlayer();
  moveEnemy();
  moveBall();
  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
