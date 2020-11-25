var spaceship;
var ufo1, ufo2, ufo3;
var earth;
var bullet;
var bullet1;
var edges;
var left_but;
var right_but;
var reset_but;

var ufo_img;
var spaceship_img;
var earth_img;
var left_but_img;
var right_but_img;
var shoot_but_img;
var reset_but_img;

var ufoGroup;
var bulletGroup1;
var bulletGroup;

var gameState = "play";

var gunshot;
var ufo_def;
var back;
var game_end;

var score = 0;

function preload() {
  spaceship_img = loadImage("spaceship.jpg");
  ufo_img = loadImage("ufo.jpg");
  gunshot = loadSound("gunshot.mp3");
  ufo_def = loadSound("ufo_def.mp4");
  back = loadSound("space.mp3");
  earth_img = loadImage("earth.jpg");
  game_end = loadSound("GAMEOVER.wav");
  left_but_img = loadImage("left_but.png");
  right_but_img = loadImage("right_but.png");
  shoot_but_img = loadImage("shoot_but.png")
  reset_but_img = loadImage("Reset_but.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ufoGroup = createGroup();
  bulletGroup = createGroup();
  bulletGroup1 = createGroup();

  spaceship = createSprite(750, 675, 10, 10);
  spaceship.scale = 0.3;
  spaceship.addImage(spaceship_img);

  left_but = createSprite(50, 650, 20, 20);
  left_but.scale = 0.4;
  left_but.addImage(left_but_img)

  right_but = createSprite(1475, 650, 20, 20);
  right_but.scale = 0.4;
  right_but.addImage(right_but_img)

  shoot_but = createSprite(1300, 700, 30, 30);
  shoot_but.scale = 0.1;
  shoot_but.addImage(shoot_but_img)

  ufo1 = createSprite(random(0, 1500), random(0, 400), 20, 20);
  ufo1.scale = 0.3;
  ufoGroup.add(ufo1);
  ufo1.addImage(ufo_img);

  ufo2 = createSprite(random(0, 1500), random(0, 400), 20, 20);
  ufo2.scale = 0.3;
  ufoGroup.add(ufo2);
  ufo2.addImage(ufo_img);

  ufo3 = createSprite(random(0, 1500), random(0, 400), 20, 20);
  ufo3.scale = 0.3;
  ufoGroup.add(ufo3);
  ufo3.addImage(ufo_img);

  reset_but = createSprite(50, 50, 20, 20);
  reset_but.addImage(reset_but_img);
  reset_but.scale = 0.2;
}

function draw() {
  background(0);

  ufo1.x = random(0, 500);
  ufo1.y = random(0, 400);

  ufo2.x = random(500, 1000);
  ufo2.y = random(0, 400);

  ufo3.x = random(1000, 1500);
  ufo3.y = random(0, 400);

  if (gameState === "play") {

    spaceship.visible = true;

    if (mousePressedOver(left_but)) {
      spaceship.x = spaceship.x - 3;
    }

    if (mousePressedOver(right_but)) {
      spaceship.x = spaceship.x + 3;
    }


    if (bulletGroup.isTouching(ufo1)) {
      ufo1.destroy();
      score = score + 2;
      bulletGroup.destroyEach();
      ufo_def.play();
    }
    if (bulletGroup.isTouching(ufo2)) {
      ufo2.destroy();
      score = score + 2;
      bulletGroup.destroyEach();
      ufo_def.play();
    }
    if (bulletGroup.isTouching(ufo3)) {
      ufo3.destroy();
      score = score + 2;
      bulletGroup.destroyEach();
      ufo_def.play();
    }

    if (mousePressedOver(shoot_but)) {
      bullet_fun();
    }

    edges = createEdgeSprites();

    spaceship.collide(edges);

    if (score === 6) {
      textSize(50);
      fill(random(0, 255), random(0, 255), random(0, 255));
      text("YOU WIN!!!", 650, 400);
    }

    if (bulletGroup1.isTouching(spaceship)) {
      gameState = "end";
    }
  } else if (gameState === "end") {

    spaceship.visible = false
    bulletGroup.destroyEach();

    earth = createSprite(750, 700, 20, 20);
    earth.scale = 1
    earth.addImage(earth_img);
    bulletGroup1.add(earth)

    fill("red");
    textSize(30);
    text("GAME ENDED YOU LOSE!!!", 600, 300);


    if (frameCount % 60) {
      bullet1 = createSprite(random(0, 1500), 10, 7, 12);
      bullet1.shapeColor = "red";
      bullet1.velocityY = 6;
      bulletGroup1.add(bullet1);
    }

    if (mousePressedOver(reset_but)) {
      reset();
    }
  }

  drawSprites();

  textSize(30);
  fill(random(0, 255), random(0, 255), random(0, 255));
  text("YOUR SCORE:" + score, 1200, 50);
}

function bullet_fun() {
  bullet = createSprite(spaceship.x, spaceship.y, 5, 10);

  bullet.shapeColor = random(0, 255), random(0, 255);
  bullet.velocityY = -4;
  bulletGroup.add(bullet);

  bullet1 = createSprite(random(0, 1500), 10, 7, 12);
  bullet1.shapeColor = "red";
  bullet1.velocityY = 9;
  bulletGroup1.add(bullet1);

  gunshot.play();
}

function reset() {
  gameState = "play";
  score = 0;
  earth.destroy();
  reset_but.visiblity = false;
  bulletGroup1.destroyEach()
}