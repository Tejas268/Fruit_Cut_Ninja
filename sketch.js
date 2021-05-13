//Game States
var PLAY = 0;
var END = 1;
var WIN = 2;
var NAN = 3;
var gameState = PLAY;

var XF, YF, XM, YM, VXF, VYF, VXM, VYM;

var knife, fruit, fruitCutSound, fruitsGroup,monster,                 monsterA,monstersGroup, gameOver, gameOverSound, youWinSound,     youWin, score;

var kinfeImage, fruit1, fruit2, fruit3, fruit4;

function preload(){
  
  knifeImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterA = loadAnimation("alien1.png","alien2.png");
  gameOver = loadImage("gameover.png");
  youWin = loadImage("youwin.jpg")
  
  fruitCutSound = loadSound("knifeSwooshSound.mp3");
  youWinSound = loadSound("youwin.mp3")
  gameOverSound = loadSound("gameover.mp3")

}

function setup() {
  createCanvas(600,600);
  
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImage)
  knife.scale = 0.7;
  knife.setCollider("rectangle",0,0,40,40);
  
  score = 0;
  fruitsGroup = createGroup();
  monstersGroup = createGroup();
}

function draw() {
  background("lightBlue");
  
  if (gameState === PLAY) {
    
    
    game();
    knife.y = mouseY;
    knife.x = mouseX;
    
  if (fruitsGroup.isTouching(knife)){
    fruitsGroup.destroyEach();
    score = score + 2;
    if (score < 35) {
      fruitCutSound.play();
    }
  }
    if (monstersGroup.isTouching(knife)) {
      gameState = END;
    }
    
    if (score > 34) {
      gameState = WIN
    }
    
 } else if (gameState === END) {
   fruitsGroup.destroyEach();
   monstersGroup.destroyEach();
   knife.x = 300;
   knife.y =300;
   knife.addImage(gameOver);
   gameOverSound.play();
   gameState = NAN;
   
 } else if (gameState === WIN) {
   fruitsGroup.destroyEach();
   monstersGroup.destroyEach();
   knife.x = 300;
   knife.y =300;
   knife.addImage(youWin);
   youWinSound.play();
   gameState = NAN;
   
 } else if (gameState === NAN) {
   
   if (keyDown("space")) {
    knife.addImage(kinfeImage);
    score = 0;
    gameState = Play;
  }
 }
  
  drawSprites();
  text("Score : "+ score,300,30);
  
}

function game() {
  var N = Math.round(random(1,4))
  if (N === 1) {
    YF = Math.round(random(50,340));
    XF = 0;
    XM = 600;
    YM = Math.round(random(100,300));
    VXF = (8 + score/4);
    VXM = -(9 + score/10);
    VYF = 0;
    VYM = 0;
    
    fruits();
    monsters();
    
  } else if (N === 2) {
    YF = Math.round(random(50,340));
    XF = 600;
    YM = Math.round(random(100,300));
    XM = 0;
    VXF = -(8 + score/4);
    VXM = (9 + score/10);
    VYF = 0;
    VYM = 0;
    
    fruits();
    monsters();
    
  } else if (N === 3) {
    YF = 600;
    XF = Math.round(random(50,340));
    YM = 0;
    XM = Math.round(random(100,300));
    VXF = 0;
    VXM = 0;
    VYF = -(8 + score/4);
    VYM = (9 + score/10);
    
    fruits();
    monsters();
    
  } else if (N === 4) {
    YF = 0;
    XF = Math.round(random(50,340));
    YM = 600;
    XM = Math.round(random(100,300));
    VXF = 0;
    VXM = 0;
    VYF = (8 + score/4);
    VYM = -(9 + score/10);
    
    fruits();
    monsters();
    
  }
}

function fruits() {
  if (frameCount % 75 === 0) {
    fruit=createSprite(XF,YF,20,20);
    fruit.velocityX = VXF;
    fruit.velocityY = VYF;
    fruit.scale = 0.2;
    fruit.lifetime = 100;
    var RD = Math.round(random(1,4));
    if (RD === 1){
      fruit.addImage(fruit1);
    } else if (RD === 2){
      fruit.addImage(fruit2);
    } else if (RD === 3){
      fruit.addImage(fruit3);
    } else if (RD === 4){
      fruit.addImage(fruit4);
    }
    
    fruitsGroup.add(fruit);
  }
}

function monsters() {
  if (frameCount % 190 === 0) {
    monster = createSprite(XM,YM,20,20);
    monster.addAnimation("moving", monsterA);
    monster.velocityX = VXM;
    monster.velocityY = VYM;
    monster.lifetime = 80;
    
    monstersGroup.add(monster);
  }
}