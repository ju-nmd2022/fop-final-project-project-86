function setup() {
  createCanvas(1200, 700);

  // Instantiate the rectangle object
  rectangles = [
    new Rectangle(175, 550, 1100, 20),
    new Rectangle(0, 420, 1070, 20),
    new Rectangle(110, 290, 200, 20),
    new Rectangle(420, 290, 200, 20),
    new Rectangle(700, 290, 500, 20),
    new Rectangle(310, 290, 20, 130),
    new Rectangle(605, 290, 20, 130),
    new Rectangle(0, 160, 1090, 20),
    new Rectangle(0, 30, 1200, 20), //top border
    new Rectangle(-15, 0, 20, 700), //left border
    new Rectangle(1195, 0, 20, 700), //right border
    new Rectangle(0, 680, 1200, 20), //bottom border
  ];

  next = new Next(1110, 620, 80, 60);

  traps = [
    new Trap(810, 677, 100, 23),
    new Trap(300, 677, 100, 23),
    new Trap(400, 547, 100, 23),
    new Trap(842, 547, 100, 23),
  ];

  seeds = [
    new Seed(700, 70, 10, 20),
    new Seed(500, 200, 10, 20),
    new Seed(250, 330, 10, 20),
    //new Seed(250, 460, 10, 20),
    new Seed(700, 460, 10, 20),
    new Seed(700, 590, 10, 20),
  ];

  waters = [
    new Water(600, 70, 15, 15),
    new Water(200, 200, 15, 15),
    new Water(550, 330, 15, 15),
    //new Water(200, 460, 15, 15),
    new Water(600, 460, 15, 15),
    new Water(600, 590, 15, 15),
  ];

  startTime = millis(); // Store the start time
}

///VARIABLES for LEVEL1

//game control
let stage = 0; //keeps track of function run

// Get the reference to the image element
//const backgroundImage = document.getElementById('backgroundImage');

// Set the opacity of the image
//backgroundImage.style.opacity = '0.5'; // Adjust the opacity value (between 0 and 1) as desired

let score1 = 0;
let score2 = 0;

let backgroundImage;
let player1Image;
let player2Image;

//player1
let p1X = 50;
let p1Y = 51;
let p1Width = 20;
let p1Height = 35;
let player1 = {

  jump: false, //the stage when its on the ground, 1: jumping upwards, 2: fall
  ready: false, //am I ready to jump
  direction: 1, //the force of gravity in the Y direction
  velocity: 2, //speed of the player     ??do I need it? it is defined in the function draw - key movements
  jumpPower: 15, //how much jump force it has = how high it can jump
  fallingSpeed: 2, //the speed when it falls, equals to velocity  (Part3 3:33)   ??do I need it? it is defined in the function gravity : p1Y = p1Y + (direction*velocity)+10;
  jumpCounter: 0, //keeps track of how much we are jumping
};

//player2
let p2X = 20;
let p2Y = 50;
let p2Width = 20;
let p2Height = 35;
let player2 = {
  jump: false,
  ready: false, //am I ready to jump
  direction: 1, //the force of gravity in the Y direction
  velocity: 2, //speed of the player     ??do I need it? it is defined in the function draw - key movements
  jumpPower: 15, //how much jump force it has = how high it can jump
  fallingSpeed: 2, //the speed when it falls, equals to velocity  (Part3 3:33)   ??do I need it? it is defined in the function gravity : p1Y = p1Y + (direction*velocity)+10;
  jumpCounter: 0, //keeps track of how much we are jumping
};

//boxes (floors), seeds, waters
let rectangles;
let seeds;
let waters;
let traps;
let next;

//go to next level
let bothPlayersTouchedNext = false;

//gravity
//let jump = false; //it is setted to false first because when the game starts, it does not jump

let minHeight = 680; //the player cannot fall lower = ground floor
let maxHeight = 10; //the player cannot jump higher = the top border of the game

let startTime; // Variable to store the start time
let elapsedTime = 0; // Variable to store the elapsed time

let upKeyPressedTime1 = 0;
let upKeyPressedTime2 = 0;

