function setup() {
  createCanvas(1200, 700);

  // Instantiate the rectangle object
  rectangles = [
    new Rectangle(100, 550, 1100, 20),
    new Rectangle(0, 420, 1100, 20),
    new Rectangle(100, 290, 200, 20),
    new Rectangle(400, 290, 200, 20),
    new Rectangle(700, 290, 500, 20),
    new Rectangle(300, 290, 20, 130),
    new Rectangle(600, 290, 20, 130),
    new Rectangle(0, 160, 1100, 20),
    new Rectangle(0, -15, 1200, 20),  //top border
    new Rectangle(-15, 0, 20, 700),   //left border
    new Rectangle(1195, 0, 20, 700),   //right border

  ];
}

///VARIABLES for LEVEL1

//game control
let stage = 0; //keeps track of function run

//player1
let p1X = 50;
let p1Y = 50;
let p1Width = 20;
let p1Height = 35;
let player1;



//boxes (floors)

let rectangles;

//1st floor
//let b1X = 100;
//let b1Y = 550;
//let b1Width = 1100;
//let b1Height = 20;

//gravity
let jump = false; //it is setted to false first because when the game starts, it does not jump
let direction = 1; //the force of gravity in the Y direction       ??do I need this?
let velocity = 2; //speed of the player     ??do I need it? it is defined in the function draw - key movements
let jumpPower = 15; //how much jump force it has = how high it can jump
let fallingSpeed = 2; //the speed when it falls, equals to velocity  (Part3 3:33)   ??do I need it? it is defined in the function gravity : p1Y = p1Y + (direction*velocity)+10;
let minHeight = 680; //the player cannot fall lower = ground floor
let maxHeight = 10; //the player cannot jump higher = the top border of the game
let jumpCounter = 0; //keeps track of how much we are jumping

///LEVEL1
function game() {
  background(150, 230, 240);

  //ground floor
  push();
  noStroke();
  fill(255, 255, 255);
  rect(0, 680, 1200, 20);
  pop();

  //Player1 - seed character
  push();
  fill(0, 255, 0);
  triangle();
  rect(p1X, p1Y, p1Width, p1Height);
  pop();

  //window frame
  push();
  noFill();
  stroke(0, 0, 255);
  strokeWeight(10);
  rect(0, 0, 1200, 698);
  pop();

  //collisions with the floor "boxes"
  /* if //if I'm on the box
   //1st
   (p1X+pWidth >= 100
   && p1Y+pHeight >= 550
   && p1Y <= 550+20
   && jump == false)     //we have to make sure if we are jumping or not
   {
   p1Y = p1Y+0;    //dont fall
   velocity = 0;     //speed because we are not falling     ??
   jumpCounter = 0;    //allows us to jump again
 }
 */
}

function checkCollision() {
  for (let rectangle of rectangles) {
    if (
      p1Y + p1Height > rectangle.y &&
      p1Y < rectangle.y + rectangle.height &&
      p1X + p1Width > rectangle.x &&
      p1X < rectangle.x + rectangle.width
    ) {
      return true;
    }
  }
  return false;
}

///GRAVITY
function gravity() {
  //when it touches the ground or not
  console.log(p1Y, p1X, checkCollision());
  //if the player is above the ground, it should keep falling
  //...and if the same time, I dont press the up key ...

  //gravity
  if (jump == false && p1Y + p1Height < minHeight && !checkCollision()) {
    velocity = fallingSpeed; //??
    direction = 1;
  }
  //jump
  else if (jump == true) {
    //if jump is true(if I press the up key)
    // if (
    //   p1Y <= maxHeight || //if the player would go above the top border AND...  (Part3 11:00)
    //   jumpCounter >= jumpPower
    // ) {
    //   //OR...??    (Part3 11:00)
    //   //we need to add the below if statements because we dont want our player to fall down below the ground when we still hold the down key
    //   if (p1Y >= minHeight) {
    //     //IF the player reaches the ground...
    //     p1Y = minHeight; //...THEN we want it to stay there
    //   } else {
    //     velocity = fallingSpeed;
    //   } //ELSE??
    // } else {
    //   jumpCounter = jumpCounter + 1; //add to jumpCounter (if its +1 -> I can jump twice at a time (idk why) the numper of jumping opportunities also increase when I ecrease the jumpPower, idk why)       ??  (Part3 14:00)
    //   direction = -1
    // }
    velocity = jumpPower; //if jump is true(if I press the up key) -> the velocity will equal to a negative jump power - player will go up
    direction = -1;
  } else {
    direction = 0;
    jumpCounter = 0; //"resets" jump counter when it is not in the jumping stage anymore (=jump == false)
  }

  p1Y = p1Y + direction * velocity; //it makes it fall - without any modifications, it falls constantly
  if (checkCollision()) {
    p1Y = p1Y - direction * velocity; //it makes it fall - without any modifications, it falls constantly
  }
}

///PRELOAD
function preload() {
  //5:20
}

///DRAW

function draw() {
  //call functions
  //game stage
  game();
  //moving player1
  if (keyIsDown(37)) {
    //moving player1 - left
    p1X = p1X - 4;
    if (checkCollision()) {
      p1X = p1X + 4;
    }
  } else if (keyIsDown(39)) {
    //moving player1 - right
    p1X = p1X + 4;
    if (checkCollision()) {
      p1X = p1X - 4;
    }
  }
  if (keyIsDown(38)) {
    //if I press the up key, jump will be true -> the player will jump
    jump = true;
  } else {
    //if I dont press the up key, jump will be false-> the player wont jump
    jump = false;
  }
  //gravity
  gravity();
  // Display the rectangle
  for (let rectangle of rectangles) {
    rectangle.display();
  }
}

// Define a custom Rectangle object
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.display = function () {
    // Draw the rectangle using p5.js rect() function
    rect(this.x, this.y, this.width, this.height);
  };
}

// console.log(rectangles);
