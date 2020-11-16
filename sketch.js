var monkey, monkey_running;
var banana, imgBanana, objObstacle, imgNewGround, imgObstacle;
var grpFood, grpObstacle;
var surTime = 0;
var bg;
var can;
var score = 0;
var hit = 0;

function preload() {
  groundBackground = loadImage("jground_89.png");
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_stop = loadAnimation("sprite_0.png")
  imgBanana = loadImage("banana.png");
  imgObstacle = loadImage("obstacle.png");
  imgNewGround = loadImage("land.png");
}

function setup() {
  can = createCanvas(600, 400);
  bg = createSprite(0, 200, 600, 20);
  bg.addImage(groundBackground);
  bg.scale = 0.7;
  bg.velocityX = -4;
  bg.x = windowWidth / 2;

  monkey = createSprite(50, 300, 50, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("monkey_stop",monkey_stop);
  monkey.scale = 0.1;
  //monkey.debug = true;

  ground = createSprite(300, 350, 600, 10);
  ground.visible = false;

  // create a group for food
  grpFood = Group();
  grpObstacle = Group();
}

function draw() {

  background(0);

   //console.log(monkey.y);

    if (bg.x < 0) {
      bg.x = windowWidth / 2;
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;
  
    monkey.collide(ground);

    drawSprites();
  
    if(hit === 1){
        bg.velocityX = 0;   
        monkey.velocityY = 0;            
        monkey.changeAnimation("monkey_stop",monkey_stop);
        grpFood.destroyEach();
        grpObstacle.destroyEach();
        textSize(30);
        fill("red");
        text("Game Over!",245,200);
        textSize(20);   
        text("Press 'r' to restart.",245,240);
    }
    else{
        bg.velocityX = -4;  
        if (keyDown("space") && monkey.y >= 270) {
          monkey.velocityY = -12;
        }
        surTime = surTime + Math.round(frameRate() / 60); 
        touchFood();
        scoreCount();
        touchMonkey();
        obstacles();
        monkeyFood();
    }
      displayItems();
    if (hit === 1 && keyDown("r")){
       monkey.changeAnimation("monkey", monkey_running);
       hit = 0;
       surTime = 0;
       score = 0;      
    }
}

function displayItems(){
  textSize(20);
  rect(535, 32, 58, 22);
  rect(400, 32, 133, 22);
  rect(535, 58, 58, 22);
  rect(400, 58, 133, 22);
  fill("White")
  text("Survival Time:\t" + surTime, 405, 50);
  textSize(18);
  fill("black")
  text("Score:\t " + score, 480, 74);
}

function touchFood(){
  
    if (grpFood.isTouching(monkey)) {
      grpFood.destroyEach();
      score = score + 2;
    }
}

function touchMonkey(){
  
      if (grpObstacle.isTouching(monkey)) {
      monkey.scale = 0.1;
      if (hit === 0) {
        //console .log("print in hit");
        hit = 1;
      }
    }
}

function scoreCount(){
  
      switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.16;
        break;
      case 30:
        monkey.scale = 0.20;
        break;
      case 40:
        monkey.scale = 0.24;
        break;
      default:
        break;
    }

}

function monkeyFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 15, 15);
    banana.addImage(imgBanana);
    banana.y = Math.round(random(120, 190));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.life = width / banana.velocityX;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    grpFood.add(banana);

  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    objObstacle = createSprite(600, 325, 50, 50);
    objObstacle.addImage(imgObstacle);

    objObstacle.scale = 0.15;

    // object obstacle moves in left direction
    objObstacle.velocityX = -4;

    // object life time is set to 100
    objObstacle.setLifetime = 50;
    objObstacle.setCollider("circle",0,0,275);
    //objObstacle.debug = true;
    // add the obstacle to the obstacle group
    grpObstacle.add(objObstacle);
  }
}