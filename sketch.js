//##########
//Hit the mosquito
//Developed by Jiajun Huo s3715557
//Computational Prototyping for Industrial Design
//Assignment 3: Creative Software Project - Documentation

//# #################
//Variables defination 
//########################/
var backgroundImage;
var balloonClickSound;
var missClickSound;
var gameoverSound;
var gameoverSound1;
var gameoverSound2;
let mosquito;
var swatter;
var hjj;
var jiajun;
var score = 0;
var heart = 3;
var gameStatus = 0;
var over = false;
var ballX = 250;
var ballY = 250;
var ballSize = 30;
var timer = 120;
var timerSpeed = 120;
var level = 1;

function setup() {
  createCanvas(500, 500);
}


//#####################
//Functions defination 
//########################/
// function to recurring run in backgroud
function draw() {
  loadBackgroundPicture();
  if (gameStatus == 0) {
    clickToStart();
  }
  if (gameStatus == 1) {
    inGame();
  } else if (gameStatus == 2) {
    gameOver();
  } else {
    startPage();
  }
  image(paizi, mouseX - 100, mouseY - 85);
}

// function to preload the image, useful resources by p5.js
function preload() {
  backgroundImage = loadImage("wall.png");
  paizi = loadImage("paizi.png");
  mosquito = loadImage("11.png");
  //hjj = loadImage('HJJLOGOTOUMING.png');
  
//Load the sound
  //soundFormats("wav");
  ballClickSound = loadSound("hitsound.m4a");
  missClickSound = loadSound("misshitsound.m4a");
  gameoverSound = loadSound("Nicebro.m4a");
  gameoverSound1 = loadSound("Keepgoingbro.m4a");
  gameoverSound2 = loadSound("Damnyoudidagoogjob.m4a");
}

// function to loadBackgroundPicture
function loadBackgroundPicture() {
  image(backgroundImage, 0, 0, 500, 500);
}

// function to draw the start page
function startPage() {
  fill(0);
  textSize(15);
  text("Score: " + score, 50, 25);
  text("Heart: " + heart, 50, 45);
  textSize(35);
  text("Click to start", 160, 150);
  textSize(20);
  text("Use mouse to hit the mosquito", 115, 200);

//size of mosquito & swatter & button(EASY MODE & HARD MODE)
  paizi.resize(200, 235);
  mosquito.resize(150, 170);
  //hjj.resize(100,100);
  drawButton(width / 2 - 150, height / 2, 150, 50, "EASY MODE");
  drawButton(width / 2 + 50, height / 2, 150, 50, "HARD MODE");
  //drawButton(width / 2 - 150, height / 2, 100, 50, "EASY MODE");
  //drawButton(width / 2 + 50, height / 2, 100, 50, "HARD MODE");
}

//function to draw the BUTTON
function drawButton(x, y, w, h, t) {
  push();
  if (checkButton(x, y, w, h)) {
    fill(115,215,255);
  } else {
    fill(255);
  }
  stroke(0);
  rect(x, y, w, h, 10);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(20);
  text(t, x + w / 2, y + h / 2);
  pop();
}

//click different button has different speed
function clickToStart() {
  if (mouseIsPressed) {
    if (checkButton(width / 2 - 150, height / 2, 100, 50)) {
      level = 1;
      gameStatus = 1;
    }
    if (checkButton(width / 2 + 50, height / 2, 100, 50)) {
      gameStatus = 1;
      level = 2;
    }
  }
}

//function checkbutton, Determine if the button has been clicked
function checkButton(x, y, w, h) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    return true;
  } else {
    return false;
  }
}

// function during Game page
function inGame() {
  fill(0);
  textSize(15);
  text("Score: " + score, 50, 25);
  text("Heart: " + heart, 50, 45);
  
  fill(0);
  star(ballX, ballY, ballSize, ballSize/2 , 5);

  timer--;
  speedControl();
  checkMissClick();
  checkGameOver();
}

// mousePressed function hit the mosquito get marks
function mousePressed() {
  let distance = dist(ballX, ballY, mouseX, mouseY);
  if (distance <= ballSize) {
    score++;
    ballY = random(50, 350);
    ballX = random(50, 350);
    timer = timerSpeed / level;
    ballClickSound.play();
  }
  //click the restart button
  if (gameOver && checkButton(width / 2 - 50, height / 2 + 100, 100, 50)) {
    score = 0;
    heart = 3;
    gameStatus = 0;
    over = false;
    ballX = 250;
    ballY = 250;
    ballSize = 30;
    timer = 120;
    timerSpeed = 120;
    level = 1;
  }
}
//The speed at mosquitoes appear
function speedControl() {
  if (score >= 5 && score < 10) {
    timerSpeed = 100;
  } else if (score >= 10 && score < 20) {
    timerSpeed = 80;
  } else if (score >= 20) {
    timerSpeed = 60;
  } else {
    timerSpeed = 120;
  }
}
//miss click lost 1 heart
function checkMissClick() {
  if (timer < 0) {
    heart--;
    ballY = random(50, 350);
    ballX = random(50, 350);
    timer = timerSpeed / level;
    missClickSound.play();
  }
}

//Gameover = gameStatus = 2
function checkGameOver() {
  if (heart <= 0) {
    gameStatus = 2;
  }
}

//function to draw the gameOver page
function gameOver() {
  //gameoverSound.play();
  textSize(30);
  text("Good Game", 130, 100);
  text("Your Score is: " + score, 130, 200);

  if (score < 5) {
    text("You are BAD", 130, 300);
    if (!over) {
      gameoverSound1.play();
    }
  } else if (score >= 5 && score < 20) {
    text("You are in AVERAGE", 130, 300);
    if (!over) {
      gameoverSound.play();
    }
  } else {
    text("You are EXCELLENT", 130, 300);
    if (!over) {
      gameoverSound2.play();
    }
  }
  drawButton(width / 2 - 50, height / 2 + 100, 100, 50, "Restart");
  over = true;
  // noLoop();
}

// example on p5.js: https://p5js.org/examples/form-star.html
//Hit the mosquito's position 
function star(x, y, radius1, radius2, npoints) {
  //Easy mode
  image(mosquito, x - 60, y - 70);
  //Hard mode
  //image(mosquito,x-60,y-140);
  //image(hjj,x-50,y-50);
  //image(jiajun,x-50,y-50);

  // let angle = TWO_PI / npoints;
  // let halfAngle = angle / 2.0;
  // beginShape();
  // for (let a = 0; a < TWO_PI; a += angle) {
  //   let sx = x + cos(a) * radius2;
  //   let sy = y + sin(a) * radius2;
  //   vertex(sx, sy);
  //   sx = x + cos(a + halfAngle) * radius1;
  //   sy = y + sin(a + halfAngle) * radius1;
  //   vertex(sx, sy);
  // }
  // endShape(CLOSE);
}

