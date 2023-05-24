
function setup() {
  createCanvas(1200, 700);
  // startTime = millis(); // Store the start time
  // imageMode(CENTER);
}  


//game control
let stage = 0; //keeps track of function run
let score = 0;
let seedHit = false;
let waterHit = false;


let backgroundImage;
let player1Image;
let player2Image;

//player1
let p1X = 150;
let p1Y = 200;
let pWidth = 120;
let pHeight = 180;
let pSpeed = 3;

//player
let p2X = 150;  
let p2Y = 300; 
let p2Width = 120;
let p2Height = 180;
let p2Speed = 3;

//seed
let seed1X = p1X;
let seed1Y = p1Y;
let seed1Position = 0; //keeping track of where the seed is at the moment
let seedWidth = 20;
let seedHeight = 10;
let seedSpeed = 20;
let fire = false; //am i firing the seed?

//water droplets
let waterX = p2X;
let waterY = p2Y;
let waterPosition = 0; //keeping track of where the seed is at the moment
let waterWidth = 15;
let waterHeight = 20;
let waterSpeed = 20;
let fire2 = false; //am i firing the seed?



//ground hole
let g1X = 500;
let g1Y = 180;
let g1hit = false;
let gWidth = 40;
let gHeight = 40;

//hole with seed
let hole1X = 500;
let hole1Y = 180;
let holeWidth = 40;
let holeHeight = 40;


//hole with water droplets
let flower2B = 500;
let flower2C = 180;
let flowerWidth = 40;
let flowerHeight = 40; 


let groundArray = [{
  x: 855, y: 250, hit: false 
}, {x: 815, y: 420, hit: false
}, {x: 1060, y: 320, hit: false
}, {x: 1125, y: 490, hit: false
}, {x: 890, y: 570,  hit: false
}
]; 

let flowerGroundArray = [{
  x: 855, y: 250, hit: false // top left
}, {x: 815, y: 420, hit: false // second top right  
}, {x: 1060, y: 320, hit: false // third top left
}, {x: 1125, y: 490, hit: false // first bottom right
}, {x: 890, y: 570,  hit: false // bottom left
}
];




let startTime; // Variable to store the start time
let elapsedTime = 0; // Variable to store the elapsed time


function hole(x, y){
//draw hole with seed
  push();
  noStroke();
  fill(255, 255, 44, 0.9); //transparent
  ellipse(x, y, holeHeight, holeWidth);
  fill(78, 54, 13);
  ellipse(x, y, 18, 10);
  pop();
  } 
  
  
  
function flower(x, y){
//draw flower in the ground
  push();
  translate(-50,-45);
  
  noStroke();
  fill(99, 68, 14);
    
  // fill(99, 68, 14);
  // ellipse(b, c, 20);
    
    
  noStroke();
  
//petals
  fill(252, 235, 61);
  ellipse(x + 62, y, 15);
  ellipse(x + 60, y- 10, 15);
  ellipse(x + 48, y - 14, 15);
  ellipse(x + 40, y - 6, 15);
  ellipse(x + 55, y + 6, 15);
  ellipse(x + 43, y + 5, 15);
//inner flower
  fill(0, 0, 0);
  ellipse(x + 50, y - 5, 12); 
//stem
  strokeWeight(2);
  stroke(163, 234, 65);
  line(x + 49, y + 12, x + 50, y+ 45);
  pop();
}  
  
  
  
function seeds(){
//seed positions
  //0 = with player1 ready to be fired
  //1 = in motion after firing
  //2 = collision with object, return to p1
      
  //draw seed   
  // noStroke();
  // fill(110, 77, 30);
  // ellipse(seed1X, seed1Y, seedWidth, seedHeight);  
  
//keep track and fire the seeds
  if(fire === true && seed1Position === 0){
      seed1Position = 1;
  }
//fire seeds code
  if(seed1Position === 1){
      seed1Y = seed1Y; //stops following p1
      seed1X = seed1X + seedSpeed; //moves horizontally

//draw seed  only when its fired  
      push();
      noStroke();
      fill(78, 54, 13);
      ellipse(seed1X, seed1Y, seedWidth, seedHeight);  
      pop();
  
    //if it misses
      if(seed1X >= windowWidth){
          seed1Position = 2; //reload
      }
  
    }
    else{
      //when you are not firing, the seed should be with p1
      seed1Y = p1Y;
      seed1X = p1X;
      
    }
  
  //reload on #2 command
    if(seed1Position === 2){
      seed1Y = p1Y;
      seed1X = p1X;
      seed1Position = 0;//reset so you can fire again
    } 
    
  }
  
  
