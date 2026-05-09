const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};

document.addEventListener("keydown", (e)=>{
  keys[e.key] = true;
});

document.addEventListener("keyup", (e)=>{
  keys[e.key] = false;
});

const player = {
  x:100,
  y:300,
  width:50,
  height:70,
  speed:5,
  color:"lime",
  direction:"right"
};

const pirates = [
  {x:700,y:320,width:50,height:70},
  {x:900,y:320,width:50,height:70}
];

let cameraX = 0;

function movePlayer(){

  if(keys["ArrowRight"]){
    player.x += player.speed;
    player.direction = "right";
  }

  if(keys["ArrowLeft"]){
    player.x -= player.speed;
    player.direction = "left";
  }

  if(keys["ArrowUp"]){
    player.y -= player.speed;
  }

  if(keys["ArrowDown"]){
    player.y += player.speed;
  }

  if(player.y < 200){
    player.y = 200;
  }

  if(player.y > 350){
    player.y = 350;
  }

  cameraX = player.x - 200;
}

function drawBackground(){

  ctx.fillStyle = "#5cc8ff";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#228B22";

  for(let i=0;i<30;i++){
    ctx.fillRect(i*200-cameraX,370,120,150);
  }

  ctx.fillStyle = "#8B4513";

  for(let i=0;i<20;i++){
    ctx.fillRect(i*250-cameraX,250,40,120);

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(i*250+20-cameraX,220,50,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "#8B4513";
  }
}

function drawPlayer(){

  ctx.fillStyle = player.color;

  ctx.fillRect(
    player.x-cameraX,
    player.y,
    player.width,
    player.height
  );

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(
    "Peter Pan",
    player.x-cameraX-10,
    player.y-10
  );
}

function drawPirates(){

  pirates.forEach((pirate)=>{

    ctx.fillStyle = "red";

    ctx.fillRect(
      pirate.x-cameraX,
      pirate.y,
      pirate.width,
      pirate.height
    );

    ctx.fillStyle = "white";

    ctx.fillText(
      "Pirate",
      pirate.x-cameraX-10,
      pirate.y-10
    );

    if(
      player.x < pirate.x + pirate.width &&
      player.x + player.width > pirate.x &&
      player.y < pirate.y + pirate.height &&
      player.y + player.height > pirate.y
    ){

      ctx.fillStyle = "yellow";
      ctx.font = "40px Arial";

      ctx.fillText(
        "Battle With Pirates!",
        330,
        80
      );
    }

  });
}

function drawStoryAreas(){

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";

  ctx.fillText(
    "London",
    100-cameraX,
    150
  );

  ctx.fillText(
    "Lost Boys Camp",
    900-cameraX,
    150
  );

  ctx.fillText(
    "Tiger Lily Village",
    1500-cameraX,
    150
  );

  ctx.fillText(
    "Pirate Ship",
    2200-cameraX,
    150
  );
}

function gameLoop(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  movePlayer();

  drawBackground();

  drawStoryAreas();

  drawPirates();

  drawPlayer();

  requestAnimationFrame(gameLoop);
}

gameLoop();