///LEVEL1
function game() {
  //background(150, 230, 240);

  // //ground floor
  // push();
  // fill(255, 255, 255);
  // rect(0, 680, 1200, 20);
  // pop();

  //clear();

  //Player1 - seed character
  push();
  image(player1Image, p1X, p1Y, p1Width, p1Height);
  pop();

  //Player2 - water character
  push();
  image(player2Image, p2X, p2Y, p2Width, p2Height);
  pop();

  // Check for collisions between Player 1 and seed objects  //reference: chat gpt
  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    if (
      p1X + p1Width > seed.x &&
      p1X < seed.x + seed.width &&
      p1Y + p1Height > seed.y &&
      p1Y < seed.y + seed.height
    ) {
      score1++; // Increase the score1
      seeds.splice(i, 1); // Remove the collected seed from the array
    }
  }

  // Check for collisions between Player 2 and water objects  //reference: chat gpt
  for (let i = 0; i < waters.length; i++) {
    const water = waters[i];
    if (
      p2X + p1Width > water.x &&
      p2X < water.x + water.width &&
      p2Y + p1Height > water.y &&
      p2Y < water.y + water.height
    ) {
      score2++; // Increase the score
      waters.splice(i, 1); // Remove the collected water from the array
    }
  }

  // Display the score1
  push();
  fill(150, 75, 0);
  rect(1090, 5, 105, 45);
  fill(255);
  textSize(10);
  text("PLAYER1", 1120, 20);
  textSize(20);
  text("Score: " + score1, 1110, 40); // Adjust the position as needed
  pop();

  // Display the score2
  push();
  fill(0, 0, 255);
  rect(5, 5, 105, 45);
  fill(255);
  textSize(10);
  text("PLAYER2", 30, 20);
  textSize(20);
  text("Score: " + score2, 20, 40); // Adjust the position as needed
  pop();
}

function checkCollision() {
  for (let rectangle of rectangles) {
    if (
      (p1Y + p1Height > rectangle.y &&
        p1Y < rectangle.y + rectangle.height &&
        p1X + p1Width > rectangle.x &&
        p1X < rectangle.x + rectangle.width) ||
      (p2Y + p2Height > rectangle.y &&
        p2Y < rectangle.y + rectangle.height &&
        p2X + p2Width > rectangle.x &&
        p2X < rectangle.x + rectangle.width)
    ) {
      return true;
    }
  }
  return false;
}

///GRAVITY
function gravity() {
  //when it touches the ground or not
  //console.log(p1Y, p1X, checkCollision());
  //if the player is above the ground, it should keep falling
  //...and if the same time, I dont press the up key ...
  //console.log(p2Y, p2X, checkCollision());


  // Calculate the elapsed time since the up key was pressed
  const elapsedTime1 = millis() - upKeyPressedTime1;
  const elapsedTime2 = millis() - upKeyPressedTime2;

  // Check if the elapsed time exceeds the desired time limit
  const fallBackTimeLimit = 250; // Adjust the time limit as needed
  if (elapsedTime1 > fallBackTimeLimit) {
    player1.jump = false; // Set jump to false to make player1 fall back
  } else {
    player1.jump = true;
  }

  // Check if the elapsed time exceeds the desired time limit
  if (elapsedTime2 > fallBackTimeLimit) {
    player2.jump = false; // Set jump to false to make player1 fall back
  } else {
    player2.jump = true;
  }


  //gravity1
  if (player1.jump == false && !checkCollision()) {
    player1.velocity = player1.fallingSpeed; //??
    player1.direction = 1;
  }
  //jump
  else if (player1.jump == true) {
    player1.velocity = player1.jumpPower; //if jump is true(if I press the up key) -> the velocity will equal to a negative jump power - player will go up
    player1.direction = -1;
  } else {
    player1.direction = 0;
    player1.jumpCounter = 0; //"resets" jump counter when it is not in the jumping stage anymore (=jump == false)
  }

  //gravity2
  if (player2.jump == false && !checkCollision()) {
    player2.velocity = player2.fallingSpeed; //??
    player2.direction = 1;
  }
  //jump
  else if (player2.jump == true) {
    player2.velocity = player2.jumpPower; //if jump is true(if I press the up key) -> the velocity will equal to a negative jump power - player will go up
    player2.direction = -1;
  } else {
    player2.direction = 0;
    player2.jumpCounter = 0; //"resets" jump counter when it is not in the jumping stage anymore (=jump == false)
  }

  p1Y = p1Y + player1.direction * player1.velocity; //it makes it fall - without any modifications, it falls constantly
  console.log(checkCollision());
  if (checkCollision()) {
    p1Y = p1Y - player1.direction * player1.velocity; //it makes it fall - without any modifications, it falls constantly
    player1.ready = true; //if it collides with sg, it is ready to jump
  } else {
    player1.ready = false; //if it does notv collide= its in th e air, it is not ready to jump
  }

  p2Y = p2Y + player2.direction * player2.velocity; //it makes it fall - without any modifications, it falls constantly
  if (checkCollision()) {
    p2Y = p2Y - player2.direction * player2.velocity; //it makes it fall - without any modifications, it falls constantly
    player2.ready = true; //if it collides with sg, it is ready to jump
  } else {
    player2.ready = false; //if it does notv collide= its in th e air, it is not ready to jump
  }
}

///PRELOAD
function preload() {
  player1Image = loadImage("../images/character1Right.png");
  player2Image = loadImage("../images/player2.png");
  backgroundImage = loadImage("../images/background2.png"); // Load the background image
  //5:20
}

///DRAW