function water(){
    //seed positions
        //0 = with player1 ready to be fired
        //1 = in motion after firing
        //3 = collision with object, return to p2
  
        
    //keep track and fire the seeds
      if(fire2 === true && waterPosition === 0){
        waterPosition = 1;
      }
    //fire seeds code
      if(waterPosition === 1){
        waterY = waterY; //stops following p1
        waterX = waterX + waterSpeed; //moves horizontally
      //draw water only when its fired  
        push();
        noStroke();
        fill(81, 213, 242);
        ellipse(waterX, waterY, waterWidth, waterHeight);
        pop();  
        
        //if it misses
        if(waterX >= windowWidth){
          waterPosition = 3; //reload
        }
    
      }
      else{
        //when you are not firing, the droplet should be with p1
        waterY = p2Y;
        waterX = p2X;
        
      }
    
    //reload on #2 command
      if(waterPosition === 3){
        waterY = p2Y;
        waterX = p2X;
        waterPosition = 0;//reset so you can fire again
      } 
      
    }


  //LEVEL 2
  function game() {

  //player1 - seed character    
  //player2 - water character

   //draw player1
   push();
   noStroke();
   fill(128, 36, 66);
  //  ellipse(p1X, p1Y, pWidth, pHeight);
   image(player1Image, p1X, p1Y, pWidth, pHeight);
   pop();

  
    //draw player2
    push();
    noStroke();
    fill(8, 6, 226);
    // ellipse(p2X, p2Y, p2Width, p2Height);
    image(player2Image, p2X, p2Y, p2Width, p2Height);
    pop();


   //activate the seed and water function
   seeds();
   water(); 


  // score board
  fill(150, 75, 0);
  rect(5, 5, 105, 45);
  fill(255);
  fill(0);
  textSize(20);
  text("Score:",20, 35);
  text(score, 90, 35); //printing the value of the value even when increased 


    //collisions between seed and ground gap
    for (let i = 0; i < 5; i++) {
      noStroke();
      fill(0, 109, 44, 0.9); //transparency
      ellipse(groundArray[i].x, groundArray[i].y, gHeight, gWidth);
      if (dist(seed1X, seed1Y, groundArray[i].x, groundArray[i].y) <= 40) {
          groundArray[i].hit = true;
          seed1Position = 2;
          seedHit = true;
      }
      if (groundArray[i].hit) {
          hole(groundArray[i].x, groundArray[i].y);
      }
  }
  
  for (let i = 0; i < 5; i++) {
      noStroke();
      fill(0, 129, 44, 0.9); //trasnapency 
      ellipse(flowerGroundArray[i].x, flowerGroundArray[i].y, gHeight, gWidth);
      if (dist(waterX, waterY, flowerGroundArray[i].x, flowerGroundArray[i].y) <= 40 && groundArray[i].hit) {
        flowerGroundArray[i].hit = true;
          waterPosition = 3;
          waterHit = true;
      }
  }
  //the following part of the code was aided by Chatgpt
  for (let i = 0; i < 5; i++) {
      if (groundArray[i].hit) {
          hole(groundArray[i].x, groundArray[i].y);
          
      }
      
      if (flowerGroundArray[i].hit) {
        flower(flowerGroundArray[i].x, flowerGroundArray[i].y);
        
      }

      if (seedHit && waterHit) {
        score = score + 1;
        seedHit = false;
        waterHit = false;
        if(score >=5){
          window.location.href = "../images/WinningScreen.png"; 
        }

      } 
  }
 //end code
 

//Calculate the elapsed time
  elapsedTime = millis() - startTime;

//Check if 30 seconds have passed 
  if (elapsedTime >= 5000) {
    window.location.href = "../LoseLevel2/lose2.html"; 
  }

  
}


function draw(){


  background(backgroundImage);

  //game stage
  game();

    //call looping functions
    keyPressedChecked();
    keyTyped();
    

   
  // Display the timer
  let remainingTime = 30 - Math.floor(elapsedTime / 1000); // Calculate remaining time in seconds
  
 //set timer to white color then chage to red when 10 seconds are

 //the following code was helped by chatGpt
push();
  if (remainingTime <= 10) {
    fill(255, 0, 0); // Set the color to red
  } else {
    fill(158, 115, 41); // Set the color to light brown
  }
  ellipse(550, 45, 180, 60);
  fill(255, 255, 255);
  textSize(25);
  text("Time: " + remainingTime, 500, 50);
  pop();  
}  

 



//make the player1 and player2 move up and down
function keyPressedChecked(){
    
    if(keyIsDown(UP_ARROW)){ //player1 moving only when the key is pressed
        p1Y = p1Y - pSpeed;
    }

    if(keyIsDown(DOWN_ARROW)){ //player1 moving only when the key is pressed
        p1Y = p1Y + pSpeed;
    } 

    if(keyCode === (87) && keyIsPressed){ //player2 moving only when the key is pressed
        p2Y = p2Y - p2Speed;
    }

    if(keyCode === (83)&& keyIsPressed){ //player2 moving only when the key is pressed
        p2Y = p2Y + p2Speed;
    } 

}

function keyTyped(){

    if(key === 'p' && keyIsPressed){
        fire = true; //seed will be fired on key press
    }
    else{
        fire = false;
    }

    if(key === 'e' && keyIsPressed) {

      console.log("shoot");
        fire2 = true; //water will be fired on key press
    }
    else{
        fire2 = false;
    }
}


function preload() {
  backgroundImage = loadImage("../images/level2 Newbackground.png"); // Load the background image
  player1Image = loadImage("../images/player1Right.png");
  player2Image = loadImage("../images/player2Right.png");
}



//codes inspired by https://www.youtube.com/watch?v=NFIUnssR65g&list=PLBDInqUM5B25FzygoJ9Ifg1TZXmIHz4zh&index=3