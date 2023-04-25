function setup() {
  createCanvas(1200, 700);
  
}

///VARIABLES for LEVEL1

//game control
let stage = 0; //keeps track of function run

//player2
let p1X = 50;
let p1Y = 645;
let pWidth = 20;
let pHeight = 35;

//boxes (floors)
//1st floor
let b1X = 100;
let b1Y = 550;
let b1Width = 1100;
let b1Height = 20;
//2nd floor
let b2X = 0;
let b2Y = 450;
let b2Width = 1100;
let b2Height = 20;
//3rd floor
let b3X = 100;
let b3Y = 350;
let b3Width = 1100;
let b3Height = 20;
//4thfloor
let b4X = 0;
let b4Y = 250;
let b4Width = 1100;
let b4Height = 20;


//gravity
let jump = false;   //it is setted to false first because when the game starts, it does not jump
let direction = 1;  //the force of gravity in the Y direction       ??do I need this?
let velocity = 2;   //speed of the player     ??do I need it? it is defined in the function draw - key movements
let jumpPower = 15;   //how much jump force it has = how high it can jump
let fallingSpeed = 2; //the speed when it falls, equals to velocity  (Part3 3:33)   ??do I need it? it is defined in the function gravity : p1Y = p1Y + (direction*velocity)+10;
let minHeight = 646;    //the player cannot fall lower = ground floor
let maxHeight = 10;     //the player cannot jump higher = the top border of the game
let jumpCounter = 0;    //keeps track of how much we are jumping

///LEVEL1
function game() {
  background(150, 230, 240);

  //ground floor
  push();
  fill(255, 255, 255);
  rect(0, 680, 1200, 20);
  pop();
  //window frame
  push();
  noFill();
  stroke(0, 0, 255);
  strokeWeight(10);
  rect(0, 0, 1200, 698);
  pop();
  //1st floor
  fill(255, 255, 255);
  rect(b1X, b1Y, b1Width, b1Height);
  //2nd floor
  fill(255, 255, 255);
  rect(b2X, b2Y, b2Width, b2Height);
  //3rd floor
  fill(255, 255, 255);
  rect(b3X, b3Y, b3Width, b3Height);
  //4th floor
  fill(255, 255, 255);
  rect(b4X, b4Y, b4Width, b4Height);

  //Player1 - seed character
  push();
  fill(0, 255, 0);
  rect(p1X, p1Y, pWidth, pHeight);
  pop();

  //collisions with the floor "boxes"
  if //if I'm on the box
    //1st
    (p1X+pWidth >= b1X 
    && p1Y+pHeight >= b1Y 
    && p1Y <= b1Y+b1Height
    && jump == false)     //we have to make sure if we are jumping or not
    {
    p1Y = p1Y+0;    //dont fall
    velocity = 0;     //speed because we are not falling     ??
    jumpCounter = 0;    //allows us to jump again
  }
  



}

///GRAVITY
function gravity(){
  
  //when it touches the ground or not
  if(p1Y >= minHeight       //if the Y position of the player will be bigger than the minHeight = if the player would fall below the ground ...
    && jump == false) {      //...and if the same time, I dont press the up key ...
    p1Y = p1Y+0;            //...THEN... the Y position of the player should equal itself = stop falling
    jumpCounter =0;   //"resets" jump counter when it is not in the jumping stage anymore (=jump == false)
  }
  else {    //in other case, if the player is above the ground, it should keep falling 
  p1Y = p1Y + (direction*velocity);   //it makes it fall - without any modifications, it falls constantly
  }

  if (jump == true){    //if jump is true(if I press the up key)
    if (p1Y <= maxHeight     //if the player would go above the top border AND...  (Part3 11:00)
    || jumpCounter >= jumpPower) {    //OR...??    (Part3 11:00)
      //we need to add the below if statement because we dont want our player to fall down below the ground when we still hold the down key
      if(p1Y >= minHeight){   //IF the player reaches the ground...
        p1Y = minHeight;      //...THEN we want it to stay there
      }
      else { 
      velocity = fallingSpeed;}   //ELSE??
    } 
    else { 
    velocity = -jumpPower;  //if jump is true(if I press the up key) -> the velocity will equal to a negative jump power - player will go up
    jumpCounter = jumpCounter+1; //add to jumpCounter (if its +1 -> I can jump twice at a time (idk why) the numper of jumping opportunities also increase when I ecrease the jumpPower, idk why)       ??  (Part3 14:00)
    } 
  } 
  else { 
    velocity = fallingSpeed;    //??
  }


}

///DRAW

function draw() {
  //call functions
  //game stage
  game();
  //moving player1
  if (keyIsDown(37)) {    //moving player1 - left
    p1X = p1X - 4;
  } else if (keyIsDown(39)) {     //moving player1 - right
    p1X = p1X + 4;
  }
  if (keyIsDown(38)) {    //if I press the up key, jump will be true -> the player will jump
    jump = true;
  }
  else {       //if I dont press the up key, jump will be false-> the player wont jump
    jump = false;
  }
  //gravity
  gravity();
  
}