function draw() {
  //call functions

  background(backgroundImage);

  //game stage
  game();

  //moving player1
  if (keyIsDown(37)) {
   //moving player1 - left
   p1X = p1X - 4;
   //Flip image
   push();  //Save the current state of transformation
   translate(p1X + p1Width/2 + 7, p1Y + p1Height/2);  //Translate to the center of the image
   scale(-1,1);  //Flip the image
   image(player1Image, -p1Width/2, -p1Height/2, p1Width, p1Height);  //Draw the image centered at the origin
   pop();  //Restore the state of transformation
   if (checkCollision()) {
     p1X = p1X + 4;
   }
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
    if (player1.jump === false && player1.ready) {
      upKeyPressedTime1 = millis(); //if the above condition, the timer is added to it, it will fall after a certain time
    }
    player1.jump = true;
  } else {
    //if I dont press the up key, jump will be false-> the player wont jump
    player1.jump = false;
  }

  //moving player2
  if (keyIsDown(65)) {
    //moving player2 - left
    p2X = p2X - 4;
    if (checkCollision()) {
      p2X = p2X + 4;
    }
  } else if (keyIsDown(68)) {
    //moving player2 - right
    p2X = p2X + 4;
    if (checkCollision()) {
      p2X = p2X - 4;
    }
  }
  if (keyIsDown(87)) {
    if (player2.jump === false && player2.ready) {
      upKeyPressedTime2 = millis(); //if the above condition, the timer is added to it, it will fall after a certain time
    }
    //if I press the up key, jump will be true -> the player will jump
    player2.jump = true;
  } else {
    //if I dont press the up key, jump will be false-> the player wont jump
    player2.jump = false;
  }

  //gravity
  gravity();

  // Display the rectangle
  for (let rectangle of rectangles) {
    rectangle.display();
  }

  for (let seed of seeds) {
    seed.display();
  }

  for (let water of waters) {
    water.display();
  }

  for (let trap of traps) {
    trap.display();
  }

  next.display();

  // Check if both players have touched the "next" object   //reference: chat gpt
  if (
    p1X + p1Width > next.x &&
    p1X < next.x + next.width &&
    p1Y + p1Height > next.y &&
    p1Y < next.y + next.height &&
    p2X + p2Width > next.x &&
    p2X < next.x + next.width &&
    p2Y + p2Height > next.y &&
    p2Y < next.y + next.height &&
    score1 === 5 &&
    score2 === 5
  ) {
    bothPlayersTouchedNext = true;
  }

  // Load level2.html if both players have touched the "next" object
  if (bothPlayersTouchedNext) {
    window.location.href = "../PreLevel2/prelevel2.html";
  }

  // Check for collisions between Player 1 and trap objects
  for (let i = 0; i < traps.length; i++) {
    const trap = traps[i];
    if (
      p1X + p1Width > trap.x &&
      p1X < trap.x + trap.width &&
      p1Y + p1Height > trap.y &&
      p1Y < trap.y + trap.height
    ) {
      window.location.href = "../Lose/lose.html";
    }
  }

  // Check for collisions between Player 2 and trap objects
  for (let i = 0; i < traps.length; i++) {
    const trap = traps[i];
    if (
      p2X + p2Width > trap.x &&
      p2X < trap.x + trap.width &&
      p2Y + p2Height > trap.y &&
      p2Y < trap.y + trap.height
    ) {
      window.location.href = "../Lose/lose.html";
    }
  }

  // Calculate the elapsed time for winning
  elapsedTime = millis() - startTime;

  // Check if 30 seconds have passed
  if (elapsedTime >= 50000) {
    window.location.href = "../Lose/lose.html";
  }

  // Display the timer

  
  

  let remainingTime = 50 - Math.floor(elapsedTime / 1000); // Calculate remaining time in seconds

  push();
  fill(158, 115, 41);
  ellipse(550, 25, 180, 48);
  fill(255, 255, 255);
  textSize(25);
  text("Time: " + remainingTime, 500, 35);
  pop();
}

// Define a custom Rectangle object
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.display = function () {
    // Draw the rectangle using p5.js rect() function
    fill(255, 255, 255, 0.5);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  };
}

// Define a custom Seed object
function Seed(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.display = function () {
    // Draw the seed using p5.js ellipse() function
    push();
    noStroke();
    fill(150, 75, 0);
    ellipse(this.x, this.y, this.width, this.height);
    pop();
  };
} 

// Define a custom Water object
function Water(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.display = function () {
    // Draw the waters
    push();
    noStroke();
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.width);
    pop();
    push();
    translate(this.x, this.y - 3);
    noStroke();
    fill(0, 0, 255);
    triangle(-7, 0, 0, -10, 7, 0);
    pop();
  };
}

// Define a custom Trap object
function Trap(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.display = function () {
    // Draw the trap using p5.js rect() function
    fill(255, 0, 0, 0.5);
    rect(this.x, this.y, this.width, this.height);
  };
}

// Define a next object
function Next(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.display = function () {
    // Draw the next using p5.js rect() function
    fill(255, 255, 255, 0.5);
    rect(this.x, this.y, this.width, this.height);
  };
}

//References:

//timer: chat gpt
